import { NextResponse } from "next/server";

import { CAREER_ROLE_VALUES } from "@/lib/careers-roles";
import { sendMail } from "@/lib/mail";
import { SITE_EMAIL } from "@/constants/site-email";
import { isValidEmail, stringField } from "@/lib/validation";

export const dynamic = "force-dynamic";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXT = new Set([".pdf", ".doc", ".docx"]);

const MAX_POSITION_LEN = 200;
const MAX_MESSAGE_LEN = 8000;
const MAX_PORTFOLIO_LEN = 2000;

const ROLE_SET = new Set(CAREER_ROLE_VALUES);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeSubjectSegment(value: string, maxLen: number): string {
  const cleaned = value.replace(/[\r\n\0]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLen);
  return cleaned || "General application";
}

function safeResumeFilename(name: string): string {
  const base = name.replace(/[/\\]/g, "").replace(/^\.+/, "").trim() || "resume";
  return base.slice(0, 180);
}

function extFromName(name: string): string {
  const i = name.lastIndexOf(".");
  if (i < 0) return "";
  return name.slice(i).toLowerCase();
}

function badRequest(message: string) {
  return NextResponse.json({ success: false, message }, { status: 400 });
}

function serverError(message: string) {
  return NextResponse.json({ success: false, message }, { status: 500 });
}

function resumeAllowed(file: File, filename: string): { ok: true } | { ok: false; reason: string } {
  if (file.size === 0) {
    return { ok: false, reason: "Resume file is empty." };
  }
  if (file.size > MAX_RESUME_BYTES) {
    return { ok: false, reason: `Resume must be at most ${MAX_RESUME_BYTES / (1024 * 1024)} MB.` };
  }
  const ext = extFromName(filename);
  const mime = (file.type || "").toLowerCase().trim();
  const mimeOk = ALLOWED_MIME.has(mime);
  const extOk = ALLOWED_EXT.has(ext);
  if (!mimeOk && !extOk) {
    return { ok: false, reason: "Resume must be a PDF or Word document (.pdf, .doc, .docx)." };
  }
  return { ok: true };
}

export async function POST(request: Request) {
  try {
    const receiver =
      process.env.CAREERS_RECEIVER_EMAIL?.trim() ||
      process.env.CONTACT_RECEIVER_EMAIL?.trim() ||
      SITE_EMAIL;

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("multipart/form-data")) {
      return badRequest("Submit the form with a resume file (multipart/form-data).");
    }

    const formData = await request.formData();

    const name = stringField(formData.get("name"));
    const email = stringField(formData.get("email"));
    const phone = stringField(formData.get("phone"));
    const position = stringField(formData.get("position_select"));
    const portfolioLinks = stringField(formData.get("portfolio_links"));
    const message = stringField(formData.get("message"));

    const resumeEntry = formData.get("resume");
    if (!(resumeEntry instanceof File)) {
      return badRequest("Resume upload is required.");
    }

    const rawName = resumeEntry.name || "resume.pdf";
    const resumeFileName = safeResumeFilename(rawName);
    const resumeCheck = resumeAllowed(resumeEntry, resumeFileName);
    if (!resumeCheck.ok) {
      return badRequest(resumeCheck.reason);
    }

    if (!name) {
      return badRequest("Name is required.");
    }
    if (!email) {
      return badRequest("Email is required.");
    }
    if (!isValidEmail(email)) {
      return badRequest("Invalid email.");
    }
    if (!position) {
      return badRequest("Role / track is required.");
    }
    if (!ROLE_SET.has(position)) {
      return badRequest("Invalid role / track selection.");
    }
    if (position.length > MAX_POSITION_LEN) {
      return badRequest(`Role / track must be at most ${MAX_POSITION_LEN} characters.`);
    }
    if (portfolioLinks.length > MAX_PORTFOLIO_LEN) {
      return badRequest(`Portfolio / links must be at most ${MAX_PORTFOLIO_LEN} characters.`);
    }
    if (!message) {
      return badRequest("Message is required.");
    }
    if (message.length > MAX_MESSAGE_LEN) {
      return badRequest(`Message must be at most ${MAX_MESSAGE_LEN} characters.`);
    }

    const resumeBuffer = Buffer.from(await resumeEntry.arrayBuffer());
    const attachmentMime =
      resumeEntry.type && ALLOWED_MIME.has(resumeEntry.type)
        ? resumeEntry.type
        : extFromName(resumeFileName) === ".pdf"
          ? "application/pdf"
          : extFromName(resumeFileName) === ".docx"
            ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            : "application/msword";

    const subjectPosition = sanitizeSubjectSegment(position, 120);
    const subject = `New Job Application - ${subjectPosition}`;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "—");
    const safePosition = escapeHtml(position);
    const safePortfolio = escapeHtml(portfolioLinks || "—");
    const safeMessage = escapeHtml(message).replace(/\r\n|\r|\n/g, "<br />");

    const html = `
<!DOCTYPE html>
<html>
 <body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
    <h2 style="margin-top: 0;">New Job Application</h2>
    <p style="margin: 0 0 16px;">Resume attached: <strong>${escapeHtml(resumeFileName)}</strong></p>
    <table style="border-collapse: collapse; max-width: 560px;">
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Name</td>
        <td style="padding: 8px 0;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Email</td>
        <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Phone</td>
        <td style="padding: 8px 0;">${safePhone}</td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Role / track</td>
        <td style="padding: 8px 0;">${safePosition}</td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Portfolio / links</td>
        <td style="padding: 8px 0;">${safePortfolio}</td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Message</td>
        <td style="padding: 8px 0;">${safeMessage}</td>
      </tr>
    </table>
  </body>
</html>
`.trim();

    await sendMail({
      to: receiver,
      subject,
      html,
      attachments: [
        {
          filename: resumeFileName,
          content: resumeBuffer,
          contentType: attachmentMime,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Something went wrong while sending your application.";

    console.error("[api/careers] POST failed:", err);

    return serverError(msg);
  }
}
