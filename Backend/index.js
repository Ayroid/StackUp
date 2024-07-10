import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Database } from "./controllers/connectDatabase.js";

// CONFIG
dotenv.config();

// CONSTANTS
const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// ROUTERS
import bookRouter from "./routers/bookRouter.js";

// SERVER
const app = express();

// DATABASE
const database = new Database(MONGODB_URI);
database.connect();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// Test Route
app.get("/test", (req, res) => {
  res.send("Application is running.");
});

// ROUTES
app.use("/book", bookRouter);

// DATABASE DISCONNECTION
process.on("SIGINT", () => {
  database
    .disconnect()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});

// SERVER LISTEN
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
