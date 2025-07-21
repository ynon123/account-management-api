# Execution Manual — Account Management API

## Prerequisites

- Node.js >= 18.x
- Docker & Docker Compose (for DB)
- MongoDB (if not using Docker)
- Yarn or npm

## Installation

```bash
git clone <your-repo-url>
cd account-management-api
npm install
```

## Run with Docker

```bash
docker-compose up --build
```

> MongoDB will be exposed on port 27017.

## Running Locally Without Docker

1. Make sure MongoDB is running.
2. Create `.env` file or modify `src/config/index.ts` to match your DB URI.
3. Run:

```bash
npm run dev
```

## API Docs

Once running, access Swagger UI at:

```
http://localhost:3000/api-docs
```


## Available Endpoints
Accounts
- POST /accounts – Create new account
- DELETE /accounts/:accountId – Delete account
- PATCH /accounts/:accountId/block – Block (freeze) account
- GET /accounts/:accountId/balance – Check account balance

Persons
- POST /persons – Create new person
- DELETE /persons/:personId – Delete person

Transactions
- POST /transactions/:accountId/deposit – Deposit funds
- POST /transactions/:accountId/withdraw – Withdraw funds
- GET /transactions/:accountId/transactions – Get all transactions
- GET /transactions/:accountId/transactions/period?from=YYYY-MM-DDTHH:mm:ssZ&to=YYYY-MM-DDTHH:mm:ssZ – Get transactions by date/time range
