# iNgabo Website

<div align="center">

#  iNgabo

**Building the Future of Telecom Fraud Intelligence**

*A modern, intelligent platform dedicated to detecting, preventing, and analyzing telecommunications fraud through data-driven technologies and advanced security engineering.*

---

**Official Website Monorepo**

[Website](#) • [Documentation](./docs) • [Architecture](./docs/architecture.md) • [API](./docs/api.md)

</div>

---

# Overview

This repository contains the complete source code for the **official iNgabo public website** and its supporting backend services.

The project consists of two independent applications maintained within a single monorepo:

- **iNgabo Web** – The public-facing website built with Next.js.
- **iNgabo Website Backend** – A secure REST API and Content Management System (CMS) built with NestJS.

Together, these applications provide an enterprise-grade platform for presenting the iNgabo project, publishing technical content, managing contributors, communicating with the public, and administering website resources.

---

# Project Vision

iNgabo aims to become a leading cybersecurity initiative focused on combating telecommunications fraud by combining modern software engineering, intelligent analytics, and security research.

The website serves as the official public platform for:

- Presenting the project mission
- Explaining telecom fraud challenges
- Demonstrating platform capabilities
- Publishing technical articles
- Introducing the development team
- Highlighting strategic partners
- Receiving community feedback
- Providing official announcements

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
│   ├── deployment.md
│   ├── branding.md
│   └── roadmap.md
│
├── ingabo-web/
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

# System Architecture

```text
                         Public Visitors
                                │
                                │ HTTPS
                                ▼
                     Next.js Public Website
                                │
                          REST API (HTTPS)
                                │
                                ▼
                     NestJS Backend (CMS/API)
                                │
                                ▼
                      MongoDB + Mongoose ODM
```

---

# Project Components

## 1. iNgabo Web

The frontend application is responsible for delivering a fast, accessible, and responsive experience to visitors.

### Responsibilities

- Landing page
- About iNgabo
- Problem statement
- Solution overview
- Features
- Team members
- Partners
- Blog
- Contact page
- Ratings
- Testimonials
- Roadmap
- Documentation

### Technology

- Next.js
- TypeScript
- Tailwind CSS
- React
- Axios
- TanStack Query
- Zustand

---

## 2. iNgabo Website Backend

The backend provides secure REST APIs and content management capabilities for the website.

### Responsibilities

- Authentication
- User management
- Blog management
- Feature management
- Team management
- Partner management
- Contact messages
- Ratings
- Notifications
- Media uploads
- Dashboard analytics
- Website settings

### Technology

- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT
- Passport
- Swagger

---

# User Roles

The system supports three categories of users.

## Administrator

The highest privileged user responsible for complete website administration.

Responsibilities include:

- Managing maintainers
- Managing administrators
- Publishing content
- Managing website settings
- Viewing analytics
- Managing team members
- Managing partners
- Managing public communication
- Full CRUD across every module

---

## Maintainer

Maintainers are created by Administrators.

Responsibilities include:

- Writing blogs
- Managing website features
- Managing members
- Managing partners
- Moderating comments
- Viewing contact messages

Maintainers cannot modify system configuration or administrator accounts.

---

## Public Visitor

Visitors do not require authentication.

They can:

- Browse the website
- Read blogs
- Explore project features
- View team members
- View partners
- Send contact messages
- Leave comments
- Submit ratings

---

# Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | Next.js |
| Backend | NestJS |
| Language | TypeScript |
| Database | MongoDB |
| ODM | Mongoose |
| Styling | Tailwind CSS |
| Authentication | JWT + Passport |
| Validation | class-validator |
| Documentation | Swagger |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| Deployment | Vercel + Render |

---

# Documentation

Project documentation is located in the `docs/` directory.

| Document | Description |
|----------|-------------|
| architecture.md | Overall system architecture |
| api.md | REST API specification |
| database.md | Database schema and collections |
| deployment.md | Deployment strategy |
| roadmap.md | Planned releases and milestones |
| branding.md | Branding guidelines |

---

# Development Principles

The project follows modern engineering best practices.

- Feature-oriented architecture
- Modular backend design
- Component-driven frontend
- REST-first APIs
- Strong TypeScript typing
- Secure authentication
- Responsive user interfaces
- Accessibility by default
- Performance optimization
- Clean code principles

---

# Getting Started

## Clone the Repository

```bash
git clone https://github.com/iNgabo/iNgabo-website.git

cd iNgabo-website
```

---

## Frontend

```bash
cd ingabo-web

npm install

npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## Backend

```bash
cd ingabo-website-backend

npm install

npm run start:dev
```

Runs on:

```
http://localhost:4000
```

---

# Future Roadmap

Planned enhancements include:

- Multi-language support (i18n)
- Progressive Web App (PWA)
- Newsletter management
- Search functionality
- Media library
- CMS preview mode
- Scheduled blog publishing
- Advanced analytics dashboard
- Audit logging
- Cloud storage integration
- AI-assisted content generation
- Interactive telecom fraud demonstrations

---

# Contributing

Contributions are welcome.

Please read the project documentation before submitting pull requests or feature proposals. Follow the established coding standards, architecture guidelines, and commit conventions to maintain consistency across the project.

---

# License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

---

# Maintained By

**iNgabo Project**

Building intelligent solutions for a safer and more secure telecommunications ecosystem through innovation, cybersecurity research, and modern software engineering.