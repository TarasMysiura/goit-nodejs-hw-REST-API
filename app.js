import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import path from "path";

// const publicFolderPath = path.resolve('public');
// console.log('publicFolerPath: ', path.resolve('public'));
// console.log('publicFolderPath: ', publicFolderPath);


import contactsRouter from "./routes/api/contacts-router.js";
import authRouter from "./routes/api/auth-router.js";
// console.log('authRouter: ', express.static(".\public"));

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// app.use('/public', express.static(publicFolderPath))
// app.use('/avatars', express.static(publicFolderPath));
// app.use(express.static(path.join('./public')))
// app.use(express.static('public'));
app.use(express.static(".\public"))

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
