# iNgabo Website Client Architecture

Version: 1.0.0

---

# Overview

The **iNgabo Website Client** is the official public-facing web application for the iNgabo project. It is responsible for communicating the mission of the platform, educating visitors about telecom fraud, showcasing project capabilities, publishing technical blogs, presenting the team and partners, and providing communication channels between the public and the iNgabo team.

The application follows a **feature-oriented architecture** built with **Next.js**, **TypeScript**, and **Tailwind CSS**, emphasizing scalability, maintainability, performance, and accessibility.

This architecture is intentionally designed to support future growth without requiring significant restructuring.

---

# Technology Stack

| Layer | Technology |
|---------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Server State | TanStack Query |
| Forms | React Hook Form |
| Validation | Zod |
| HTTP Client | Axios |
| Icons | Lucide React |
| Animation | Framer Motion |
| Authentication | JWT (Admin Portal Only) |
| SEO | Next Metadata API |
| Image Optimization | Next Image |
| Deployment | github pages |

---

# Architectural Principles

The frontend follows several engineering principles.

- Feature-first organization
- Separation of concerns
- Component reusability
- Server-first rendering where appropriate
- Responsive by default
- Accessibility-first development
- Type safety
- API-driven development
- Clean architecture
- Scalable folder organization

---

# High-Level Architecture

```
                   Browser
                       │
                       │
              Next.js Application
                       │
      ┌────────────────┼────────────────┐
      │                │                │
      │                │                │
 UI Components     Features        Services Layer
      │                │                │
      └────────────────┼────────────────┘
                       │
                 API Client (Axios)
                       │
                 NestJS REST API
                       │
                  MongoDB Database
```

---

# Repository Structure

```
ingabo-web/

├── public/
│
├── src/
│
│   ├── app/
│   │
│   ├── components/
│   │
│   ├── features/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │
│   ├── services/
│   │
│   ├── store/
│   │
│   ├── styles/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   └── middleware.ts
│
├── package.json
└── README.md
```

---

# Directory Responsibilities

## app/

Contains all application routes using the Next.js App Router.

Example

```
app/

layout.tsx

page.tsx

about/

features/

blog/

blog/[slug]/

team/

partners/

contact/

privacy/

terms/

not-found.tsx
```

Responsibilities

- Route definitions
- Layouts
- Loading states
- Error pages
- Metadata
- Server Components

---

## components/

Contains reusable UI components shared across the application.

Example

```
components/

ui/

layout/

navigation/

footer/

hero/

cards/

buttons/

forms/

blog/

common/
```

Responsibilities

- Stateless UI
- Shared layouts
- Design system
- Presentational components

Examples

- Button
- Card
- Navbar
- Footer
- Section Title
- Modal
- Badge
- Avatar

---

## features/

Contains business features.

Each feature owns everything related to itself.

Example

```
features/

home/

about/

blog/

contact/

members/

partners/

features/

ratings/

messages/
```

Each feature may contain

```
feature/

components/

hooks/

services/

types/

schemas/

utils/
```

This allows every feature to remain self-contained.

---

## hooks/

Contains reusable custom React hooks.

Example

```
hooks/

useBlogs.ts

useScroll.ts

useContactForm.ts

useMembers.ts

usePartners.ts

useDarkMode.ts
```

Responsibilities

- API hooks
- Utility hooks
- State hooks
- Window events
- Browser APIs

---

## lib/

Contains application libraries and configuration.

Example

```
lib/

axios.ts

query-client.ts

env.ts

constants.ts

metadata.ts

validators.ts
```

Responsibilities

- Axios instance
- Environment variables
- API configuration
- Global constants
- Shared configuration

---

## services/

Responsible for communicating with the backend.

Example

```
services/

blog.service.ts

member.service.ts

feature.service.ts

contact.service.ts

partner.service.ts

rating.service.ts
```

Responsibilities

- API requests
- CRUD operations
- Error handling
- Response mapping

No UI logic should exist here.

---

## store/

Contains global application state.

Recommended library

```
Zustand
```

Example

```
store/

theme.store.ts

ui.store.ts

auth.store.ts
```

Responsibilities

- Theme
- Mobile menu
- Authentication
- User preferences

