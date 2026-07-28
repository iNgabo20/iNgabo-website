export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  institution: string;
  bio: string;
  avatar?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  isLeadership: boolean;
  order?: number;
}
