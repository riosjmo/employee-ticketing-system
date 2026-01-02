# Employee Ticketing System – Frontend

This is the **frontend** for the Employee Ticketing System, built with **React, TypeScript, and Vite**.  
It provides a clean interface for employees to create, view, update, and manage support tickets, while communicating with a REST API backend.

---

## 🚀 Tech Stack

- **React** (functional components)
- **TypeScript**
- **Vite**
- **Fetch API** for HTTP requests
- **JWT-based authentication**
- **Docker-compatible backend integration**

---

## ✨ Features

- User authentication (login & registration)
- Create, edit, delete tickets
- Update ticket status
- View ticket lists and ticket details
- Protected routes (auth-aware navigation)
- API abstraction layer for backend communication

## Environment Setup

Create a .env file in the frontend root:

VITE_API_URL=http://localhost:4000


This should match the backend server port.

## Running the Frontend Locally

npm install
npm run dev


The app will start on:

http://localhost:5173

## Design Philosophy

This frontend focuses on:

Clear data flow

Strong typing

Real-world patterns used in production React apps

Styling was intentionally kept minimal to prioritize functionality, architecture, and correctness.

## Related Repositories

Backend API: /server
