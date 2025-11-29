import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';
import cors from "cors";

app.use(cors({
  origin: "*"
}));


const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ msg: "api is running" });
});

app.get('/books', (req, res) => {
  res.status(200).json({ msg: "this is books endpoint" });
});

// IMPORTANT
// Remove serving frontend because Render backend DOES NOT contain frontend/dist
// Your frontend will be deployed separately on Vercel
// So no static file serving here

app.listen(ENV.PORT, () => {
  console.log(`Server started on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});
