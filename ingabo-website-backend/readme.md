# iNgabo Website Backend

<div align="center">

#  iNgabo Website Backend

**Enterprise-grade REST API and Content Management System (CMS) for the official iNgabo Website**

Built with **NestJS**, **TypeScript**, **MongoDB**, and **Mongoose**.

---

Secure • Modular • Scalable • Production Ready

</div>

---

# Overview

The **iNgabo Website Backend** powers the official iNgabo public website by providing secure REST APIs and an administrative Content Management System (CMS).

It enables administrators and maintainers to manage website content while exposing only public resources to website visitors.

The backend follows a **feature-oriented**, **modular**, and **domain-driven** architecture using NestJS best practices.

---

# Core Features

## Authentication

- JWT Authentication
- Role-Based Access Control (RBAC)
- Secure password hashing (bcrypt)
- Protected API endpoints

---

## Content Management

- Blog Management
- Feature Management
- Team Member Management
- Partner Management
- Website Settings

---

## Public Engagement

- Contact Messages
- Blog Comments
- Website Ratings
- Newsletter support (future)

---

## Administration

- Dashboard
- Notifications
- Analytics
- User Management
- Media Uploads

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Framework | NestJS |
| Language | TypeScript |
| Runtime | Node.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT + Passport |
| Authorization | RBAC |
| Validation | class-validator |
| API Documentation | Swagger |
| File Uploads | Multer |
| Email | Nodemailer |
| Security | Helmet |
| Rate Limiting | @nestjs/throttler |

---

# Project Structure

```text
ingabo-website-backend/

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

├── test/
├── README.md
└── package.json
```

---

# Architecture

```text
                Next.js Frontend
                        │
                        │ REST API
                        ▼
              NestJS Controllers
                        │
                        ▼
             Business Services Layer
                        │
                        ▼
              Mongoose Data Models
                        │
                        ▼
                   MongoDB Atlas
```

The backend is completely independent from the frontend and can serve multiple clients in the future, including web, mobile, and third-party integrations.

---

# Available Modules

| Module | Responsibility |
|----------|---------------|
| auth | Authentication & JWT |
| users | Administrator and Maintainer management |
| roles | User roles |
| permissions | Authorization |
| blog | Blog management |
| comments | Public comments |
| ratings | Website ratings |
| members | Team members |
| partners | Strategic partners |
| features | Website features |
| messages | Contact messages |
| settings | Website configuration |
| dashboard | Analytics dashboard |
| upload | Media uploads |
| notifications | Internal notifications |
| mail | Email services |
| common | Shared utilities |
| config | Application configuration |
| database | MongoDB connection |

---

# User Roles

## Administrator

The highest privileged user.

Can:

- Manage administrators
- Create and remove maintainers
- Publish blogs
- Manage website features
- Manage partners
- Manage team members
- Configure website settings
- Moderate comments
- View analytics
- View contact messages
- Manage uploads

Full CRUD across the platform.

---

## Maintainer

Created by an administrator.

Can:

- Create blogs
- Update blogs
- Delete blogs
- Manage features
- Manage members
- Manage partners
- Moderate comments
- View messages

Cannot:

- Create administrators
- Delete administrators
- Modify website settings
- Manage authentication

---

## Public Visitor

No authentication required.

Can:

- Read blogs
- Browse features
- Browse team members
- Browse partners
- Submit comments
- Submit ratings
- Send contact messages

---

# REST API

All endpoints are versioned.

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

Swagger documentation is available in development mode.

---

# Development

## Prerequisites

- Node.js 22+
- npm
- MongoDB (local) or MongoDB Atlas

---

## Installation

```bash
git clone <repository>

cd ingabo-website-backend

npm install
```

---

## Configure Environment

Create a `.env` file.

Example:

```env
PORT=3000

NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/ingabo

JWT_SECRET=change_me

JWT_EXPIRES_IN=1d

FRONTEND_URL=http://localhost:3000
```

---

## Start Development Server

```bash
npm run start:dev
```

Application

```
http://localhost:3000
```

---

## Production Build

```bash
npm run build
```

---

## Start Production Server

```bash
npm run start:prod
```

---

# Testing

Run unit tests

```bash
npm run test
```

Run end-to-end tests

```bash
npm run test:e2e
```

Generate test coverage

```bash
npm run test:cov
```

---

# Validation

All incoming requests are validated using DTOs.

Validation includes:

- Required fields
- Email validation
- URL validation
- Enum validation
- ObjectId validation
- Nested objects
- Arrays

Invalid requests are rejected before reaching business logic.

---

# Security

Security is built into every layer.

Implemented features include:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Password hashing with bcrypt
- Helmet security headers
- Rate limiting
- DTO validation
- CORS configuration
- Input sanitization
- Secure environment variables

---

# Database

MongoDB collections include:

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

Relationships are implemented using Mongoose ObjectId references.

---

# Deployment

Production deployment uses:

| Service | Platform |
|----------|----------|
| Backend | Render |
| Database | MongoDB Atlas |
| DNS | Cloudflare |
| CI/CD | GitHub Actions |
| Container | Docker |

Deployment is fully automated through GitHub Actions and Render.

---

# Documentation

Additional documentation is available in the project root.

- `docs/architecture.md`
- `docs/api.md`
- `docs/database.md`
- `docs/deployment.md`
- `docs/roadmap.md`

---

# Contributing

Before contributing:

- Follow the module structure.
- Use strict TypeScript.
- Validate every request using DTOs.
- Keep controllers thin.
- Place business logic inside services.
- Maintain REST API consistency.
- Update documentation when functionality changes.

Refer to `AGENTS.md` for detailed development standards.

---

# License

This project is licensed under the **MIT License**.

---

# Part of the iNgabo Project

The iNgabo Website Backend is the central service responsible for powering the official iNgabo public website. Designed with enterprise-grade architecture and modern NestJS practices, it provides a secure, scalable, and maintainable foundation for content management, public engagement, and future ecosystem integrations.