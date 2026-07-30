export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  category: "General" | "General Inquiry" | "Partnership" | "RIB Investigation" | "Technical API Integration" | "Report Fraud";
  message: string;
}

export interface ContactMessage extends ContactMessageInput {
  _id: string;
  isRead: boolean;
  createdAt: string;
}
