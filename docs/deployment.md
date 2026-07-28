# Deployment Guide

Version: 1.0.0

---

# Overview

The iNgabo Website is deployed using a modern cloud-native architecture. The project is designed for automated deployments, containerization, continuous integration, and high availability.

The deployment architecture separates the frontend and backend into independent services while sharing a centralized MongoDB Atlas database.

---

# Deployment Architecture

```text
                              Internet
                                  │
                                  │
                     Cloudflare DNS + CDN
                                  │
          ┌───────────────────────┴────────────────────────┐
          │                                                │
          ▼                                                ▼
 GitHub Pages (Frontend)                         Render (Backend API)
      Next.js Static Export                      Docker Container
          │                                                │
          └───────────────────────┬────────────────────────┘
                                  │
                                  ▼
                          MongoDB Atlas Cluster
```

---

# Deployment Stack

| Component | Platform |
|------------|----------|
| Source Control | GitHub |
| Frontend | GitHub Pages |
| Backend | Render |
| Database | MongoDB Atlas |
| DNS | Cloudflare |
| CDN | Cloudflare CDN |
| Containerization | Docker |
| Local Development | Docker Compose |
| Continuous Integration | GitHub Actions |

---

# Deployment Workflow

```text
Developer

        │

        ▼

Git Push

        │

        ▼

GitHub Repository

        │

        ▼

GitHub Actions

        │
        ├───────────────┐
        │               │
        ▼               ▼

Build Frontend    Build Docker Image

        │               │
        ▼               ▼

Deploy to      Deploy to Render

GitHub Pages

        │               │
        └───────┬───────┘
                ▼

         Production Environment
```

---

# Environment Overview

## Development

Runs locally using Docker Compose.

Components

- Next.js
- NestJS
- MongoDB

---

## Staging

Future environment used for testing before production deployment.

---

## Production

Production services

- GitHub Pages
- Render
- MongoDB Atlas
- Cloudflare

---

# Docker

The backend is containerized using Docker to ensure consistent deployments across development and production.

Typical Docker responsibilities

- Install dependencies
- Compile TypeScript
- Build NestJS application
- Start production server

Example Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

---

# Docker Compose

Docker Compose is used for local development.

Services

- backend
- mongodb

Example

```yaml
version: "3.9"

services:

  backend:
    build: .
    container_name: ingabo-backend

    ports:
      - "3000:3000"

    env_file:
      - .env

    depends_on:
      - mongodb

  mongodb:
    image: mongo:8

    container_name: ingabo-mongodb

    restart: always

    ports:
      - "27017:27017"

    volumes:
      - mongo-data:/data/db

volumes:

  mongo-data:
```

---

# GitHub Actions

GitHub Actions automates testing and deployment.

Pipeline

```text
Push

↓

Install Dependencies

↓

Lint

↓

Run Tests

↓

Build Application

↓

Deploy
```

Recommended workflows

```
.github/

workflows/

frontend.yml

backend.yml
```

---

# Frontend Deployment

Platform

```
vercel ```

Deployment Steps
vercel.json
```

---

# Backend Deployment

Platform

```
Render
```

Deployment Method

- Docker
- Automatic Deploys
- GitHub Integration

Render automatically

- Pulls the latest code
- Builds the Docker image
- Deploys the API
- Restarts the service

---

# Render Configuration

The repository includes a `render.yaml` file to describe the backend service.

Example

```yaml
services:
  - type: web
    name: ingabo-website-backend

    runtime: docker

    plan: free

    autoDeploy: true

    branch: main

    healthCheckPath: /api/v1/health

    envVars:
      - key: NODE_ENV
        value: production

      - key: PORT
        value: 3000
```

---

# MongoDB Atlas

Production database

```
MongoDB Atlas
```

Responsibilities

- Secure cloud database
- Automatic backups
- TLS encryption
- High availability
- Database monitoring

Environment variable

```env
MONGODB_URI=mongodb+srv://...
```

---

# Cloudflare

Cloudflare provides

- DNS Management
- CDN
- HTTPS
- SSL Certificates
- DDoS Protection
- Edge Caching
- Security Rules

Traffic Flow

```text
User

↓

Cloudflare

↓

GitHub Pages

or

↓

Render API
```

---

# Environment Variables

Frontend

```env
NEXT_PUBLIC_API_URL=https://api.ingabo.org/api/v1
```

Backend

```env
PORT=3000

NODE_ENV=production

JWT_SECRET=********

JWT_EXPIRES_IN=1d

MONGODB_URI=mongodb+srv://...

FRONTEND_URL=https://ingabo.org
```

Sensitive values must never be committed to the repository.

---

# Production Checklist

Before deploying a release, verify that:

- Docker image builds successfully.
- All automated tests pass.
- Linting reports no errors.
- Environment variables are configured.
- MongoDB Atlas is accessible.
- Cloudflare DNS records are correct.
- HTTPS is enabled.
- Health check endpoint responds successfully.
- API documentation is up to date.
- Frontend communicates with the production API.

---

# Health Monitoring

The backend should expose a health endpoint.

```
GET /api/v1/health
```

Expected response

```json
{
  "status": "ok",
  "uptime": 12345
}
```

Render uses this endpoint to verify that the service is healthy.

---

# Backup Strategy

MongoDB Atlas provides automated backups.

Recommended practices

- Enable scheduled backups.
- Test restoration procedures periodically.
- Keep backups in a separate region if available.

---

# Security

Deployment follows security best practices.

- HTTPS enforced
- Secure HTTP headers
- Cloudflare DDoS protection
- JWT authentication
- Environment-based secrets
- Database access restricted by IP where possible
- Automatic dependency updates
- Production logging

---

# Future Improvements

The deployment architecture is designed to evolve as traffic grows.

Potential future enhancements include

- Render managed PostgreSQL 
- Redis caching
- Object storage for media assets
- Multi-region deployments
- Blue/Green deployments
- Kubernetes orchestration
- GitHub Container Registry
- Automated security scanning
- Monitoring with Grafana and Prometheus
- Centralized logging

---

# Conclusion

The iNgabo Website deployment architecture provides a reliable, automated, and scalable foundation for production. By combining Docker, Docker Compose, GitHub Actions, Render, GitHub Pages, MongoDB Atlas, and Cloudflare, the platform supports continuous delivery, secure hosting, and independent scaling of the frontend and backend while maintaining a simple developer workflow.