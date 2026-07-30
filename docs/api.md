# iNgabo Website API Documentation

Version: 1.0.0

---

# Overview

The iNgabo Website Backend exposes a versioned REST API that powers the official public website and its administrative Content Management System (CMS).

The API follows RESTful principles, uses JSON for request and response bodies, and secures protected endpoints using JWT authentication and Role-Based Access Control (RBAC).

**Base URL (Development)**

```text
http://localhost:3000/api/v1
```

**Base URL (Production)**

```text
https://api.ingabo.org/api/v1
```

---

# API Standards

## Request Format

```http
Content-Type: application/json
Accept: application/json
```

Protected routes require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Standard Response Format

## Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed.",
  "errors": []
}
```

---

# Authentication

## Login

```http
POST /auth/login
```

### Request

```json
{
  "email": "admin@ingabo.org",
  "password": "password"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "accessToken": "...",
    "user": {}
  }
}
```

---

## Get Current User

```http
GET /auth/profile
```

Authentication required.

### Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {
    "_id": "...",
    "firstName": "Ada",
    "lastName": "Admin",
    "email": "admin@ingabo.org",
    "role": "ADMINISTRATOR",
    "isActive": true
  }
}
```

---

## Forgot Password

```http
POST /auth/forgot-password
```

Sends a one-time password-reset code when the email belongs to an active team account. Always returns a generic success message to avoid email enumeration.

### Request

```json
{
  "email": "admin@ingabo.org"
}
```

### Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {
    "message": "If an account exists for that email, a password reset code has been sent."
  }
}
```

---

## Reset Password

```http
POST /auth/reset-password
```

### Request

```json
{
  "email": "admin@ingabo.org",
  "otp": "483921",
  "newPassword": "NewStrongP@ssw0rd"
}
```

---

## Change Password

```http
POST /auth/change-password
```

Authentication required. Requires the current password.

### Request

```json
{
  "currentPassword": "CurrentP@ssw0rd",
  "newPassword": "NewStrongP@ssw0rd"
}
```

---

## Refresh Token *(Future)*

```http
POST /auth/refresh
```

---

# Users

Administrator only.

---

## Get Users

```http
GET /users
```

---

## Get User

```http
GET /users/:id
```

---

## Create User

```http
POST /users
```

---

## Update User

```http
PATCH /users/:id
```

---

## Delete User

```http
DELETE /users/:id
```

---

# Blog

Public blog management.

---

## Get Published Blogs

```http
GET /blogs
```

Public endpoint.

Query parameters

```text
?page=1

?limit=10

?search=fraud

?tag=security
```

---

## Get Blog

```http
GET /blogs/:slug
```

Public endpoint.

---

## Create Blog

```http
POST /blogs
```

Administrator and Maintainer.

---

## Update Blog

```http
PATCH /blogs/:id
```

---

## Delete Blog

```http
DELETE /blogs/:id
```

---

## Publish Blog

```http
PATCH /blogs/:id/publish
```

Administrator only.

---

## Unpublish Blog

```http
PATCH /blogs/:id/unpublish
```

Administrator only.

---

# Features

---

## Get Features

```http
GET /features
```

Public endpoint.

---

## Create Feature

```http
POST /features
```

Protected.

---

## Update Feature

```http
PATCH /features/:id
```

---

## Delete Feature

```http
DELETE /features/:id
```

---

# Members

---

## Get Members

```http
GET /members
```

Public endpoint.

---

## Create Member

```http
POST /members
```

Protected.

---

## Update Member

```http
PATCH /members/:id
```

---

## Delete Member

```http
DELETE /members/:id
```

---

# Partners

---

## Get Partners

```http
GET /partners
```

Public endpoint.

---

## Create Partner

```http
POST /partners
```

Protected.

---

## Update Partner

```http
PATCH /partners/:id
```

---

## Delete Partner

```http
DELETE /partners/:id
```

---

# Comments

---

## Get Approved Comments

```http
GET /comments
```

Public endpoint.

---

## Create Comment

```http
POST /comments
```

Public endpoint.

### Example

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Amazing initiative!"
}
```

---

## Approve Comment

```http
PATCH /comments/:id/approve
```

Administrator or Maintainer.

---

## Reject Comment

```http
PATCH /comments/:id/reject
```

---

## Delete Comment

```http
DELETE /comments/:id
```

---

# Ratings

---

## Get Ratings

```http
GET /ratings
```

Protected.

---

## Submit Rating

```http
POST /ratings
```

Public endpoint.

Example

```json
{
  "name": "Alice",
  "rating": 5,
  "comment": "Excellent project."
}
```

