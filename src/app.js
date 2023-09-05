import express from "express"; // const express = require('express')
import routes from "./routes/routes.js";
import ping from "./routes/index.routes.js";

export const app = express();

app.use(express.json());

app.use(routes);
app.use(ping);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});
