# 🏦 Account Management API

A TypeScript-based RESTful API for managing accounts, people, and transactions — built with Express and MongoDB (replica set enabled for safe sessions and transactions).

---

## 🚀 Features

- Create and manage bank accounts
- Add and remove people
- Deposit and withdraw money
- Block accounts
- Check account balances
- Retrieve full or filtered transaction history (by date/time range)
- Swagger UI documentation
- Built-in MongoDB transactions via replica set
- Fully Dockerized

---

## 🛠 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** with Replica Set
- **Mongoose**
- **Docker** & **Docker Compose**

---

## ✅ Prerequisites

- Node.js >= 18.x
- Docker & Docker Compose (for MongoDB)
- MongoDB (if running locally without Docker)
- Yarn or npm

---

## 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/account-management-api.git
cd account-management-api
npm install
```

---

## ▶️ Run with Docker

```bash
docker-compose up --build
```

> API will be available at `http://localhost:3001`  
> MongoDB will be exposed on port `27018`  
> Make sure to access replica set via `mongodb://localhost:27018/?replicaSet=rs0` if testing manually.

---

## 🧪 Running Locally Without Docker

1. Make sure MongoDB is running (with replica set enabled).
2. Create `.env` file or modify `src/config/index.ts` to match your Mongo URI.
3. Run the API locally:

```bash
npm run dev
```

---

## 📚 API Documentation

Swagger UI is available at:

```
http://localhost:3001/api-docs
```

---

## 📄 Available Endpoints

### 🧾 Accounts
- `POST /accounts` – Create new account  
- `DELETE /accounts/:accountId` – Delete account  
- `PATCH /accounts/:accountId/block` – Block account  
- `GET /accounts/:accountId/balance` – Check account balance  

### 👤 People
- `POST /persons` – Create new person  
- `DELETE /persons/:personId` – Delete person  

### 💸 Transactions
- `POST /transactions/:accountId/deposit` – Deposit funds  
- `POST /transactions/:accountId/withdraw` – Withdraw funds  
- `GET /transactions/:accountId/transactions` – All transactions  
- `GET /transactions/:accountId/transactions/period?from=YYYY-MM-DDTHH:mm:ssZ&to=YYYY-MM-DDTHH:mm:ssZ` – Filter transactions by date range  

---

## 🛠 Environment Variables

Set via `.env` or in Docker:

```env
MONGO_URI=mongodb://mongo:27017/account-db?replicaSet=rs0
```

---

## 📄 License

MIT License

---

Feel free to open issues or contribute to improve this project!