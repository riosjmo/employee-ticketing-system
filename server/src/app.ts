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

app.use("/api", routes);
app.use("/tickets", ticketRoutes);
app.use("/auth", authRoutes);
app.use("/employees", employeesRoutes);
app.use("/admin/queues", serverAdapter.getRouter());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/files", fileroutes);

app.use(notFound);
app.use(errorHandler);

export default app;