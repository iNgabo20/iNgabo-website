# Auth module

Authentication and session identity for administrators and maintainers.

Public website visitors do **not** authenticate. Only team accounts managed by the `users` module can sign in.

## Responsibilities

| Capability | Endpoint | Notes |
|------------|----------|-------|
| Login | `POST /api/v1/auth/login` | Issues JWT access token |
| Profile | `GET /api/v1/auth/profile` | Requires Bearer token |
| Forgot password | `POST /api/v1/auth/forgot-password` | Emails a 6-digit OTP |
| Reset password | `POST /api/v1/auth/reset-password` | Verifies OTP, sets new password |
| Change password | `POST /api/v1/auth/change-password` | Authenticated; requires current password |

Refresh tokens are intentionally deferred (see API roadmap).

## Structure

```text
auth/
├── decorators/
│   └── current-user.decorator.ts
├── dto/
│   ├── login.dto.ts
│   ├── forgot-password.dto.ts
│   ├── reset-password.dto.ts
│   └── change-password.dto.ts
├── guards/
│   └── jwt-auth.guard.ts
├── interfaces/
│   └── jwt-payload.interface.ts
├── strategies/
│   └── jwt.strategy.ts
├── auth.controller.ts
├── auth.service.ts
├── auth.module.ts
├── auth.controller.spec.ts
├── auth.service.spec.ts
└── readme.md
```

## JWT access tokens

Claims:

| Claim | Meaning |
|-------|---------|
| `sub` | User id |
| `email` | Account email |
| `role` | `ADMINISTRATOR` or `MAINTAINER` |

`JwtStrategy` re-loads the user on every request and rejects tokens for inactive or soft-deleted accounts.

Environment:

```text
JWT_SECRET=change_me_to_a_long_random_value
JWT_EXPIRES_IN=1h
```

## Password reset

1. Client calls `forgot-password` with an email.
2. If the account exists and is active, a 6-digit OTP is hashed (bcrypt) and stored on the user document with a 15-minute expiry.
3. `MailService.sendPasswordResetOtp` delivers the plain OTP.
4. Client submits email + OTP + new password to `reset-password`.
5. After 5 failed OTP attempts the reset state is cleared and a new code must be requested.

Security notes:

- Forgot-password always returns a generic success message (no email enumeration).
- OTPs are stored hashed, never in plain text.
- Login and reset endpoints are throttled more tightly than the global rate limit.
- Passwords and OTPs are never logged.

## Guards & decorators

| Export | Purpose |
|--------|---------|
| `JwtAuthGuard` | Passport JWT guard (preferred over `AuthGuard('jwt')`) |
| `CurrentUser` | Param decorator for the authenticated `AuthUser` |
| `Roles` + `RolesGuard` (common) | RBAC on protected controllers |

## Related modules

- `users` — account storage, password hashing, reset OTP fields
- `mail` — OTP and welcome email delivery
- `common` — `AuthUser`, `Role`, `RolesGuard`
