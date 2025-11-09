export const BLOOD_GROUPS = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;

export type BloodGroup = typeof BLOOD_GROUPS[number];

export const URGENCY_LEVELS = {
  NORMAL: 'normal',
  URGENT: 'urgent',
} as const;

export const REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const USER_MODE = {
  USER: 'user',
  BLOODBANK: 'bloodbank',
} as const;

export const BLOODBANK_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: 'Donate Blood, Save Lives',
    description: 'Join thousands of donors making a difference every day',
    image: 'blood-bag',
  },
  {
    id: 2,
    title: 'Find Donors in 5km',
    description: 'Connect with nearby donors instantly in emergencies',
    image: 'map',
  },
  {
    id: 3,
    title: 'Get Certificate After Donation',
    description: 'Earn recognition and track your donation journey',
    image: 'certificate',
  },
];

export const UNITS_OPTIONS = [1, 2, 3, 4, 5];

export const PAKISTAN_PHONE_PREFIX = '+92';
