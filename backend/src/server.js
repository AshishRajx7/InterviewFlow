import express from 'express'
import path from 'path'
import cors from 'cors'
import { ENV } from './lib/env.js'
import { serve } from "inngest/express";

import { clerkMiddleware } from "@clerk/express";

import { inngest, functions } from "./lib/inngest.js";
import { connectDB } from './lib/db.js'

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoute from "./routes/sessionRoute.js";

console.log("SERVER CLIENT_URL:", ENV.CLIENT_URL);


const app = express()

const __dirname = path.resolve();

app.use(
  cors({
    origin: [
      ENV.CLIENT_URL,                        // frontend
      "https://clerk.interview-flow-seven.vercel.app",
      "https://api.clerk.com"
    ],
    credentials: true,
  })
);

app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoute);

app.get('/health', (req, res) => {
  res.status(200).json({ msg: "api is running" })
})

app.get('/books', (req, res) => {
  res.status(200).json({ msg: "this is books endpoint" })
})

// No frontend serving. Vercel handles frontend.
// Backend only serves API.

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
