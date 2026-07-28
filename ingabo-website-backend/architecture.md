# iNgabo Website Backend Architecture

Version: 1.0.0

---

# Overview

The **iNgabo Website Backend** is the official backend service that powers the iNgabo public website and its administrative dashboard. It provides secure APIs for content management, user administration, public communication, and website configuration while exposing only public resources to anonymous visitors.

The backend is designed as a **modular, enterprise-grade REST API** built with **NestJS**, **MongoDB**, and **Mongoose**, following Domain-Driven Design (DDD) and feature-oriented architecture principles.

Its primary responsibilities are:

- Content Management System (CMS)
- User Authentication & Authorization
- Blog Publishing
- Team & Partner Management
- Website Configuration
- Public Communication
- Media Management
- Analytics
- Notifications

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | NestJS |
| Language | TypeScript |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT + Passport |
| Authorization | Role Guards |
| Password Hashing | bcrypt |
| Validation | class-validator |
| Transformation | class-transformer |
| Documentation | Swagger |
| File Uploads | Multer |
| Email | Nodemailer |
| Logging | Winston / Pino |
| Security | Helmet |
| Rate Limiting | @nestjs/throttler |
| Deployment | render {render.yaml}|

---

# High-Level Architecture

```text
                         +-----------------------+
                         |     Public Visitors   |
                         +-----------+-----------+
                                     |
                                     |
                           HTTPS REST API
                                     |
      ---------------------------------------------------------
      |                                                       |
+-----v------------------+                    +----------------v---------+
|    Next.js Frontend    |                    |    NestJS Backend        |
|  Public Website        |<------------------>| Authentication           |
|                        |                    | Blog Management          |
| Landing Page           |                    | Features                 |
| About                  |                    | Members                  |
| Solutions              |                    | Partners                 |
| Blog                   |                    | Messages                 |
| Team                   |                    | Comments                 |
| Contact                |                    | Ratings                  |
| Roadmap                |                    | Dashboard                |
+------------------------+                    +------------+-------------+
                                                           |
                                                           |
                                                   MongoDB + Mongoose
```

---

# Architectural Principles

The backend follows modern software engineering practices.

- Modular architecture
- Feature-first organization
- Separation of concerns
- Dependency Injection
- SOLID principles
- RESTful API design
- Role-Based Access Control (RBAC)
- Secure by default
- API-first development
- Scalable and maintainable codebase

---

# Repository Structure

```text
iNgabo-website/

├── AGENTS.md
├── README.md
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── database.md
│   ├── roadmap.md
│   ├── branding.md
│   └── deployment.md
│
├── ingabo-web/
│
└── ingabo-website-backend/
    │
    ├── src/
    │
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

# Backend Directory Responsibilities

## auth/

Handles authentication and authorization.

Responsibilities

- Login
- JWT generation
- Refresh tokens
- Password hashing
- Authentication Guards
- Authorization Guards
- Passport strategies

---

## users/

Responsible for managing administrator and maintainer accounts.

Responsibilities

- Create users
- Update users
- Delete users
- Profile management
- Account activation
- Password reset

---

## roles/

Defines system roles.

Current roles

- Administrator
- Maintainer

Future support

- Super Administrator
- Editor
- Moderator

---

## permissions/

Implements Role-Based Access Control (RBAC).

Responsibilities

- Permission Guards
- Resource permissions
- Route authorization

---

## blog/

Manages all blog-related functionality.

Responsibilities

- Create blog
- Edit blog
- Delete blog
- Publish blog
- Draft blog
- Archive blog
- Blog search
- Slug generation

---

## comments/

Manages public blog comments.

Responsibilities

- Create comment
- Moderate comment
- Approve comment
- Reject comment
- Delete comment

---

## ratings/

Handles website ratings and public feedback.

Responsibilities

- Submit ratings
- View ratings
- Aggregate statistics

---

## members/

Manages team members.

Responsibilities

- Add members
- Update members
- Delete members
- Team ordering

---

## partners/

Manages strategic partners.

Responsibilities

- Add partners
- Update partners
- Delete partners
- Display ordering

---

## features/

Manages product capabilities displayed on the website.

Responsibilities

- Create features
- Edit features
- Delete features
- Feature ordering

---

## messages/

Handles contact form submissions.

Responsibilities

- Store messages
- Read messages
- Mark as read
- Archive messages
- Reply workflow

---

## settings/

Stores global website configuration.

Responsibilities

- Homepage content
- Contact information
- SEO settings
- Footer
- Social links
- Branding

---

## dashboard/

Provides administrative analytics.

Responsibilities

- Total blogs
- Total visitors
- Messages
- Ratings
- Recent activity
- Dashboard widgets

---

## upload/

Responsible for media management.

Responsibilities

- Image upload
- File validation
- Image optimization
- Media storage
- File deletion

---

## notifications/

Internal notification system.

Responsibilities

- New messages
- New comments
- New ratings
- System alerts

---

## mail/

Responsible for email communication.

Responsibilities

- Contact confirmations
- Notification emails
- Password reset emails
- Welcome emails

---

## common/

Contains reusable backend utilities.

Examples

- Base DTOs
- Exception filters
- Guards
- Interceptors
- Pipes
- Decorators
- Constants

---

## config/

Application configuration.

Responsibilities

- Environment variables
- JWT configuration
- Database configuration
- Mail configuration
- Upload configuration

---

## database/

Responsible for database connectivity.

Responsibilities

- MongoDB connection
- Mongoose configuration
- Database initialization

---

# User Roles

## 1. Administrator

The Administrator has unrestricted access to the system.

### Responsibilities

- Create maintainers
- Remove maintainers
- Manage administrator accounts
- Publish and unpublish blogs
- Approve comments
- Delete comments
- Manage members
- Manage partners
- Manage website features
- Manage homepage content
- Configure website settings
- View analytics
- View visitor messages
- Manage uploaded media
- View ratings

### Permissions

- Full CRUD on every module
- Access dashboard
- Manage authentication
- Configure system settings

---

## 2. Maintainer

Maintainers are created by an Administrator.

### Responsibilities

- Create blogs
- Edit blogs
- Delete blogs
- Manage members
- Manage partners
- Manage website features
- Moderate comments
- View messages

### Restrictions

Cannot

- Create administrators
- Delete administrators
- Modify global settings
- Configure authentication
- Change system configuration

---

## 3. Public Visitor

Public visitors do not require authentication.

### Can

- Browse website
- Read blogs
- Browse team
- Browse partners
- Read features
- Submit contact messages
- Submit ratings
- Leave comments
- Subscribe to newsletter

### Cannot

- Access dashboard
- Modify content
- Access protected APIs

---

# Request Flow

```text
Client Request
       │
       ▼
