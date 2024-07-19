import { asyncHandler } from "../utils/AsyncHandling";

const HealthCheck=asyncHandler(async(req,res)=>{
    return res.status(200).json(new apiResponse(200,{},"Server is up and running"));
});
export HealthCheck};