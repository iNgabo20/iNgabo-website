# iNgabo Website Database Design

Version: 1.0.0

---

# Overview

The iNgabo Website uses **MongoDB** as its primary database with **Mongoose** as the Object Data Mapper (ODM).

The database is designed around a **document-oriented**, **feature-first**, and **domain-driven** architecture. Each business module owns its own collection while relationships between entities are maintained using MongoDB ObjectId references where appropriate.

The design emphasizes:

- Scalability
- Performance
- Data integrity
- Maintainability
- Security

---

# Database Technology

| Component | Technology |
|------------|------------|
| Database | MongoDB |
| ODM | Mongoose |
| Connection | MongoDB Atlas |
| Object IDs | MongoDB ObjectId |
| Validation | Mongoose + class-validator |
| Indexing | MongoDB Indexes |

---

# Database Architecture

```text
                    NestJS Backend
                           │
                           ▼
                  Mongoose Models
                           │
                           ▼
                     MongoDB Atlas
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
     Users             Blogs             Messages
        │                  │                  │
        ├──────┐           │                  │
        ▼      ▼           ▼                  ▼
   Members  Partners   Comments          Ratings
                           │
                           ▼
                    Notifications

                           ▼
                       Settings
```

---

# Collections

The platform uses the following collections.

| Collection | Purpose |
|------------|---------|
| users | Administrator and Maintainer accounts |
| blogs | Blog articles |
| comments | Public blog comments |
| ratings | Website ratings |
| members | Team members |
| partners | Strategic partners |
| features | Website features |
| messages | Contact form submissions |
| notifications | System notifications |
| settings | Global website configuration |

---

# Collection Details

---

# users

Stores administrator and maintainer accounts.

## Fields

| Field | Type | Required |
|--------|------|----------|
| _id | ObjectId | Yes |
| firstName | String | Yes |
| lastName | String | Yes |
| email | String | Yes |
| password | String | Yes |
| role | Enum | Yes |
| avatar | String | No |
| isActive | Boolean | Yes |
| lastLogin | Date | No |
| createdAt | Date | Yes |
| updatedAt | Date | Yes |

## Role Values

```text
ADMINISTRATOR

MAINTAINER
```

Indexes

- email (unique)
- role

---

# blogs

Stores published and draft articles.

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| title | String |
| slug | String |
| summary | String |
| content | String |
| coverImage | String |
| tags | Array<String> |
| author | ObjectId |
| status | Enum |
| publishedAt | Date |
| createdAt | Date |
| updatedAt | Date |

Status

```text
DRAFT

PUBLISHED

ARCHIVED
```

Indexes

- slug (unique)
- status
- author
- tags
- publishedAt

Relationship

```
Blog

↓

User
```

---

# comments

Stores public comments submitted on blog articles.

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| blog | ObjectId |
| name | String |
| email | String |
| message | String |
| approved | Boolean |
| createdAt | Date |

Indexes

- blog
- approved

Relationship

```
Comment

↓

Blog
```

---

# ratings

Stores visitor ratings.

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| name | String |
| rating | Number |
| comment | String |
| createdAt | Date |

Indexes

- rating

---

# members

Stores iNgabo team members.

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| fullName | String |
| role | String |
| bio | String |
| avatar | String |
| linkedin | String |
| github | String |
| email | String |
| displayOrder | Number |
| createdAt | Date |
| updatedAt | Date |

Indexes

- displayOrder

---

# partners

Stores strategic partners.

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| name | String |
| logo | String |
| website | String |
| description | String |
| displayOrder | Number |
| createdAt | Date |
| updatedAt | Date |

Indexes

- displayOrder

---

# features

Stores features displayed on the website.

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| title | String |
| description | String |
| icon | String |
| image | String |
| displayOrder | Number |
| createdAt | Date |
| updatedAt | Date |

Indexes

- displayOrder

---

# messages

Stores contact form submissions.

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| name | String |
| email | String |
| subject | String |
| message | String |
| isRead | Boolean |
| createdAt | Date |