Middleware
       │
       ▼
Authentication Guard
       │
       ▼
Authorization Guard
       │
       ▼
Validation Pipe
       │
       ▼
Controller
       │
       ▼
Service
       │
       ▼
Repository / Mongoose Model
       │
       ▼
MongoDB
```

---

# API Layer

The backend exposes RESTful APIs.

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

---

# Authentication Flow

```text
Administrator

↓

Login

↓

JWT Generated

↓

Authorization Header

↓

JWT Guard

↓

Role Guard

↓

Protected Resource
```

Public endpoints bypass authentication while protected administrative routes require valid JWT tokens and appropriate roles.

---

# Validation Strategy

All incoming requests are validated using DTOs.

Every DTO uses

- class-validator
- class-transformer

Validation includes

- Required fields
- Email validation
- URL validation
- Length validation
- Enum validation
- ObjectId validation
- File validation

---

# Database Design

Collections

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

Relationships are managed through MongoDB ObjectId references where appropriate.

---

# Security Architecture

The backend follows a defense-in-depth approach.

Security features

- JWT Authentication
- Password hashing with bcrypt
- Helmet security headers
- Rate limiting
- Request validation
- Role Guards
- Permission Guards
- DTO validation
- Environment-based secrets
- CORS configuration
- Input sanitization
- File upload validation
- XSS protection
- Secure HTTP headers

---

# Error Handling

Centralized exception handling is implemented using NestJS exception filters.

Responses follow a consistent format.

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

Application logs include

- Authentication events
- Errors
- Warnings
- API requests
- System events
- Administrative actions

Logs should be structured and suitable for production monitoring.

---

# Performance Strategy

The backend is optimized for scalability.

Techniques include

- Lean Mongoose queries
- Database indexing
- Pagination
- Response compression
- Lazy module loading
- Efficient DTO serialization
- Query optimization
- Rate limiting
- Caching where appropriate

---

# File Upload Strategy

Supported uploads

- Team photos
- Blog cover images
- Feature illustrations
- Partner logos
- Website assets

Uploaded files are validated for

- File type
- File size
- MIME type
- Malware scanning (future enhancement)

---

# Notifications

System notifications include

- New contact message
- New comment awaiting moderation
- New rating submitted
- Failed login attempts
- System alerts

---

# API Documentation

Swagger is enabled during development.

Documentation includes

- Authentication
- Request schemas
- Response schemas
- Error responses
- Authorization requirements

---

# Future Enhancements

The architecture is designed for long-term scalability.

Potential future improvements include

- GraphQL API
- Redis caching
- Elasticsearch for blog search
- Audit logging
- Soft deletes
- Scheduled blog publishing
- Newsletter management
- Multi-language content
- CMS preview mode
- WebSocket notifications
- Media library
- Search indexing
- Cloud storage integration
- API versioning beyond v1
- Containerized deployment with Docker and Kubernetes

---

# Conclusion

The iNgabo Website Backend is designed as a secure, modular, and scalable content management platform that powers both the public website and the administrative dashboard. By leveraging NestJS, MongoDB, and a feature-oriented architecture, the system cleanly separates authentication, content management, communication, and configuration concerns while enforcing strong security through Role-Based Access Control (RBAC), JWT authentication, and comprehensive request validation. This architecture provides a maintainable foundation that can evolve alongside the iNgabo project and support future enterprise requirements with minimal architectural changes.