---

## styles/

Global styles.

Example

```
styles/

globals.css

animations.css

typography.css
```

Responsibilities

- Global CSS
- Tailwind imports
- Fonts
- Utility classes

---

## types/

Contains shared TypeScript definitions.

Example

```
types/

blog.ts

member.ts

feature.ts

partner.ts

api.ts

common.ts
```

Responsibilities

- Interfaces
- DTOs
- API responses
- Shared types

---

## utils/

Utility functions.

Example

```
utils/

date.ts

slug.ts

format.ts

seo.ts

validators.ts
```

Responsibilities

- Date formatting
- String formatting
- Slug generation
- Helpers

Utilities should remain pure functions.

---

## middleware.ts

Handles request interception.

Responsibilities

- Authentication
- Redirects
- Security headers
- Route protection

---

# Feature Architecture

Every feature should be self-contained.

Example

```
features/

blog/

components/

hooks/

services/

types/

schemas/

utils/
```

Advantages

- Independent development
- Better maintainability
- Easier testing
- Reduced coupling

---

# Routing Structure

```
/

About

Features

Solutions

Blog

Blog/[slug]

Team

Partners

Contact

Privacy Policy

Terms

404
```

---

# Component Hierarchy

```
Layout

├── Navbar

├── Hero

├── Sections

│     ├── Features

│     ├── Solutions

│     ├── Team

│     ├── Partners

│     ├── Testimonials

│     └── Blog Preview

├── CTA

└── Footer
```

---

# State Management

Global State

- Theme
- Navigation
- Authentication
- User Preferences

Local State

- Forms
- Search
- Filters
- Modals

Server State

Managed using TanStack Query.

Examples

- Blogs
- Team Members
- Features
- Partners

---

# API Communication

```
Next.js

↓

Axios Client

↓

REST API

↓

NestJS Backend

↓

MongoDB
```

The frontend never communicates directly with the database.

---

# Performance Strategy

- Server Components by default
- Client Components only when necessary
- Dynamic imports
- Lazy loading
- Image optimization
- Route-level code splitting
- Incremental Static Regeneration (ISR) for blogs where appropriate
- Metadata optimization
- Font optimization

---

# SEO Strategy

Every page should include

- Title
- Description
- Keywords
- Open Graph metadata
- Twitter Card metadata
- Canonical URL
- Structured Data (JSON-LD)

Blogs should generate metadata dynamically from backend content.

---

# Accessibility

The application follows WCAG recommendations.

Requirements

- Semantic HTML
- Keyboard navigation
- Focus management
- Accessible forms
- Proper heading hierarchy
- Sufficient color contrast
- Alt text for all images
- ARIA attributes where necessary

---

# Security

The frontend should never expose secrets.

Security considerations

- Environment variables
- HTTPS only
- Secure cookies for authenticated routes
- Content Security Policy (CSP)
- Input validation
- Output sanitization
- XSS prevention
- CSRF protection where applicable

---

# Responsive Design

The application follows a mobile-first approach.

Supported breakpoints

- Mobile
- Tablet
- Laptop
- Desktop
- Large Desktop

Layouts should gracefully adapt across all supported screen sizes.

---

# Coding Standards

- Strict TypeScript
- ESLint
- Prettier
- Feature-first organization
- Small reusable components
- No duplicated business logic
- Consistent naming conventions
- Strong typing for all API responses

---

# Future Enhancements

The architecture is designed to support future additions without major restructuring.

Potential enhancements include:

- Multi-language (i18n)
- Dark mode
- Progressive Web App (PWA)
- Search functionality
- Newsletter subscription
- Documentation portal
- Interactive telecom fraud simulator
- Case studies
- Press releases
- Careers page
- Media gallery
- Analytics dashboard
- CMS preview mode
- Offline caching for static content

---

# Conclusion

The iNgabo Website Client adopts a modern, feature-driven architecture that prioritizes scalability, maintainability, and performance. By separating routing, presentation, business logic, state management, and API communication into dedicated layers, the application remains easy to extend and maintain as the iNgabo project evolves. This structure provides a strong foundation for delivering a professional, secure, and high-performance public website while supporting future capabilities without requiring architectural redesign.