import { Router } from "express";
import { loginUser, RegisterUser } from "../controllers/User.Controller";

const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(RegisterUser);