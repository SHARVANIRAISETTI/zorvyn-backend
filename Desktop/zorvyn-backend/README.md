# Finance Data Processing Backend

## Overview

A backend system for managing financial records with RBAC and aggregation features. Built with production-ready patterns and financial data integrity in mind.

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

## What Makes This Project Unique

Unlike standard CRUD applications, this project implements **real-world fintech backend patterns**:

- **Financial Aggregation Logic** - Computes net balance, category breakdowns, and monthly summaries at the database level for optimal performance
- **Soft Delete Architecture** - Preserves financial audit trail while maintaining data integrity (critical for compliance)
- **Role-Based Access Control** - Implements granular access control with Admin, Analyst, and Viewer roles for secure multi-tenant scenarios
- **Advanced Analytics Endpoint** - Monthly financial summary provides time-series insights essential for reporting and dashboards
- **Structured Error Handling** - Returns meaningful error responses with proper HTTP status codes and validation details
- **Modular Architecture** - Clean separation of concerns (models, controllers, services, routes) enables scalability and maintainability

## Why This Matters

In fintech applications:
- **Data integrity is non-negotiable** - Soft deletes preserve audit trails for compliance
- **Performance matters** - DB-level aggregation reduces memory overhead and latency
- **Access control is critical** - RBAC prevents unauthorized access to financial data
- **Insights drive decisions** - Time-series analytics support business intelligence

## Database Choice

SQLite was chosen for simplicity and zero-configuration setup, suitable for rapid development and evaluation. In production, PostgreSQL would be recommended for scalability.

## Features

* Role-Based Access Control (Admin, Analyst, Viewer)
* Soft Delete (deletedAt) for audit compliance
* Financial Aggregations (Net Balance, Monthly Summary, Category Insights)
* Advanced Input Validation with Joi
* Structured Error Responses
* RESTful API Design

## API Endpoints

| Method | Endpoint                         | Role           | Purpose                    |
| ------ | -------------------------------- | -------------- | -------------------------- |
| POST   | /api/auth/register               | Public         | User registration          |
| POST   | /api/auth/login                  | Public         | User authentication        |
| GET    | /api/auth/me                     | All            | Get current user details   |
| GET    | /api/records                     | All            | Retrieve all transactions  |
| GET    | /api/records/recent-transactions | All            | Get recent transactions (limit query param) |
| POST   | /api/records                     | Admin, Analyst | Create new transaction     |
| DELETE | /api/records/:id                 | Admin          | Soft-delete transaction    |
| GET    | /api/aggregations/net-balance    | All            | Financial position summary |
| GET    | /api/aggregations/monthly-summary| All            | Monthly financial trends   |

## Design Decisions

* **Layered Architecture** - Models, controllers, services, and routes are separated for maintainability and testability
* **DB-Level Aggregation** - Financial computations happen at the database level to ensure consistency and performance
* **RBAC Middleware** - Authorization logic is centralized to avoid code duplication
* **Soft Deletes** - Records are marked deleted rather than removed, preserving financial audit history
* **Structured Responses** - All API responses include `success`, `message`, and `data` fields for consistency

## Edge Cases Handled

* Inactive users are restricted from accessing protected APIs
* Soft-deleted records are automatically excluded from all queries
* Unauthorized roles receive 403 Forbidden responses
* Validation errors return detailed messages about what fields failed
* Database constraints prevent duplicate emails and foreign key violations

## Originality Statement

This project was independently designed and implemented following backend engineering principles. Architecture decisions prioritize performance, security, and maintainability - key factors in production fintech systems.

## Authentication Note

Authentication is simulated using x-user-id header for testing. In production, JWT tokens with proper claims would be used for stateless authentication.

## Testing the Endpoints

```powershell
# Register user
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Headers @{ "Content-Type"="application/json" } -Body '{"name":"John Doe","email":"john@example.com","password":"password123","role":"Analyst"}'

# Login
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Headers @{ "Content-Type"="application/json" } -Body '{"email":"john@example.com","password":"password123"}'

# Create record
Invoke-RestMethod -Uri "http://localhost:5000/api/records" -Method POST -Headers @{ "Content-Type"="application/json"; "x-user-id"="2" } -Body '{"amount":500,"type":"Income","category":"Salary","date":"2026-04-01"}'

# Get recent transactions (last 5)
Invoke-RestMethod -Uri "http://localhost:5000/api/records/recent-transactions?limit=5" -Method GET -Headers @{ "x-user-id"="2" }

# Get monthly summary
Invoke-RestMethod -Uri "http://localhost:5000/api/aggregations/monthly-summary" -Method GET -Headers @{ "x-user-id"="2" }
```
