import express from "express";
import { login, logout, signup, updateProfile, checkAuth, updateBio, updatePhoneNumber, deleteAccount } from "../Controllers/auth.controllers.js";
import { protectRoute } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
router.put("/update-bio", protectRoute, updateBio);
router.put("/update-PhoneNumber", protectRoute, updatePhoneNumber);

router.delete('/delete', protectRoute, deleteAccount);

router.get("/check", protectRoute, checkAuth);

export default router;
