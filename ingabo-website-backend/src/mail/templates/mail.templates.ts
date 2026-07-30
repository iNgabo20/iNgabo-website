import {
  ContactMailPayload,
  PasswordResetMailPayload,
} from '../interfaces/mail-message.interface';
import { escapeHtml, textToHtml } from '../utils/html.util';

const BRAND = {
  name: 'iNgabo',
  primary: '#0B3D2E',
  accent: '#1FA97A',
  muted: '#5B6B66',
  background: '#F4F7F6',
  card: '#FFFFFF',
  border: '#D9E5E0',
};

function layout(title: string, bodyHtml: string, frontendUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.background};font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#14201C;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BRAND.background};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:${BRAND.primary};padding:20px 28px;">
              <p style="margin:0;font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:0.02em;">${BRAND.name}</p>
              <p style="margin:4px 0 0;font-size:12px;color:#B7D8C9;">Telecom Fraud Intelligence</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px;border-top:1px solid ${BRAND.border};">
              <p style="margin:0;font-size:12px;color:${BRAND.muted};line-height:1.5;">
                This message was sent by ${BRAND.name}.
                Visit <a href="${escapeHtml(frontendUrl)}" style="color:${BRAND.accent};text-decoration:none;">${escapeHtml(frontendUrl)}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function contactConfirmationTemplate(
  name: string,
  subject: string,
  frontendUrl: string,
): { subject: string; text: string; html: string } {
  const emailSubject = 'We received your message — iNgabo';
  const text = [
    `Hello ${name},`,
    '',
    `We received your message about “${subject}”.`,
    'The iNgabo team will review it and follow up through the contact details you provided.',
    '',
    `— ${BRAND.name}`,
  ].join('\n');

  const html = layout(
    emailSubject,
    `
      <p style="margin:0 0 12px;font-size:16px;">Hello ${escapeHtml(name)},</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${BRAND.muted};">
        We received your message about <strong style="color:#14201C;">${escapeHtml(subject)}</strong>.
      </p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:${BRAND.muted};">
        The iNgabo team will review it and follow up through the contact details you provided.
      </p>
    `,
    frontendUrl,
  );

  return { subject: emailSubject, text, html };
}

export function contactTeamNotificationTemplate(
  payload: ContactMailPayload,
  frontendUrl: string,
): { subject: string; text: string; html: string } {
  const emailSubject = `New contact message: ${payload.subject}`;
  const text = [
    'A new contact message was submitted on the iNgabo website.',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone ?? '—'}`,
    `Subject: ${payload.subject}`,
    '',
    payload.message,
  ].join('\n');

  const html = layout(
    emailSubject,
    `
      <p style="margin:0 0 16px;font-size:16px;font-weight:600;">New contact message</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.6;">
        <tr><td style="padding:4px 0;color:${BRAND.muted};width:96px;">Name</td><td style="padding:4px 0;">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:4px 0;color:${BRAND.muted};">Email</td><td style="padding:4px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color:${BRAND.accent};text-decoration:none;">${escapeHtml(payload.email)}</a></td></tr>
        <tr><td style="padding:4px 0;color:${BRAND.muted};">Phone</td><td style="padding:4px 0;">${escapeHtml(payload.phone ?? '—')}</td></tr>
        <tr><td style="padding:4px 0;color:${BRAND.muted};">Subject</td><td style="padding:4px 0;">${escapeHtml(payload.subject)}</td></tr>
      </table>
      <div style="margin-top:16px;padding:14px 16px;background:${BRAND.background};border:1px solid ${BRAND.border};border-radius:8px;font-size:14px;line-height:1.6;color:#14201C;">
        ${textToHtml(payload.message)}
      </div>
    `,
    frontendUrl,
  );

  return { subject: emailSubject, text, html };
}

export function welcomeEmailTemplate(
  firstName: string,
  role: string,
  frontendUrl: string,
): { subject: string; text: string; html: string } {
  const emailSubject = 'Welcome to the iNgabo team';
  const text = [
    `Hello ${firstName},`,
    '',
    'Your iNgabo team account has been created.',
    `Role: ${role}`,
    `Sign in at ${frontendUrl}`,
    '',
    'If you did not expect this message, contact your administrator.',
  ].join('\n');

  const html = layout(
    emailSubject,
    `
      <p style="margin:0 0 12px;font-size:16px;">Hello ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${BRAND.muted};">
        Your iNgabo team account has been created with the role
        <strong style="color:#14201C;">${escapeHtml(role)}</strong>.
      </p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${BRAND.muted};">
        You can sign in using the link below.
      </p>
      <p style="margin:0;">
        <a href="${escapeHtml(frontendUrl)}" style="display:inline-block;background:${BRAND.accent};color:#FFFFFF;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:600;">
          Open iNgabo
        </a>
      </p>
      <p style="margin:20px 0 0;font-size:13px;color:${BRAND.muted};">
        If you did not expect this message, contact your administrator.
      </p>
    `,
    frontendUrl,
  );

  return { subject: emailSubject, text, html };
}

export function passwordResetOtpTemplate(
  payload: PasswordResetMailPayload,
  frontendUrl: string,
): { subject: string; text: string; html: string } {
  const emailSubject = 'Your iNgabo password reset code';
  const text = [
    `Hello ${payload.firstName},`,
    '',
    `Your password reset code is: ${payload.otp}`,
    `This code expires in ${payload.expiresInMinutes} minutes.`,
    '',
    'If you did not request a password reset, you can ignore this email.',
  ].join('\n');

  const html = layout(
    emailSubject,
    `
      <p style="margin:0 0 12px;font-size:16px;">Hello ${escapeHtml(payload.firstName)},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${BRAND.muted};">
        Use the one-time code below to reset your iNgabo account password.
      </p>
      <p style="margin:0 0 8px;text-align:center;font-size:28px;letter-spacing:0.24em;font-weight:700;color:${BRAND.primary};">
        ${escapeHtml(payload.otp)}
      </p>
      <p style="margin:0 0 16px;text-align:center;font-size:13px;color:${BRAND.muted};">
        Expires in ${payload.expiresInMinutes} minutes
      </p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:${BRAND.muted};">
        If you did not request a password reset, you can safely ignore this email.
      </p>
    `,
    frontendUrl,
  );

  return { subject: emailSubject, text, html };
}

export function notificationEmailTemplate(
  title: string,
  message: string,
  frontendUrl: string,
): { subject: string; text: string; html: string } {
  const text = message;
  const html = layout(
    title,
    `
      <p style="margin:0 0 12px;font-size:16px;font-weight:600;">${escapeHtml(title)}</p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:${BRAND.muted};">${textToHtml(message)}</p>
    `,
    frontendUrl,
  );

  return { subject: title, text, html };
}
