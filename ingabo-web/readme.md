# iNgabo Web

<div align="center">

#  iNgabo Website Client

**The official public website of the iNgabo Project**

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

---

A fast, modern, accessible, and responsive web application designed to educate the public about telecommunications fraud, showcase the iNgabo platform, publish technical content, and connect the community with the project.

</div>

---

# Overview

The **iNgabo Web** application is the official client-facing website of the iNgabo project.

It consumes the REST APIs exposed by the **iNgabo Website Backend** and provides an intuitive user experience for visitors while maintaining excellent performance, accessibility, and search engine optimization.

The application is built using the **Next.js App Router**, following a feature-oriented architecture that promotes scalability, maintainability, and clean code.

---

# Features

The website includes the following public sections:

- Landing Page
- About iNgabo
- Telecom Fraud Overview
- Platform Features
- Solutions
- Blog
- Team Members
- Strategic Partners
- Contact
- Ratings & Testimonials
- Roadmap
- Privacy Policy
- Terms of Service

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | React |
| State Management | Zustand |
| Server State | TanStack Query |
| Forms | React Hook Form |
| Validation | Zod |
| HTTP Client | Axios |
| Icons | Lucide React |
| Animation | Framer Motion |
| Deployment | vercel |

---

# Project Structure

```text
ingabo-web/

├── public/
│
├── src/
│
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
├── package.json
├── tsconfig.json
└── README.md
```

---

# Architecture

The application follows a feature-oriented architecture.

```text
User

      │

      ▼

Next.js App Router

      │

      ▼

Features

      │

      ▼

Reusable Components

      │

      ▼

Services Layer

      │

      ▼

Axios API Client

      │

      ▼

NestJS Backend
```

Business logic is separated from presentation logic to improve maintainability and encourage component reuse.

---

# Application Pages

| Route | Description |
|---------|-------------|
| `/` | Landing page |
| `/about` | About the iNgabo project |
| `/solutions` | Platform solutions |
| `/features` | Platform capabilities |
| `/blog` | Technical blog |
| `/blog/[slug]` | Blog article |
| `/team` | Team members |
| `/partners` | Strategic partners |
| `/contact` | Contact page |
| `/roadmap` | Project roadmap |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

# Communication with Backend

The frontend communicates exclusively with the backend REST API.

```text
Next.js

↓

Axios Client

↓

REST API

↓

NestJS Backend
```

The frontend never communicates directly with the database.

---

# Development

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
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

## Run Production Server

```bash
npm run start
```

---

# Environment Variables

Example

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

Production

```env
NEXT_PUBLIC_API_URL=https://api.ingabo.org/api/v1
```

---

# Performance

The application is optimized using:

- Server Components
- Route-level code splitting
- Dynamic imports
- Image optimization
- Static generation where appropriate
- Incremental Static Regeneration (ISR) for blog content
- Font optimization
- Metadata optimization

---

# SEO

Every page includes:

- Metadata
- Open Graph
- Twitter Cards
- Canonical URLs
- Structured Data (JSON-LD)

Blog pages generate metadata dynamically from backend content.

---

# Accessibility

The application follows WCAG accessibility recommendations.

Features include:

- Semantic HTML
- Keyboard navigation
- Accessible forms
- Proper heading hierarchy
- Sufficient color contrast
- Screen reader support

---

# Deployment

Production deployment

| Component | Platform |
|------------|----------|
| Frontend | GitHub Pages |
| CDN | Cloudflare |
| API | Render |
| Database | MongoDB Atlas |

Deployment is automated through GitHub Actions.

---

# Documentation

Additional documentation is available in the repository root.

- `docs/architecture.md`
- `docs/api.md`
- `docs/deployment.md`
- `docs/database.md`

---

# Contributing

Before contributing:

- Follow the project architecture.
- Use strict TypeScript.
- Create reusable components.
- Keep features modular.
- Follow the coding standards defined in `AGENTS.md`.

---

# License

This project is licensed under the **MIT License**.

---

# Part of the iNgabo Project

The iNgabo Web client is one component of the larger iNgabo ecosystem. It serves as the official public interface for communicating the project's mission, showcasing its capabilities, and engaging with the cybersecurity community through a secure, performant, and modern web experience.