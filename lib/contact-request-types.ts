/** Contact form request types — shared by ContactForm (client) and /api/contact (server). */

export const CONTACT_REQUEST_TYPES = [
  {
    id: 'sales',
    label: 'Sales / Test Ride',
    placeholder:
      'Which model are you interested in? Preferred city? When would you like a test ride?',
  },
  {
    id: 'service',
    label: 'Service / Support',
    placeholder: 'Describe the issue, vehicle model, and urgency.',
  },
  {
    id: 'partnerships',
    label: 'Partnerships / Business',
    placeholder: 'Tell us about your company and collaboration idea.',
  },
  {
    id: 'careers',
    label: 'Careers',
    placeholder: 'Link your portfolio and explain your interest.',
  },
  {
    id: 'general',
    label: 'General Inquiry',
    placeholder: 'How can we help?',
  },
] as const;

export type ContactRequestId = (typeof CONTACT_REQUEST_TYPES)[number]['id'];

export const CONTACT_REQUEST_IDS = CONTACT_REQUEST_TYPES.map((t) => t.id) as ContactRequestId[];

const ID_SET = new Set<string>(CONTACT_REQUEST_IDS);

export function isContactRequestId(value: string): value is ContactRequestId {
  return ID_SET.has(value);
}

export function contactRequestRequiresCity(id: ContactRequestId): boolean {
  return id === 'sales' || id === 'service';
}

export function getContactRequestLabel(id: ContactRequestId): string {
  return CONTACT_REQUEST_TYPES.find((t) => t.id === id)?.label ?? id;
}
