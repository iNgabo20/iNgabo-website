export default () => ({
  port: Number(process.env.PORT ?? 3000),
  databaseUri: process.env.MONGODB_URI,
  /** Required in every environment. JwtModule / JwtStrategy use getOrThrow. */
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  corsOrigin: process.env.CORS_ORIGIN,
  uploadDirectory: process.env.UPLOAD_DIRECTORY,
  mail: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.MAIL_FROM,
    /** Team inbox for contact-form alerts; falls back to MAIL_FROM in MailService. */
    adminEmail: process.env.MAIL_ADMIN,
    frontendUrl: process.env.FRONTEND_URL,
  },
});
