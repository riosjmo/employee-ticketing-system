# Employee Ticketing System – Backend

This is the **backend API** for the Employee Ticketing System.  
It is built with **Node.js, Express, TypeScript, Prisma, PostgreSQL, and Docker**, and follows a layered architecture commonly used in production systems.

---

## Tech Stack

- **Node.js + Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT authentication (access + refresh tokens)**
- **Docker & Docker Desktop**
- **Redis** (background jobs / queues)

---

## Features

- User registration & login
- Secure password hashing (bcrypt)
- JWT-based auth with refresh tokens
- Ticket CRUD operations
- Relational data modeling (users, tickets, files)
- Background job queue (email tasks)
- Clean separation of concerns (routes, services, repositories)

## Environment Variables

Create a .env file in /server:

PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tickets
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

## Docker Setup

This project uses Docker for infrastructure services.

Required containers:

PostgreSQL

Redis

Ensure Docker Desktop is running before starting the server.

## Running the Backend Locally

npm install
npx prisma generate
npx prisma migrate dev
npm run dev


Server will start on:

http://localhost:4000

## Design Philosophy

This backend was built to demonstrate:

Real-world auth patterns

Relational data modeling

Clean architecture

Scalable foundations (queues, background jobs, modular design)

Some production features (API gateway, microservices) are intentionally documented but not implemented to keep the project focused and understandable.

## License

MIT