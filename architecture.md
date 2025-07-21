# Project Architecture — Account Management API

This project follows a **modular layered architecture** with clean separation of concerns, built in **TypeScript** using **Express** and **Mongoose**.

## Folder Structure

```
src/
├── config/           # App-level configurations (e.g., database URI, env)
├── controllers/      # Handles HTTP requests/responses
├── database/         # MongoDB connection logic
├── models/           # Mongoose schemas (Account, Person, Transaction)
├── routes/           # Express routers for endpoints
├── services/         # Business logic layer
├── app.ts            # Express app configuration
├── index.ts          # App entrypoint
docs/
├── components/       # Swagger components (schemas)
├── paths/            # Swagger paths (endpoints)
├── openapi.yaml      # Main OpenAPI spec with $refs
```

## Highlights

- **Clean code architecture** separating logic, routes, models, and docs.
- **Swagger (OpenAPI 3)** integration for rich API documentation.
- **Dockerized** for consistent deployment and development.
- **Atomic services** for business operations like deposit, withdrawal, and balance inquiry.
- **Type safety** with custom types and interfaces.
- **Mongoose Decimal128** for monetary operations with precision.
