export default () => ({
  port: Number(process.env.PORT ?? 3000),
  databaseUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/ingabo',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  uploadDirectory: process.env.UPLOAD_DIRECTORY ?? './uploads',
  mail: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.MAIL_FROM,
    /** Team inbox for contact-form alerts; falls back to MAIL_FROM in MailService. */
    adminEmail: process.env.MAIL_ADMIN,
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  },
});
