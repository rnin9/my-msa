export const SERVICE_MAP: Record<string, string> = {
  auth: process.env.AUTH_BE_URL || 'AUTH',
  users: process.env.AUTH_BE_URL || 'AUTH',
  events: process.env.EVENT_BE_URL || 'EVENT',
};
