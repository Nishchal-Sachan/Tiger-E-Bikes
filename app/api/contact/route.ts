import { NextResponse } from "next/server";

import {
  type ContactRequestId,
  contactRequestRequiresCity,
  getContactRequestLabel,
  isContactRequestId,
} from "@/lib/contact-request-types";
import { sendMail } from "@/lib/mail";
import { SITE_EMAIL } from "@/constants/site-email";
import { isValidEmail, stringField } from "@/lib/validation";

export const dynamic = "force-dynamic";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  requestType?: unknown;
  city?: unknown;
  message?: unknown;
};

function resolveContactInbox(): string {
  return process.env.CONTACT_RECEIVER_EMAIL?.trim() || SITE_EMAIL;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeSubjectSegment(value: string, maxLen: number): string {
  return value.replace(/[\r\n\0]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLen) || "—";
}

function badRequest(message: string) {
  return NextResponse.json({ success: false, message }, { status: 400 });
}

function serverError(message: string) {
  return NextResponse.json({ success: false, message }, { status: 500 });
}

const MAX_MESSAGE_LEN = 8000;
const MAX_CITY_LEN = 200;

export async function POST(request: Request) {
  try {
    let body: ContactBody;
    try {
      body = (await request.json()) as ContactBody;
    } catch {
      return badRequest("Invalid request body.");
    }

    const name = stringField(body.name);
    const email = stringField(body.email);
    const phone = stringField(body.phone);
    const message = stringField(body.message);
    const city = stringField(body.city);
    const requestTypeRaw = stringField(body.requestType);

    if (!requestTypeRaw || !isContactRequestId(requestTypeRaw)) {
      return badRequest("Request type is required.");
    }
    const requestType = requestTypeRaw;

    if (!name) {
      return badRequest("Name is required.");
    }
    if (!email) {
      return badRequest("Email is required.");
    }
    if (!isValidEmail(email)) {
      return badRequest("Invalid email.");
    }
    if (contactRequestRequiresCity(requestType)) {
      if (!city) {
        return badRequest("City is required for sales and service requests.");
      }
      if (city.length > MAX_CITY_LEN) {
        return badRequest(`City must be at most ${MAX_CITY_LEN} characters.`);
      }
    } else if (city.length > MAX_CITY_LEN) {
      return badRequest(`City must be at most ${MAX_CITY_LEN} characters.`);
    }
    if (!message) {
      return badRequest("Message is required.");
    }
    if (message.length > MAX_MESSAGE_LEN) {
      return badRequest(`Message must be at most ${MAX_MESSAGE_LEN} characters.`);
    }

    const to = resolveContactInbox();
    const typeLabel = getContactRequestLabel(requestType);
    const subject = `[CONTACT] - ${typeLabel} - ${sanitizeSubjectSegment(name, 120)}`;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "—");
    const safeCity = escapeHtml(city || "—");
    const safeType = escapeHtml(typeLabel);
    const safeMessage = escapeHtml(message).replace(/\r\n|\r|\n/g, "<br />");

    const html = `
<!DOCTYPE html>
<html>
 <body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
    <h2 style="margin-top: 0;">Contact form</h2>
    <table style="border-collapse: collapse; max-width: 560px;">
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Request type</td>
        <td style="padding: 8px 0;">${safeType}</td>
      </tr>
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
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">City</td>
        <td style="padding: 8px 0;">${safeCity}</td>
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
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Something went wrong while sending your message.";

    console.error("[api/contact] POST failed:", err);

    return serverError(msg);
  }
}
