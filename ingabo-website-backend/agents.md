
# AGENTS.md

# iNgabo Website Backend Development Guidelines

## Project Overview

The **iNgabo Website Backend** is the official Content Management System (CMS) and REST API that powers the iNgabo public website.

It is responsible for:

- Authentication and authorization
- User management
- Blog publishing
- Website content management
- Team management
- Partner management
- Public comments
- Ratings
- Contact messages
- Media uploads
- Notifications
- Dashboard analytics

The backend is built using **NestJS**, **TypeScript**, **MongoDB**, and **Mongoose**, following a modular, domain-driven architecture that emphasizes maintainability, security, and scalability.

The backend serves the **Next.js frontend** exclusively through versioned REST APIs.

---

# Technology Stack

- Framework: NestJS
- Language: TypeScript
- Runtime: Node.js
- Database: MongoDB
- ODM: Mongoose
- Authentication: JWT + Passport
- Authorization: Role-Based Access Control (RBAC)
- Validation: class-validator
- Transformation: class-transformer
- Documentation: Swagger
- File Uploads: Multer
- Email: Nodemailer
- Password Hashing: bcrypt
- Security: Helmet + Throttler

---

# Architecture Principles

The backend follows these engineering principles.

- Modular Architecture
- Feature-Oriented Design
- Domain-Driven Development
- SOLID Principles
- Separation of Concerns
- Dependency Injection
- Clean Architecture
- Production-Ready Code
- Security by Default
- Strict TypeScript

Every feature should remain independent and loosely coupled.

---

# Module Structure

Every business feature should follow the same structure.

```text
feature/

├── dto/
├── entities/
├── schemas/
├── interfaces/
├── decorators/
├── guards/
├── pipes/
├── feature.controller.ts
├── feature.service.ts
├── feature.module.ts
├── feature.controller.spec.ts
├── feature.service.spec.ts
└── readme.md
```

Not every feature requires every directory, but the overall structure should remain consistent.

---

# Project Structure

```text
src/

auth/

users/

roles/

permissions/

blog/

comments/

ratings/

members/

partners/

features/

messages/

settings/

dashboard/

upload/

notifications/

mail/

common/

config/

database/

app.module.ts
```

Each directory owns its domain and should not contain unrelated business logic.

---

# Controllers

Controllers are responsible only for:

- Receiving HTTP requests
- Validating input
- Calling services
- Returning HTTP responses

Controllers must never contain:

- Database queries
- Business logic
- Complex validation
- Authorization logic beyond guards

Keep controllers thin.

---

# Services

Services contain all business logic.

Responsibilities include:

- Business rules
- Database operations
- Data transformations
- External integrations
- Error handling

Services should be reusable and focused on a single domain.

---

# DTOs

Every endpoint must use DTOs.

Requirements:

- class-validator
- class-transformer

Validate:

- Required fields
- Email addresses
- URLs
- Length constraints
- Enums
- ObjectIds
- Arrays
- Nested objects

Never accept raw request bodies directly.

---

# Database

Use Mongoose Schemas.

Requirements

- Required fields
- Proper indexes
- Timestamps
- Validation
- References using ObjectId
- Enum constraints
- Unique constraints where appropriate

Collections include:

- users
- blogs
- comments
- ratings
- members
- partners
- features
- messages
- settings
- notifications

---

# Authentication

Authentication uses JWT.

Requirements

- Access Tokens
- Refresh Tokens (future support)
- Password hashing using bcrypt
- Passport JWT Strategy
- Authentication Guards

Passwords must never be stored in plain text.

---

# Authorization

Authorization follows Role-Based Access Control (RBAC).

Supported roles

- Administrator
- Maintainer

Future roles should integrate with the existing permission system rather than introducing custom authorization logic.

---

# User Permissions

## Administrator

Full system control.

Can:

- Create administrators
- Remove administrators
- Create maintainers
- Remove maintainers
- Manage users
- Publish blogs
- Manage comments
- Manage features
- Manage partners
- Manage team members
- Configure website settings
- Manage uploads
- View analytics
- Read messages
- View notifications

