/** Role / track dropdown — shared by careers form (client) and API validation (server). */

export const CAREER_ROLE_GROUPS: { label: string; options: string[] }[] = [
  {
    label: 'Engineering',
    options: [
      'Mechanical Engineering',
      'Electrical Engineering',
      'Battery Systems Engineering',
      'Embedded Systems',
      'Firmware Engineering',
      'Vehicle Dynamics',
      'Manufacturing Engineering',
    ],
  },
  {
    label: 'Software',
    options: [
      'Backend Engineering',
      'Frontend Engineering',
      'Full Stack Engineering',
      'IoT / Telematics',
      'Data Engineering',
    ],
  },
  {
    label: 'Product & Design',
    options: ['Product Management', 'UI/UX Design', 'Industrial Design'],
  },
  {
    label: 'Operations',
    options: ['Supply Chain', 'Production / Assembly', 'Quality Control', 'Service & Maintenance'],
  },
  {
    label: 'Business',
    options: ['Sales', 'Marketing', 'Partnerships', 'Customer Experience'],
  },
  {
    label: 'Other',
    options: ['Internships', 'General Application'],
  },
];

export const CAREER_ROLE_VALUES = CAREER_ROLE_GROUPS.flatMap((g) => g.options);
