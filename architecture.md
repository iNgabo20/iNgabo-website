# iNgabo Website Architecture

Version: 1.0.0

---

# Overview

The **iNgabo Website** is the official online presence of the iNgabo project. It is designed as an enterprise-grade, full-stack web platform that combines a modern public-facing website with a secure Content Management System (CMS). The platform enables administrators and maintainers to manage website content while providing visitors with a fast, responsive, and informative experience.

The project follows a **monorepo architecture**, where the frontend and backend are developed, tested, and maintained independently while sharing common documentation and development standards.

---

# System Objectives

The platform is designed to achieve the following objectives:

- Present the iNgabo project to the public
- Educate users about telecommunications fraud
- Showcase the project's capabilities and impact
- Publish technical blogs and project updates
- Introduce team members and strategic partners
- Enable public communication through contact messages
- Collect public feedback and ratings
- Provide administrators with a secure content management system

---

# High-Level Architecture

```text
                         +-----------------------+
                         |     Public Visitors   |
                         +-----------+-----------+
                                     |
                                     |
                               HTTPS Requests
                                     |
                                     ▼
                      +-------------------------------+
                      |     Next.js Public Website     |
                      |                               |
                      | • Landing Page                |
                      | • About                      |
                      | • Features                   |
                      | • Solutions                  |
                      | • Blog                       |
                      | • Team                       |
                      | • Partners                   |
                      | • Contact                    |
                      +---------------+---------------+
                                      |
                           HTTPS REST API
                                      |
                                      ▼
                     +--------------------------------+
                     |        NestJS Backend          |
                     |                                |
                     | Authentication                |
                     | Users                         |
                     | Blogs                         |
                     | Features                      |
                     | Members                       |
                     | Partners                      |
                     | Messages                      |
                     | Comments                      |
                     | Ratings                       |
                     | Settings                      |
                     | Dashboard                     |
                     | Uploads                       |
                     | Notifications                |
                     +---------------+---------------+
                                     |
                                     ▼
                          MongoDB + Mongoose ODM
```

---

# Repository Architecture

```text
iNgabo-website/

├── AGENTS.md
├── README.md
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── database.md
│   ├── deployment.md
│   ├── branding.md
│   └── roadmap.md
│
├── ingabo-web/
│
│   ├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── middleware.ts
│
└── ingabo-website-backend/
    │
    ├── src/
    ├── auth/
    ├── users/
    ├── roles/
    ├── permissions/
    ├── blog/
    ├── comments/
    ├── ratings/
    ├── members/
    ├── partners/
    ├── features/
    ├── messages/
    ├── settings/
    ├── dashboard/
    ├── upload/
    ├── notifications/
    ├── mail/
    ├── common/
    ├── config/
    ├── database/
    └── app.module.ts
```

---

# System Components

The platform consists of two independent applications.

## 1. iNgabo Web

The frontend application is responsible for all user interactions and content presentation.

### Responsibilities

- Landing page
- About page
- Solution overview
- Feature showcase
- Blog pages
- Team directory
- Partners page
- Contact page
- Ratings
- Responsive user experience
- SEO optimization

### Technology Stack

- Next.js
- TypeScript
- Tailwind CSS
- React
- TanStack Query
- Axios
- Zustand

---

## 2. iNgabo Website Backend

The backend exposes secure REST APIs and acts as the Content Management System (CMS).

### Responsibilities

- Authentication
- User management
- Blog management
- Team management
- Partner management
- Website settings
- Contact messages
- Public comments
- Ratings
- Notifications
- Media uploads
- Dashboard analytics

### Technology Stack

- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT
- Passport
- Swagger

---

# User Roles

The platform supports three categories of users.

## Administrator

The Administrator has unrestricted access to the platform.

### Responsibilities

- Create maintainers
- Remove maintainers
- Manage administrator accounts
- Publish and unpublish blogs
- Moderate comments
- Manage website features
- Manage team members
- Manage partners
- Manage website settings
- View dashboard analytics
- Manage uploaded media
- Full CRUD across all modules

---

## Maintainer

Maintainers are created by an Administrator.

### Responsibilities

- Create blogs
- Update blogs
- Delete blogs
- Manage members
- Manage partners
- Manage website features
- Moderate comments
- View visitor messages

### Restrictions

Maintainers cannot:

