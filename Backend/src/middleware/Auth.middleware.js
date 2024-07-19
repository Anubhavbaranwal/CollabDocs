import { USer } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/AsyncHandling.js";

export const VerifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log(token+"token"+"h");
    if (!token) {
      throw new ApiError(401, "Unauthorize request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const User = await USer
      .findById(decodedToken._id)
      .select("-password -refreshtoken");

    if (!User) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.User = User;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
