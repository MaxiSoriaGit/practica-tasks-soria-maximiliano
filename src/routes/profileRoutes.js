import { Router } from "express";
import { createProfile, getProfiles } from "../controllers/profileController.js";

const router = Router();

router.post("/", createProfile);
router.get("/", getProfiles);

export default router;