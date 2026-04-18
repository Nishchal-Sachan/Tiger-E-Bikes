import "server-only";

import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";
import type { Transporter } from "nodemailer";

export type SendMailParams = {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
};

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

function readSmtpConfig(): SmtpConfig {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !portRaw || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS."
    );
  }

  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid SMTP_PORT: "${portRaw}". Use a valid TCP port (1–65535).`);
  }

  return { host, port, user, pass };
}

let cached: Transporter | null = null;

function getTransporter(): Transporter {
  if (cached) {
    return cached;
  }

  const { host, port, user, pass } = readSmtpConfig();

  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  return cached;
}

function resolveFromAddress(): string {
  const explicit = process.env.SMTP_FROM?.trim();
  if (explicit) {
    return explicit;
  }
  const user = process.env.SMTP_USER?.trim();
  if (user) {
    return user;
  }
  throw new Error(
    "No sender address. Set SMTP_FROM or ensure SMTP_USER is a valid From address."
  );
}

/**
 * Sends HTML email via SMTP. Reuse from API routes (contact, careers, etc.).
 * Requires: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.
 * Optional: SMTP_FROM (defaults to SMTP_USER).
 */
export async function sendMail({
  to,
  subject,
  html,
  attachments,
}: SendMailParams): Promise<{ messageId: string }> {
  if (!subject?.trim()) {
    throw new Error("sendMail: subject is required.");
  }
  if (!html?.trim()) {
    throw new Error("sendMail: html is required.");
  }

  const recipients = Array.isArray(to) ? to : [to];
  const cleaned = recipients.map((r) => r.trim()).filter(Boolean);
  if (cleaned.length === 0) {
    throw new Error("sendMail: at least one valid `to` address is required.");
  }

  try {
    const transporter = getTransporter();
    const from = resolveFromAddress();

    const info = await transporter.sendMail({
      from,
      to: cleaned.join(", "),
      subject: subject.trim(),
      html,
      ...(attachments?.length ? { attachments } : {}),
    });

    const messageId = info.messageId ?? "";
    return { messageId };
  } catch (err) {
    const reason =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";

    console.error("[mail] sendMail failed:", reason, err);

    if (err instanceof Error) {
      throw new Error(`Failed to send mail: ${err.message}`, { cause: err });
    }

    throw new Error(`Failed to send mail: ${reason}`);
  }
}
