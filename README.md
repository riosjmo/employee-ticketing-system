# employee-ticketing-system

A full‑stack employee ticketing system built to mirror real‑world production patterns, not just a CRUD demo. This project is meant to demonstrate how modern teams structure backend services, authentication, relational data, background jobs, and frontend integrations.

## Tech Stack

## Frontend

• React

• TypeScript

• Vite

• Fetch-based API client

## Frontend

• Backend

• Node.js + Express

• TypeScript

• Prisma ORM

• PostgreSQL

• Redis

• JWT authentication (access + refresh tokens)

## Infrastructure / Tooling

• Docker (local development)

• Prisma Migrations

• Background job queue

## Features

## Authentication

• Email + password authentication

• Password hashing with bcrypt

• JWT access tokens

• Refresh token rotation

• Secure token storage in database

## Ticket System

• Create, read, update, delete tickets

• Ticket ownership (user → tickets)

• Ticket status management (open, in‑progress, closed)

• Relational eager loading (owner + files)

## Employees

• Users stored as employees

• Employee list pulled from backend

## File Uploads

• File metadata stored in database

• Ticket ↔ file relationships

• Prepared for S3‑style storage

## Background Jobs

• Redis‑backed job queue

• Example email job

• Async task processing pattern

## Frontend Integration

• Fully connected React frontend

• API abstraction layer

• Create / edit / delete ticket flows

• Status updates

## Architecture Overview

## Backend Pattern

• Routes → request handling

• Controllers → input validation + orchestration

• Services → business logic

• Repositories → database access (Prisma)

Separation meant to mirror production codebases and keep logic testable and scalable.

## Database Design (Prisma)

Key relationships:

• User → Tickets (one‑to‑many)

• Ticket → Files (one‑to‑many)

• User → RefreshTokens

• User → Jobs → Videos

Eager loading is used where appropriate to avoid N+1 query problems.

## Local Development Setup

Docker is only required for local development.

## Prerequisites

• Node.js

• Docker Desktop

## Backend Setup

cd server
npm install


docker compose up -d
npx prisma migrate dev
npm run dev

Backend runs on http://localhost:4000

## Frontend Setup

cd client
npm install
npm run dev

Frontend runs on http://localhost:5173

## Environment Variables

Backend requires:

DATABASE_URL=postgresql://...
ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...

## API Overview

## Tickets

• GET /tickets – list tickets

• GET /tickets/:id – get ticket

• POST /tickets – create ticket

• PUT /tickets/:id – update ticket

• DELETE /tickets/:id – delete ticket

## Auth

• POST /auth/register

• POST /auth/login

• POST /auth/refresh

• POST /auth/logout

## Why Docker Is Used

Docker is used only for local development to:

• Ensure consistent Postgres & Redis setup

• Mirror production‑style infrastructure

• Avoid OS‑specific issues

This project is not dependent on Docker for deployment.

## License
MIT