Has unrestricted CRUD access.

---

## Maintainer

Created only by an administrator.

Can:

- Create blogs
- Update blogs
- Delete blogs
- Manage members
- Manage partners
- Manage features
- Moderate comments
- View public messages

Cannot:

- Create administrators
- Delete administrators
- Change website settings
- Modify authentication configuration

---

## Public Visitor

No authentication required.

Can:

- Read blogs
- Browse features
- Browse team members
- Browse partners
- Leave comments
- Submit ratings
- Send contact messages

Cannot access protected resources.

---

# API Standards

REST API only.

Version all endpoints.

Example

```text
/api/v1/blogs

/api/v1/features

/api/v1/members

/api/v1/messages
```

Each endpoint should:

- Validate requests
- Return typed responses
- Return proper HTTP status codes
- Handle exceptions consistently

---

# Response Format

Successful responses

```json
{
  "success": true,
  "data": {}
}
```

Error responses

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": []
}
```

Maintain consistent response structures across the API.

---

# Error Handling

Use centralized exception filters.

Never expose:

- Stack traces
- Internal implementation details
- Database errors
- Secrets

Return meaningful, user-friendly messages.

---

# Validation

Every incoming request must be validated.

Examples include:

- DTO validation
- File validation
- Enum validation
- ObjectId validation
- Authentication validation

Reject invalid requests before reaching business logic.

---

# File Uploads

Use Multer for uploads.

Supported media

- Blog cover images
- Team member photos
- Partner logos
- Feature illustrations
- Website assets

Validate:

- File type
- MIME type
- File size

Reject unsupported uploads.

---

# Logging

Implement structured logging.

Log:

- Authentication events
- API requests
- Administrative actions
- Errors
- Warnings
- System events

Never log:

- Passwords
- JWT tokens
- Secrets
- Sensitive personal information

---

# Security

Security is mandatory.

Always implement:

- Helmet
- JWT Authentication
- RBAC
- Rate limiting
- Input validation
- CORS
- Environment-based configuration
- Password hashing
- DTO validation
- Secure HTTP headers

Never hardcode:

- API keys
- Database credentials
- Secrets
- Tokens

---

# Performance

Prioritize efficient APIs.

Use:

- Pagination
- Database indexes
- Lean Mongoose queries
- Efficient projections
- Aggregation pipelines where appropriate
- Response compression

Avoid:

- N+1 query patterns
- Duplicate queries
- Blocking operations

---

# Documentation

Whenever a feature changes:

- Update the module README.
- Update API documentation.
- Update Swagger decorators.
- Update architecture documentation when required.

Documentation should remain synchronized with the implementation.

---

# Testing

Every business-critical feature should include tests.

Backend tests include:

- Unit tests
- Integration tests
- Controller tests
- Service tests

Critical business rules should always be covered.

---

# AI Agent Responsibilities

Before generating code:

1. Understand the existing module structure.
2. Reuse existing services and utilities.
3. Respect feature boundaries.
4. Keep controllers thin.
5. Place business logic inside services.
6. Maintain strict TypeScript typing.
7. Validate every request.
8. Preserve security best practices.
9. Write production-ready, maintainable code.
10. Update documentation when functionality changes.

When several implementation options exist, choose the approach that minimizes technical debt, aligns with NestJS best practices, and preserves long-term scalability.

---

# Code Quality Checklist

Before considering a task complete, verify that:

- TypeScript compiles without errors.
- ESLint passes.
- No `any` types are introduced without justification.
- DTO validation is implemented.
- Authentication and authorization are enforced where required.
- Error handling is consistent.
- API responses follow the project standard.
- Business logic resides only in services.
- Documentation is updated if the architecture or API changed.

---

# Project Goal

Every contribution should strengthen the iNgabo Website Backend as a secure, modular, enterprise-grade REST API and content management platform. All code should prioritize maintainability, security, scalability, and consistency while providing a reliable foundation for the iNgabo public website and future ecosystem services.