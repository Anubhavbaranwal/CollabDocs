import { Router } from "express";
import { RegisterUser, loginUser, LogOut ,RefessAccessToken,verifyEmail,userbyid,confirmPassword,resetPassword } from "../controllers/User.Controller.js";
import { VerifyJWT } from "../middleware/Auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(RegisterUser);
router.route("/verify-email/:token").get(verifyEmail);
router.route("/logout").post(VerifyJWT ,LogOut);   
router.route("/refresh-token").post(RefessAccessToken);
router.route("/:id").get(VerifyJWT,userbyid);
router.route("/reset-password").post(resetPassword);
router.route("/password/:token").put(confirmPassword);

export default router;