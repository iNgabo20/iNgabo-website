export interface TeamMember {
  _id: string;
  fullName: string;
  role: string;
  bio: string;
  avatar?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  displayOrder: number;
}
