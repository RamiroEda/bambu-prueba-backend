import express from "express";
import { authMiddleware } from "./middlewares/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);

app.post("/register", (req, res) => {
  res.send("Hello World!");
});
