import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./routes/products";
import { getOrders, getOrder, createOrder, updateOrderStatus } from "./routes/orders";
import { initializeDatabase } from "./db";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize database on startup
  initializeDatabase().catch(console.error);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Product routes
  app.get("/api/products", getProducts);
  app.get("/api/products/:id", getProduct);
  app.post("/api/products", createProduct);
  app.put("/api/products/:id", updateProduct);
  app.delete("/api/products/:id", deleteProduct);

  // Order routes
  app.get("/api/orders", getOrders);
  app.get("/api/orders/:id", getOrder);
  app.post("/api/orders", createOrder);
  app.put("/api/orders/:id", updateOrderStatus);

  return app;
}
