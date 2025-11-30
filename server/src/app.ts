import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// root routes
app.use("/api", routes);

// auth routes
app.use("/api/auth", authRoutes);

// health check (optional)
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

export default app;