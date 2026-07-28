# AGENTS.md

# iNgabo Website Client Development Guidelines

## Project Overview

The **iNgabo Website Client** is the official public-facing website of the iNgabo project. It is responsible for presenting the project to the public, educating visitors about telecommunications fraud, showcasing platform capabilities, publishing technical content, and providing communication channels between the public and the iNgabo team.

The application is built with **Next.js**, **TypeScript**, and **Tailwind CSS**, following a **feature-oriented**, **component-driven**, and **server-first** architecture.

The frontend communicates **exclusively** with the **iNgabo Website Backend** through REST APIs. It must never communicate directly with the database.

---

# Technology Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- UI Library: React
- Styling: Tailwind CSS
- State Management: Zustand
- Server State: TanStack Query
- Forms: React Hook Form
- Validation: Zod
- HTTP Client: Axios
- Icons: Lucide React
- Animation: Framer Motion

---

# Project Structure

```
src/

app/

components/

features/

hooks/

lib/

services/

store/

styles/

types/

utils/

middleware.ts
```

Every new feature should follow this architecture.

---

# Architectural Principles

Every contribution must follow these principles.

- Feature-first architecture
- Server Components by default
- Component reusability
- Separation of concerns
- Responsive-first design
- Accessibility-first development
- Clean architecture
- Strict TypeScript
- Maintainable code
- Performance optimization

Avoid creating tightly coupled components.

---

# Development Philosophy

The frontend should remain:

- Fast
- Accessible
- Responsive
- Secure
- SEO optimized
- Easy to maintain
- Easy to extend

Whenever implementing a feature, prioritize long-term maintainability over quick solutions.

---

# Feature Organization

Every business feature should be self-contained.

Example

```
features/

blog/

components/

hooks/

services/

schemas/

types/

utils/
```

Business logic should remain inside the feature.

Avoid placing feature-specific code inside global folders.

---

# Components

Components should be:

- Small
- Reusable
- Stateless whenever possible
- Easy to test

Preferred hierarchy

```
Page

↓

Feature

↓

Section

↓

Reusable Components

↓

UI Components
```

Never create oversized components containing multiple responsibilities.

---

# Server Components

Prefer Server Components whenever possible.

Use Client Components only when:

- State is required
- Browser APIs are needed
- Event handlers are required
- Animations require client execution

Do not convert components into Client Components without justification.

---

# Styling

Use only Tailwind CSS.

Requirements

- Mobile-first
- Responsive layouts
- Consistent spacing
- Consistent typography
- Reusable utility classes

Avoid

- Inline styles
- CSS duplication
- Hardcoded dimensions when unnecessary

---

# State Management

Global State

Use Zustand only for:

- Theme
- Navigation
- Authentication state
- Global UI

Do not store server data inside Zustand.

Server data belongs in TanStack Query.

---

# Data Fetching

All HTTP requests must go through the services layer.

```
Component

↓

Feature Hook

↓

Service

↓

Axios

↓

Backend API
```

Never call Axios directly from UI components.

---

# Services

Each API resource should have its own service.

Example

```
services/

blog.service.ts

feature.service.ts

member.service.ts

partner.service.ts

message.service.ts
```

Responsibilities

- API communication
- Request configuration
- Response typing
- Error handling

No UI logic should exist inside services.

---

# Custom Hooks

Custom hooks should encapsulate reusable logic.

Examples

```
useBlogs()

useMembers()

usePartners()

useContactForm()

useScroll()

useTheme()
```

Avoid placing business logic directly inside components.

---

# TypeScript

Always use strict typing.

Requirements

- Interfaces
- Types
- Enums
- Generics where appropriate

Avoid

```
any
```

unless absolutely unavoidable.

---

# API Communication

Backend endpoints are versioned.

Example

```
/api/v1/blogs

/api/v1/features

/api/v1/members

/api/v1/messages
```

Use the centralized Axios client from `lib/axios.ts`.

Never duplicate API clients.

---

# Error Handling

Handle all API failures gracefully.

Display meaningful messages.

Never expose raw backend errors to users.

Always provide loading, empty, and error states for asynchronous UI.

---

# Performance

Optimize for performance.

Use

- Server Components
- Dynamic imports
- Lazy loading
- Next.js Image
- Route-level code splitting
- Memoization where appropriate
- Efficient rendering

Avoid

- Unnecessary client rendering
- Duplicate API requests
- Excessive state updates

---

# Accessibility

All pages must follow WCAG guidelines.

Requirements

- Semantic HTML
- Keyboard navigation
- Visible focus indicators
- Accessible forms
- Proper labels
- Alt text for images
- Correct heading hierarchy
- ARIA attributes only where necessary

Accessibility is not optional.

---

# SEO

Every public page should include

- Title
- Description
- Keywords
- Open Graph metadata
- Twitter Card metadata
- Canonical URL
- Structured Data (JSON-LD)

Blog pages should generate metadata dynamically.

---

# Security

Never expose:

- API secrets
- Environment secrets
- Internal endpoints
- Sensitive information

Always validate user input before sending requests.

Sanitize displayed content originating from external sources.

---

# Responsive Design

Support

- Mobile
- Tablet
- Laptop
- Desktop
- Large Desktop

Layouts should gracefully adapt to different screen sizes.

---

# UI Guidelines

The user interface should communicate professionalism and trust.

Design characteristics

- Clean layouts
- Consistent spacing
- Clear typography
- Meaningful animations
- Accessible color palette
- Modern interactions

Avoid unnecessary visual complexity.

---

# Testing

When implementing critical functionality, include tests where appropriate.

Examples

- Feature tests
- Hook tests
- Component tests

Business-critical behavior should be verifiable.

---

# Documentation

Whenever introducing new features:

- Update feature documentation.
- Keep README current.
- Document reusable components when necessary.
- Remove outdated documentation.

Documentation should evolve alongside the codebase.

---

# AI Agent Responsibilities

Before implementing any feature:

1. Understand the existing architecture.
2. Reuse existing components whenever possible.
3. Follow feature boundaries.
4. Maintain strict typing.
5. Keep components focused.
6. Minimize technical debt.
7. Preserve performance.
8. Preserve accessibility.
9. Preserve SEO.
10. Produce production-ready code.

If multiple implementation approaches exist, choose the solution that is simplest, most maintainable, and best aligned with the project's architecture.

---

# Project Goal

Every contribution should strengthen the iNgabo Website Client as a modern, secure, fast, and highly maintainable public platform that effectively communicates the iNgabo project's mission while delivering an exceptional user experience across all supported devices.