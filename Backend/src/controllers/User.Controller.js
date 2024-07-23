import { USer } from "../models/User.model.js";
import { UserRole } from "../models/UserRole.model.js";
import { apiError } from "../utils/ApiError.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandling.js";
import jwt from "jsonwebtoken";
import { mailservice } from "../utils/mailService.js";

const generateAccessandRefreshToken = async (userid) => {
    try {
      const User = await USer.findById(userid);
      const accesstoken = User.generateAccessToken();
      const refreshtoken = User.generateRefreshToken();
      User.refreshToken = refreshtoken;
      await User.save({ validateBeforeSave: false });
  
      return { accesstoken, refreshtoken };
    } catch (error) {
      throw new apiError(
        500,
        "Something Went Wrong in Generating Access/Refresh Token"
      );
    }
  };    

const RegisterUser= asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email||!password){
        throw new apiError(400, "Email and password are required");
    }
    const user=await USer.findOne({email});
    if(user){
        throw new apiError(400, "User already exists");
    }

    const verificationToken = jwt.sign({ email }, "verify_email");

    const newUser=await USer.create({
        email,
        password,
        verificationToken
    });

    await sendVerificationEmail(newUser);


    const findUser=await USer.findById(newUser._id).select("-password -refreshToken");
    if(!findUser){
        throw new apiError(400, "User not created Successfully");
    }
    return res.status(201).json(new apiResponse(201, "User created successfully", findUser));
});

const sendVerificationEmail = async (user) => {
    const mail = {
        from: "anubhavbaranwal02@gmail.com",
        to: user.email,
        subject: "Welcome to CollabDocs",
        text: `Click the following link to verify your email: ${process.env.FrontendLINk}/user/verify-email/${user.verificationToken}`,
    };

    await mailservice.sendMail(mail);
};
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new apiError(400, "Email and password are required");
    }
    const user = await USer.findOne({ email });
    if (!user) {
        throw new apiError(400, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new apiError(400, "Password is incorrect");
    }

    const { accesstoken, refreshtoken } = await generateAccessandRefreshToken(user._id);

    const loggedinUser = await USer
    .findById(user._id)
    .select("-password -refreshToken")


    if(!loggedinUser){
        throw new apiError(400, "User not Logged in Please Try Again");
    }

    const options = {
        httpOnly: true,
        secure: true,
      };

      return res.status(200).cookie("refreshToken", refreshtoken, options).cookie("accessToken",accesstoken,options).json(new apiResponse(200, "User Logged in Successfully", {loggedinUser,accesstoken,refreshtoken}));

});

const LogOut = asyncHandler(async (req, res) => {
    await USer.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new apiResponse(200, {}, "LoggedOut SuccessFully"));
  });
const RefessAccessToken = asyncHandler(async (req, res) => {
    const incomingToken = req.cookie.refreshToken || req.body.refreshToken;
  
    if (!incomingToken) {
      throw new apiError(401, "UnAuthorize Access");
    }
    try {
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
  
      const users = await USer.findById(decodedToken?._id);
  
      if (!users) {
        throw new apiError(401, "Invalid refresh token");
      }
  
      if (incomingRefreshToken !== users?.refreshToken) {
        throw new apiError(401, "Refresh token is expired or used");
      }
  
      const options = {
        httpOnly: true,
        secure: true,
      };
  
      const { accessToken, newRefreshToken } =
        await generateAccessandRefreshToken(users._id);
  
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
          new apiResponse(
            200,
            { accessToken, refreshToken: newRefreshToken },
            "Access token refreshed"
          )
        );
    } catch (error) {
      throw new apiError(401, error?.message || "Invalid refresh token");
    }
  });

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    if (!token) {
        throw new apiError(400, "Invalid Token");
    }
    const decodedToken = jwt.verify(token, "verify_email");
    if(!decodedToken){
        throw new apiError(400, "Invalid Token");
    }

    const user = await USer.findOne({ email: decodedToken.email });

    if (!user) {
        throw new apiError(400, "Invalid Token");
    }

    user.verificationToken = undefined;
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new apiResponse(200, "Email Verified Successfully", {}));
});

const userbyid = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      throw new apiError(400, "User Id is required");
    }
  
    const User = await USer.findById(id).select("-password -refreshtoken");
  
    if (!User) {
      throw new apiError(404, "User Not Found");
    }
    return res
      .status(200)
      .json(new apiResponse(200, User, "User Fetched Successfully"));
  });
  const resetPassword =asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
      throw new apiError(400, "Email is required");
    }
    const user = await USer.findOne({ email });
    if (!user) {
      throw new apiError(404, "User not found");
    }
    const resetToken = jwt.sign({ email,_id}, "reset_password",{
        expiresIn: "10m",
    });
    user.resetToken = resetToken;

    await user.save({ validateBeforeSave: false });
    return res.status(200).json(new apiResponse(200, "Reset Password Link Sent to your Email", {}));
    });
  const confirmPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    if (!token) {
      throw new apiError(400, "Invalid Token");
    }
    const decodedToken = jwt.verify(token, "reset_password");
    if (!decodedToken) {
      throw new apiError(400, "Invalid Token");
    }
    const {email}= decodedToken;
    const user = await USer.findOne({ email });
    if(!user){
        throw new apiError(404, "User not found");
    }
    const { password } = req.body;
    if (!password) {
      throw new apiError(400, "Password is required");
    }
    user.password = password;
    user.resetToken = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(200).json(new apiResponse(200, "Paassword Updated Successfully", {}));
  });



export { RegisterUser, loginUser, LogOut ,RefessAccessToken,verifyEmail,userbyid,confirmPassword,resetPassword};
