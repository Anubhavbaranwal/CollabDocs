import { USer } from "../models/User.model.js";
import { apiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/AsyncHandling.js";

export const VerifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
      console.log(req.cookies?.accessToken+"cookies");
      console.log(req.header("Authorization")?.replace("Bearer ", "")+"header");
    console.log(token+"token"+"h");
    if (!token) {
      throw new apiError(401, "Unauthorize request");
    }
     console.log(process.env.ACCESS_TOKEN_SECRET+"secret")
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


    const User = await USer
      .findById(decodedToken._id)
      .select("-password -refreshtoken");

    if (!User) {
      throw new apiError(401, "Invalid Access Token");
    }

    req.User = User;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token");
  }
});
