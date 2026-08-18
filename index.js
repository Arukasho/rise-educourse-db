import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

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

setInterval(() => {}, 1000);
