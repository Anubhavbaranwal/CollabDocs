import { USer } from "../models/User.model";
import { UserRole } from "../models/UserRole.model";
import { apiError } from "../utils/ApiError";
import { apiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandling";


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
    // const user 