import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createSession,
  endSession,
  getActiveSessions,
  getMyRecentSessions,
  getSessionById,
  joinSession,
} from "../controllers/sessionController.js";

const router = express.Router();

// Debug: print all registered paths
console.log("REGISTERED ROUTES for sessions:");
console.log(router.stack.map(r => r.route && r.route.path));

// CREATE SESSION
router.post("/", protectRoute, createSession);

// GET ACTIVE SESSIONS
router.get("/active", protectRoute, getActiveSessions);

// GET RECENT SESSIONS
router.get("/my-recent", protectRoute, getMyRecentSessions);

// GET SESSION BY ID
router.get("/:id", protectRoute, getSessionById);

// JOIN SESSION
router.post("/:id/join", protectRoute, joinSession);

// END SESSION
router.post("/:id/end", protectRoute, endSession);

export default router;
