import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();        // makes sure that all routes will be configured

router.post("/login", login);       // this is always going to be '/auth/login' from the index.js call to authRoutes

export default router;