- Create administrators
- Delete administrators
- Modify global system settings
- Manage authentication configuration

---

## Public Visitor

Visitors access the platform without authentication.

### Capabilities

- Browse the website
- Read blogs
- Explore project features
- View team members
- View partners
- Submit contact messages
- Leave blog comments
- Submit ratings
- Subscribe to future newsletters

### Restrictions

Visitors cannot:

- Access protected APIs
- Modify published content
- Access the administration dashboard

---

# Request Lifecycle

```text
Visitor

↓

Next.js Frontend

↓

Axios HTTP Client

↓

NestJS REST API

↓

Authentication / Authorization

↓

Controller

↓

Service

↓

Mongoose Model

↓

MongoDB

↓

Response

↓

Frontend Rendering
```

---

# Data Flow

```text
Public Visitor
        │
        ▼
Next.js Frontend
        │
        ▼
REST API
        │
        ▼
NestJS Services
        │
        ▼
MongoDB
        │
        ▼
REST Response
        │
        ▼
User Interface
```

---

# Security Architecture

The platform adopts a defense-in-depth security model.

## Authentication

- JWT Access Tokens
- Passport.js
- Secure password hashing using bcrypt

## Authorization

- Role-Based Access Control (RBAC)
- Route Guards
- Permission Guards

## API Protection

- Request validation
- Input sanitization
- Rate limiting
- Helmet security headers
- CORS configuration
- Secure environment variables

---

# Backend Architecture

The backend follows a modular architecture where each feature is implemented as an independent NestJS module.

```text
Controller

↓

Service

↓

Repository (Mongoose)

↓

MongoDB
```

Each module encapsulates:

- Controllers
- Services
- DTOs
- Schemas
- Business logic
- Validation
- Tests

This separation improves maintainability, scalability, and testability.

---

# Frontend Architecture

The frontend follows a feature-oriented architecture.

```text
Pages

↓

Features

↓

Components

↓

Hooks

↓

Services

↓

REST API
```

Each feature owns its components, hooks, types, and services, promoting modular development and reducing coupling.

---

# Database Architecture

MongoDB stores all persistent application data.

Primary collections include:

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

Relationships are managed using MongoDB ObjectId references through Mongoose.

---

# API Design

The backend exposes versioned REST endpoints.

```text
/api/v1

├── auth
├── users
├── blogs
├── comments
├── ratings
├── members
├── partners
├── features
├── messages
├── settings
├── uploads
├── dashboard
```

All protected endpoints require JWT authentication and appropriate role permissions.

---

# Deployment Architecture

```text
                Internet
                    │
                    ▼
             Next.js Frontend
              (Vercel / CDN)
                    │
                    ▼
              HTTPS REST API
                    │
                    ▼
           NestJS Backend Server
             (Render / VPS)
                    │
                    ▼
             MongoDB Atlas Cluster
```

---

# Scalability Considerations

The architecture is designed for long-term growth.

Key scalability features include:

- Modular backend modules
- Feature-oriented frontend
- Stateless REST APIs
- Independent frontend and backend deployments
- Centralized configuration
- Versioned APIs
- Strong TypeScript typing
- Separation of business logic and presentation

---

# Future Enhancements

The architecture supports future expansion without significant restructuring.

Planned enhancements include:

- Multi-language support (i18n)
- Progressive Web App (PWA)
- Advanced search
- Newsletter management
- Scheduled blog publishing
- CMS preview mode
- Audit logging
- Cloud storage integration
- AI-assisted content management
- GraphQL API
- Redis caching
- WebSocket notifications
- Elasticsearch integration
- Analytics dashboard
- Mobile application support

---

# Design Principles

The project is built around the following engineering principles:

- Modular architecture
- Feature-first organization
- Separation of concerns
- Clean code
- SOLID principles
- RESTful API design
- Scalability
- Maintainability
- Security by design
- Performance optimization
- Accessibility by default

---

# Conclusion

The iNgabo Website adopts a modern enterprise architecture that separates presentation, business logic, and data management into clearly defined layers. By combining a Next.js frontend with a NestJS backend and MongoDB database, the platform provides a secure, scalable, and maintainable foundation for delivering public content and managing it through an integrated CMS. This architecture is intentionally designed to evolve with the iNgabo project, supporting future capabilities while preserving clean boundaries between components and services.