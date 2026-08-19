import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.on("exit", (code) =>
  console.log(">>> process exiting with code", code),
);
process.on("SIGTERM", () => console.log(">>> got SIGTERM"));
process.on("SIGINT", () => console.log(">>> got SIGINT"));
process.on("beforeExit", (code) => console.log(">>> beforeExit", code));
process.on("uncaughtException", (err) =>
  console.log(">>> uncaughtException", err),
);
process.on("unhandledRejection", (reason) =>
  console.log(">>> unhandledRejection", reason),
);

app.use(express.json());
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

import router from "./src/router.js";
app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
