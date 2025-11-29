import express from 'express'
import cors from 'cors'
import { ENV } from './lib/env.js'
import { connect } from 'mongoose'
import { connectDB } from './lib/db.js'

const app = express()

// CORS must come after app is created
app.use(cors({
  origin: "*"
}))

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
