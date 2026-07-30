# Mail module

Transactional email infrastructure for the iNgabo Website Backend.

The module is configuration-driven, uses **Nodemailer** over SMTP, and never stores credentials in source control. It is registered as a **global** NestJS module so feature domains can inject `MailService` without re-importing `MailModule`.

## Responsibilities

| Method | Purpose | Triggered by |
|--------|---------|--------------|
| `sendContactConfirmation` | Acknowledge a public contact form submission | `MessagesService.create` |
| `sendContactTeamNotification` | Alert the team inbox about a new contact message | `MessagesService.create` |
| `sendWelcomeEmail` | Welcome newly created admin/maintainer accounts | `UsersService.create` |
| `sendPasswordResetOtp` | Deliver password-reset one-time codes | Auth password-reset flow (when enabled) |
| `sendNotificationEmail` | Generic system / dashboard notification emails | `NotificationsService` |

## Structure

```text
mail/
├── interfaces/
│   └── mail-message.interface.ts
├── templates/
│   └── mail.templates.ts
├── utils/
│   └── html.util.ts
├── mail.module.ts
├── mail.service.ts
├── mail.service.spec.ts
└── readme.md
```

## Environment variables

```text
SMTP_HOST=smtp.example.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mailer@example.org
SMTP_PASSWORD=replace-me
MAIL_FROM=mailer@example.org
MAIL_ADMIN=team@example.org
FRONTEND_URL=https://ingabo.org
```

| Variable | Required | Description |
|----------|----------|-------------|
| `SMTP_HOST` | Yes (for delivery) | SMTP server hostname |
| `SMTP_PORT` | No (default `587`) | SMTP port |
| `SMTP_SECURE` | No (default `false`) | Use TLS (`true` for port 465) |
| `SMTP_USER` | Yes (for delivery) | SMTP auth username |
| `SMTP_PASSWORD` | Yes (for delivery) | SMTP auth password |
| `MAIL_FROM` | Recommended | From address (falls back to `SMTP_USER`) |
| `MAIL_ADMIN` | Recommended | Team inbox for contact alerts (falls back to `MAIL_FROM`) |
| `FRONTEND_URL` | Recommended | Links embedded in email templates |

## Behaviour

- When SMTP variables are incomplete, the API remains available and logs that outbound email is disabled.
- Delivery failures are logged without credentials, tokens, or full message bodies.
- HTML templates escape untrusted content to prevent injection.
- Contact team notifications set `Reply-To` to the visitor email so staff can reply directly.

## Security

- Never log passwords, SMTP credentials, OTPs, or JWT tokens.
- Never hardcode SMTP secrets.
- Treat email content as untrusted user input; always escape before rendering HTML.
