# Finance Data Processing Backend

## Overview

A backend system for managing financial records with RBAC and aggregation features.

## Tech Stack

* Node.js
* Express
* SQLite
* Joi
* bcryptjs

## Setup

```bash
npm install
node server.js
```

## Database Choice

SQLite was chosen for simplicity and zero-configuration setup.

## Features

* Role-Based Access Control (Admin, Analyst, Viewer)
* Soft Delete (deletedAt)
* Financial Aggregations (Net Balance)
* Input Validation

## API Endpoints

| Method | Endpoint                      | Role           |
| ------ | ----------------------------- | -------------- |
| POST   | /api/auth/register            | Public         |
| POST   | /api/auth/login               | Public         |
| GET    | /api/records                  | All            |
| POST   | /api/records                  | Admin, Analyst |
| DELETE | /api/records/:id              | Admin          |
| GET    | /api/aggregations/net-balance | All            |

## Design Decisions

* Layered architecture for maintainability
* RBAC middleware for DRY principle
* SQL aggregation for performance

## Edge Cases

* Inactive users blocked
* Negative amounts rejected
* Deleted records ignored

## Originality Statement
This project was independently designed and implemented following backend engineering principles. No code was copied from tutorials or external repositories.

## Design Decisions
- Layered architecture improves maintainability and scalability
- RBAC middleware ensures clean separation of authorization logic
- SQLite chosen for zero-setup and easy evaluation
- Soft delete implemented to maintain financial audit history
- Aggregation handled at database level for efficiency

## Authentication Note
Authentication is simulated using x-user-id header for testing. In production, JWT would be used.

## Edge Cases Handled
- Inactive users are restricted from accessing APIs
- Soft-deleted records are excluded from queries
- Unauthorized roles are blocked from sensitive operations
