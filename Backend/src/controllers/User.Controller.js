import { USer } from "../models/User.model";
import { UserRole } from "../models/UserRole.model";
import { apiError } from "../utils/ApiError";
import { apiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandling";


const generateAccessandRefreshToken = async (userid) => {
    try {
      const User = await USer.findById(userid);
      const accesstoken = User.generateAccessToken();
      const refreshtoken = User.generateRefreshToken();
      User.refreshToken = refreshtoken;
      await USer.save({ validateBeforeSave: false });
  
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
        text: `Click the following link to verify your email: http://localhost:3000/user/verify-email/${user.verificationToken}`,
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

      return res.status(200).cookie("refreshToken", refreshtoken, options).cookie("accessToken",accesstoken,options).json(new apiResponse(200, "User Logged in Successfully", loggedinUser));

});

export { RegisterUser, loginUser };