Indexes

- isRead
- createdAt

---

# notifications

Stores internal system notifications.

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| title | String |
| message | String |
| type | Enum |
| isRead | Boolean |
| createdAt | Date |

Notification Types

```text
MESSAGE

COMMENT

RATING

SYSTEM
```

Indexes

- isRead
- type

---

# settings

Stores global website configuration.

Only a single document is expected.

## Fields

| Field | Type |
|--------|------|
| _id | ObjectId |
| siteTitle | String |
| siteDescription | String |
| logo | String |
| favicon | String |
| contactEmail | String |
| contactPhone | String |
| address | String |
| facebook | String |
| twitter | String |
| linkedin | String |
| github | String |
| youtube | String |
| footerText | String |
| seoKeywords | Array<String> |
| updatedAt | Date |

---

# Entity Relationships

```text
                 User
                  │
                  │ 1
                  │
                  ▼
                Blog
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
    Comments           Cover Image

Website

├── Features
├── Members
├── Partners
├── Settings
├── Ratings
├── Messages
└── Notifications
```

---

# Indexing Strategy

The following indexes should be created to improve performance.

## users

- email (unique)
- role

## blogs

- slug (unique)
- status
- author
- tags
- publishedAt

## comments

- blog
- approved

## members

- displayOrder

## partners

- displayOrder

## features

- displayOrder

## messages

- isRead
- createdAt

## notifications

- isRead
- type

---

# Validation Rules

Every collection enforces validation using Mongoose schemas and DTO validation.

Examples include:

- Required fields
- Email format
- URL format
- Enum values
- Minimum lengths
- Maximum lengths
- ObjectId validation
- File path validation

---

# Soft Delete Strategy

The platform should support soft deletion for business-critical collections.

Recommended collections:

- users
- blogs
- members
- partners
- features

Suggested fields:

```text
deletedAt

deletedBy

isDeleted
```

Soft-deleted records should be excluded from normal queries.

---

# Audit Fields

Every mutable collection should include:

```text
createdAt

updatedAt

createdBy

updatedBy
```

These fields improve traceability and administrative auditing.

---

# Media Storage

Database records store only metadata.

Example:

```text
coverImage

avatar

logo
```

Binary files should be stored outside the database using local storage during development and cloud object storage (such as Cloudinary or Amazon S3) in production.

---

# Data Integrity

The backend should enforce:

- Unique email addresses
- Unique blog slugs
- Valid ObjectId references
- Enum constraints
- Required relationships
- Referential cleanup where appropriate

---

# Backup Strategy

Production data is hosted on MongoDB Atlas.

Recommended configuration:

- Daily automated backups
- Point-in-time recovery (where available)
- Multi-region backup retention
- Regular restore testing

---

# Security

Database security requirements include:

- TLS-encrypted connections
- Environment-based credentials
- Least-privilege database users
- Input validation before persistence
- Password hashing with bcrypt
- No sensitive data stored in plain text
- IP access controls for production clusters

---

# Future Enhancements

The schema is designed to evolve as the platform grows.

Potential additions include:

- newsletter_subscribers
- audit_logs
- media_library
- activity_logs
- page_views
- seo_redirects
- faq
- testimonials
- careers
- events
- downloads
- tags
- categories

---

# Naming Conventions

Collections use lowercase plural names.

Examples:

```text
users

blogs

comments

ratings

members

partners

features

messages

notifications

settings
```

Fields use camelCase.

Examples:

```text
createdAt

updatedAt

displayOrder

contactEmail

publishedAt
```

---

# Conclusion

The iNgabo Website database is designed around a modular, document-oriented architecture that aligns with the application's feature-based structure. MongoDB and Mongoose provide a flexible foundation for managing website content, administrative data, and public interactions while supporting efficient querying through targeted indexes and strong validation. The schema is intentionally structured to accommodate future growth, ensuring the platform remains secure, maintainable, and scalable as the iNgabo ecosystem evolves.