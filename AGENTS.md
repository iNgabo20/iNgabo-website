# AGENTS.md

# iNgabo Website Development Guidelines

## Project Overview

The **iNgabo Website** is the official public web platform for the iNgabo project. The repository follows a **monorepo architecture** containing two independent applications:

- **ingabo-web** — Next.js public website.
- **ingabo-website-backend** — NestJS REST API and Content Management System (CMS).

The objective is to build a modern, secure, scalable, and maintainable platform that communicates the vision of iNgabo while providing administrators with a powerful content management system.

---

# Architecture

This repository follows a **feature-oriented**, **modular**, and **domain-driven** architecture.

## Frontend

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: Zustand
- Server State: TanStack Query
- Forms: React Hook Form
- Validation: Zod
- HTTP Client: Axios

The frontend communicates exclusively with the backend through REST APIs.

---

## Backend

- Framework: NestJS
- Language: TypeScript
- Database: MongoDB
- ODM: Mongoose
- Authentication: JWT + Passport
- Authorization: RBAC
- Validation: class-validator
- Documentation: Swagger

The backend exposes versioned REST APIs (`/api/v1`) consumed by the frontend.

---

# Engineering Principles

All generated code must follow these principles:

- Feature-first organization
- Separation of concerns
- SOLID principles
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple)
- Dependency Injection
- Clean Architecture
- Domain-driven modularization
- Strict TypeScript
- Reusable components
- Small focused functions
- Production-ready code
- Security by default

Never generate quick hacks, temporary fixes, duplicated code, or unnecessary abstractions.

---

# Coding Standards

## General

- Use TypeScript everywhere.
- Enable strict typing.
- Avoid the `any` type unless absolutely unavoidable.
- Use descriptive names.
- Keep functions short and focused.
- Prefer composition over inheritance.
- Follow existing project conventions.
- Write readable and maintainable code.

---

## Frontend Standards

### Components

- Components should be reusable.
- Components should have a single responsibility.
- Prefer Server Components unless client-side interactivity is required.
- Use Client Components only when necessary.

### Styling

- Tailwind CSS only.
- Avoid inline styles.
- Build responsive layouts using a mobile-first approach.
- Maintain consistent spacing and typography.

### Data Fetching

- All API communication goes through the `services/` layer.
- Use TanStack Query for server state.
- Do not fetch directly inside UI components unless using Server Components appropriately.

### State

Use:

- Zustand for global state
- Local React state for component-specific logic

Avoid unnecessary global state.

---

## Backend Standards

### NestJS Modules

Every feature should follow the standard NestJS module structure.

```
feature/

controller

service

module

dto/

schemas/

interfaces/

guards/

decorators/

readme.md
```

### Controllers

Controllers should:

- Validate requests
- Delegate business logic to services
- Never contain business logic

### Services

Services should:

- Implement business rules
- Handle database interactions
- Throw appropriate exceptions
- Remain framework-independent where practical

### DTOs

Every endpoint must use DTOs.

Validate all incoming requests using:

- class-validator
- class-transformer

### Database

Use Mongoose schemas.

Requirements:

- Proper indexing
- Required field validation
- Enum validation where applicable
- Timestamps enabled
- Soft delete support where appropriate

---

# Security Requirements

Security is mandatory.

Always implement:

- JWT authentication
- Role-Based Access Control (RBAC)
- Password hashing using bcrypt
- Request validation
- Input sanitization
- Helmet security headers
- Rate limiting
- CORS configuration
- Secure environment variables

Never expose:

- Secrets
- Database credentials
- JWT secrets
- API keys

---

# User Roles

## Administrator

Has complete control of the platform.

Can:

- Manage administrators
- Manage maintainers
- Manage blogs
- Manage members
- Manage partners
- Manage features
- Manage messages
- Moderate comments
- Manage uploads
- Configure website settings
- View analytics

---

## Maintainer

Created by administrators.

Can:

- Create blogs
- Update blogs
- Delete blogs
- Manage members
- Manage partners
- Manage website features
- Moderate comments
- View contact messages

Cannot:

- Create administrators
- Delete administrators
- Modify global system settings

---

## Public Visitor

Can:

- Browse website
- Read blogs
- Submit ratings
- Submit comments
- Send contact messages

No authentication required.

---

# API Standards

All APIs should follow REST principles.

Example:

```
GET

POST

PUT

PATCH

DELETE
```

Every endpoint should:

- Validate requests
- Return consistent responses
- Return proper HTTP status codes
- Handle errors gracefully

Use API versioning:

```
/api/v1
```

---

# Error Handling

Use centralized exception handling.

Standard response format:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": []
}
```

---

# Logging

Use structured logging.

Log:

- Authentication events
- Errors
- Warnings
- API requests
- Administrative actions

Never log:

- Passwords
- Tokens
- Secrets
- Personal sensitive information

---

# Performance

Always prioritize performance.

Use:

- Pagination
- Database indexes
- Lazy loading
- Code splitting
- Server Components
- Optimized database queries
- Image optimization
- Response compression

Avoid:

- N+1 queries
- Duplicate API requests
- Unnecessary re-renders

---

# Accessibility

All frontend code must follow WCAG accessibility guidelines.

Requirements:

- Semantic HTML
- Keyboard navigation
- Focus visibility
- Proper heading hierarchy
- Accessible forms
- ARIA attributes where necessary
- Sufficient color contrast

---

# SEO

Every public page should support:

- Metadata
- Open Graph
- Twitter Cards
- Canonical URLs
- Structured Data (JSON-LD)

Blog pages should generate SEO metadata dynamically.

---

# Testing

New features should include tests where appropriate.

Backend:

- Unit tests
- Integration tests

Frontend:

- Component tests
- Hook tests

Critical business logic should always be tested.

---

# Documentation

When introducing a new feature:

- Update the relevant README.
- Update API documentation if endpoints change.
- Update architecture documentation if the design changes.
- Keep inline comments minimal and meaningful.

---

# AI Agent Instructions

When implementing new functionality:

1. Understand the existing architecture before making changes.
2. Reuse existing components, utilities, and services.
3. Preserve modular boundaries.
4. Avoid introducing breaking changes.
5. Follow the established coding standards.
6. Maintain strict TypeScript typing.
7. Write production-ready code.
8. Keep business logic inside services.
9. Keep UI components focused on presentation.
10. Ensure security, scalability, and maintainability remain top priorities.

If multiple implementation approaches are possible, choose the one that best aligns with the existing architecture, minimizes technical debt, and improves long-term maintainability.

---

# Project Goal

Every contribution should move the iNgabo Website toward becoming a secure, professional, and enterprise-grade platform that effectively showcases the project's mission while providing a robust content management experience for administrators and maintainers.