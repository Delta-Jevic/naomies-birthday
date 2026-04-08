// This TypeScript type describes one RSVP record
export type Rsvp = {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
};

// Temporary in-memory storage
// This acts like a fake database for now
export const rsvps: Rsvp[] = [];