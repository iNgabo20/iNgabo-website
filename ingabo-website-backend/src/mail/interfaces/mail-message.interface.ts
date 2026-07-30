/**
 * Outbound email payload accepted by MailService.
 */
export interface MailMessage {
  /** One or more recipient addresses. */
  to: string | string[];
  /** Email subject line. */
  subject: string;
  /** Plain-text body for clients that do not render HTML. */
  text: string;
  /** HTML body. */
  html: string;
  /** Optional reply-to address. */
  replyTo?: string;
}

/**
 * Contact form submission used to build confirmation and team alert emails.
 */
export interface ContactMailPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Password-reset OTP delivery payload.
 */
export interface PasswordResetMailPayload {
  to: string;
  firstName: string;
  otp: string;
  /** OTP validity window in minutes (used in copy only). */
  expiresInMinutes: number;
}
