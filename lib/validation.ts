/** Basic email format check (not full RFC 5322). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

/** Trim string fields from JSON body; non-strings become empty. */
export function stringField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