---

# Messages

Contact form.

---

## Submit Contact Message

```http
POST /messages
```

Public endpoint.

Example

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Partnership Inquiry",
  "message": "We would like to collaborate."
}
```

---

## View Messages

```http
GET /messages
```

Protected.

---

## Get Message

```http
GET /messages/:id
```

Protected.

---

## Mark as Read

```http
PATCH /messages/:id/read
```

Protected.

---

## Delete Message

```http
DELETE /messages/:id
```

Protected.

---

# Uploads

Protected endpoints.

---

## Upload Image

```http
POST /uploads/images
```

Content-Type

```text
multipart/form-data
```

Supported

- Blog images
- Team photos
- Partner logos
- Feature illustrations

---

## Delete Upload

```http
DELETE /uploads/:id
```

---

# Dashboard

Administrator and Maintainer.

---

## Dashboard Statistics

```http
GET /dashboard/stats
```

Returns

- Blog count
- Member count
- Partner count
- Messages
- Ratings
- Comments

---

## Recent Activity

```http
GET /dashboard/activity
```

---

# Notifications

---

## Get Notifications

```http
GET /notifications
```

Protected.

---

## Mark Notification as Read

```http
PATCH /notifications/:id/read
```

---

# Website Settings

Administrator only.

---

## Get Settings

```http
GET /settings
```

---

## Update Settings

```http
PATCH /settings
```

Example

```json
{
  "siteTitle": "iNgabo",
  "contactEmail": "info@ingabo.org",
  "facebook": "https://facebook.com/ingabo"
}
```

---

# Health Check

Used by Render and monitoring systems.

```http
GET /health
```

Response

```json
{
  "status": "ok",
  "uptime": 12345
}
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# Authentication Matrix

| Endpoint | Public | Maintainer | Administrator |
|------------|:------:|:----------:|:-------------:|
| Login | ✅ | — | — |
| Blogs (Read) | ✅ | ✅ | ✅ |
| Blogs (Create) | ❌ | ✅ | ✅ |
| Blogs (Publish) | ❌ | ❌ | ✅ |
| Features (Read) | ✅ | ✅ | ✅ |
| Features (Manage) | ❌ | ✅ | ✅ |
| Members (Read) | ✅ | ✅ | ✅ |
| Members (Manage) | ❌ | ✅ | ✅ |
| Partners (Read) | ✅ | ✅ | ✅ |
| Partners (Manage) | ❌ | ✅ | ✅ |
| Contact Messages (Submit) | ✅ | — | — |
| Contact Messages (View) | ❌ | ✅ | ✅ |
| Ratings (Submit) | ✅ | — | — |
| Comments (Submit) | ✅ | — | — |
| Dashboard | ❌ | ✅ | ✅ |
| Website Settings | ❌ | ❌ | ✅ |
| User Management | ❌ | ❌ | ✅ |

---

# Pagination

Endpoints supporting pagination accept the following query parameters.

```http
GET /blogs?page=1&limit=10
```

Response

```json
{
  "success": true,
  "data": {
    "items": [],
    "page": 1,
    "limit": 10,
    "total": 57,
    "totalPages": 6
  }
}
```

---

# Filtering

Example

```http
GET /blogs?tag=security
```

```http
GET /blogs?author=admin
```

```http
GET /blogs?published=true
```

---

# Searching

Example

```http
GET /blogs?search=telecom
```

---

# Sorting

Example

```http
GET /blogs?sort=createdAt&order=desc
```

---

# Rate Limiting

Public endpoints are protected with request throttling.

Typical limits include:

- Contact form submissions
- Comment submissions
- Rating submissions
- Login attempts

---

# API Versioning

Current version

```text
/api/v1
```

Future API versions will remain backward compatible whenever possible.

---

# Swagger Documentation

Swagger is enabled during development.

```text
http://localhost:3000/api/docs
```

Production access may be restricted to authenticated administrators.

---

# Future API Enhancements

Planned additions include:

- Newsletter subscription endpoints
- Search API
- Media library endpoints
- Audit log endpoints
- Analytics endpoints
- Webhook support
- GraphQL gateway
- API key support for third-party integrations
- OAuth2 authentication
- WebSocket notifications

---

# Conclusion

The iNgabo Website API is designed around RESTful best practices, modular domain boundaries, and strong security controls. It provides a stable and scalable interface for the Next.js frontend while enabling administrators and maintainers to manage website content efficiently. The versioned API, standardized responses, comprehensive validation, and RBAC-based authorization ensure the platform remains maintainable and ready for future expansion.