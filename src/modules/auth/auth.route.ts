import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/register", AuthController.registerNewUser);
router.post("/login", AuthController.userLogin);

export const AuthRoutes = router;
