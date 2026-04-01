# Zorvyn Finance Backend

A modular and scalable backend system for managing personal financial records, built using Node.js and SQLite. This project simulates a real-world fintech backend by providing secure APIs, financial aggregations, and role-based access control.

---

## Features

* User authentication (simulated via request headers)
* Role-Based Access Control (Admin, Analyst, Viewer)
* Financial aggregation (net balance, category insights)
* Spending trends and analytics
* Record management (income and expenses)
* Soft delete for audit-safe data handling
* Lightweight SQLite database (zero setup)

---

## Architecture Overview

This backend follows a layered architecture:

* Controllers handle HTTP requests and responses
* Services contain business logic
* Models interact with the database
* Routes define API endpoints
* Middleware handles authentication and authorization

This structure improves maintainability, scalability, and readability.

---

## Engineering Considerations

* Database-level aggregation is used to improve performance and reduce memory usage
* Soft delete ensures financial audit safety and prevents data loss
* Modular structure enables easy feature extension and testing
* SQLite is used for quick setup and ease of evaluation
* Role-based access ensures secure multi-user interaction

---

## Tech Stack

* Node.js
* Express.js
* SQLite3
* Joi (validation)
* bcryptjs (password hashing)

---

## Project Structure

```
zorvyn-backend/

├── src/
│   ├── config/        # Database configuration
│   ├── controllers/   # Request handlers
│   ├── models/        # Database queries
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── middleware/    # Authentication and RBAC
│
├── data/              # SQLite database file
├── app.js             # Express app setup
├── server.js          # Server entry point
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/SHARVANIRAISETTI/zorvyn-backend.git
cd zorvyn-backend
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Run the server

```
node server.js
```

---

### 4. Server runs on

```
http://localhost:5000
```

---

## API Endpoints

### Authentication

* POST /api/auth/register → Register user
* POST /api/auth/login → Login user

---

### Records

* POST /api/records → Create record
* GET /api/records → Retrieve records
* DELETE /api/records/:id → Soft delete record

---

### Aggregation

* GET /api/aggregations/net-balance → Net balance
* GET /api/aggregations/category-insights → Category summary
* GET /api/analytics/spending-trends → Spending trends

---

## Sample Request

Create Record:

```
{
  "amount": 5000,
  "type": "Income",
  "category": "Salary",
  "date": "2026-04-01",
  "notes": "Monthly salary"
}
```

---

## Authentication Note

Authentication is simulated using the `x-user-id` header for testing purposes.
In production, this would be replaced with JWT-based authentication.

---

## Edge Cases Handled

* Inactive users cannot access APIs
* Soft-deleted records are excluded from queries
* Role restrictions enforced on sensitive endpoints
* Input validation prevents invalid data

---

## Future Improvements

* JWT-based authentication
* Pagination for large datasets
* Caching for aggregation endpoints
* Docker-based deployment
* API rate limiting

---

## Originality Statement

This project was independently designed and implemented based on backend engineering principles.
No code was copied from external repositories or tutorials.

---

## Conclusion

This project demonstrates the design of a scalable backend system for financial data management, focusing on clean architecture, performance optimization, and secure data handling.
