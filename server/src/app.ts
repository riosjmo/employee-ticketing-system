import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import authRoutes from "./routes/auth.routes.js";
import fileroutes from "./routes/fileRoutes.js";
import employeesRoutes from "./routes/employees.routes.js";
import { serverAdapter } from "./admin/queues.js";
import ticketRoutes from "./routes/tickets.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// root routes
app.use("/api", routes);

// ticket routes
app.use("/tickets", ticketRoutes);

// auth routes
app.use("/auth", authRoutes);

// employees routes
app.use("/employees", employeesRoutes);

// bull board admin UI for queues
app.use("/admin/queues", serverAdapter.getRouter());

// health check (optional)
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// file routes
app.use("/files", fileroutes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

export default app;