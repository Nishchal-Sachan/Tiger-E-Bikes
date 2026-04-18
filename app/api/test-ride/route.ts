import { NextResponse } from "next/server";

import { sendMail } from "@/lib/mail";
import { SITE_EMAIL } from "@/constants/site-email";
import { stringField } from "@/lib/validation";

export const dynamic = "force-dynamic";

type Body = {
  name?: unknown;
  phone?: unknown;
  city?: unknown;
  preferredDate?: unknown;
  preferredTime?: unknown;
  vehicleInterest?: unknown;
  message?: unknown;
};

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

const MAX_LEN = {
  name: 200,
  phone: 40,
  city: 120,
  preferredDate: 64,
  preferredTime: 64,
  vehicle: 200,
  message: 4000,
};

export async function POST(request: Request) {
  try {
    const to =
      process.env.TEST_RIDE_RECEIVER_EMAIL?.trim() ||
      process.env.CONTACT_RECEIVER_EMAIL?.trim() ||
      SITE_EMAIL;

    let body: Body;
    try {
      body = (await request.json()) as Body;
    } catch {
      return badRequest("Invalid request body.");
    }

    const name = stringField(body.name);
    const phone = stringField(body.phone);
    const city = stringField(body.city);
    const preferredDate = stringField(body.preferredDate);
    const preferredTime = stringField(body.preferredTime);
    const vehicleInterest = stringField(body.vehicleInterest);
    const message = stringField(body.message);

    if (!name) return badRequest("Name is required.");
    if (name.length > MAX_LEN.name) return badRequest("Name is too long.");
    if (!phone) return badRequest("Phone is required.");
    if (phone.length > MAX_LEN.phone) return badRequest("Phone is too long.");
    if (!city) return badRequest("City is required.");
    if (city.length > MAX_LEN.city) return badRequest("City is too long.");
    if (!preferredDate) return badRequest("Preferred date is required.");
    if (preferredDate.length > MAX_LEN.preferredDate) return badRequest("Preferred date is invalid.");
    if (!preferredTime) return badRequest("Preferred time slot is required.");
    if (preferredTime.length > MAX_LEN.preferredTime) return badRequest("Preferred time is too long.");
    if (!vehicleInterest) return badRequest("Vehicle interest is required.");
    if (vehicleInterest.length > MAX_LEN.vehicle) return badRequest("Vehicle interest is too long.");
    if (message.length > MAX_LEN.message) return badRequest("Message is too long.");

    const subject = `[TEST RIDE] - ${sanitizeSubjectSegment(name, 80)} - ${sanitizeSubjectSegment(city, 80)}`;

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeCity = escapeHtml(city);
    const safeDate = escapeHtml(preferredDate);
    const safeTime = escapeHtml(preferredTime);
    const safeVehicle = escapeHtml(vehicleInterest);
    const safeMessage = escapeHtml(message || "—").replace(/\r\n|\r|\n/g, "<br />");

    const html = `
<!DOCTYPE html>
<html>
 <body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
    <h2 style="margin-top: 0;">Test ride request</h2>
    <table style="border-collapse: collapse; max-width: 560px;">
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Name</td>
        <td style="padding: 8px 0;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Phone</td>
        <td style="padding: 8px 0;"><a href="tel:${encodeURIComponent(phone)}">${safePhone}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">City</td>
        <td style="padding: 8px 0;">${safeCity}</td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Preferred date</td>
        <td style="padding: 8px 0;">${safeDate}</td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Preferred time</td>
        <td style="padding: 8px 0;">${safeTime}</td>
      </tr>
      <tr>
        <td style="padding: 8px 16px 8px 0; font-weight: 600; vertical-align: top;">Vehicle interest</td>
        <td style="padding: 8px 0;">${safeVehicle}</td>
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
      err instanceof Error ? err.message : "Something went wrong while sending your request.";

    console.error("[api/test-ride] POST failed:", err);

    return serverError(msg);
  }
}
