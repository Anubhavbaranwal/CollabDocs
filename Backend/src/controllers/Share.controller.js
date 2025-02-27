import { USer } from "../models/User.model.js"; 
import { asyncHandler } from "../utils/AsyncHandling.js";
import { Document } from "../models/Document.model.js";
import { DocumentUser } from "../models/Document-User.model.js";
import { mailservice } from "../utils/mailService.js";
import { apiError } from "../utils/ApiError.js";
import { apiResponse } from "../utils/ApiResponse.js";

const CreatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const document = await Document.findById(id);
  if (!document) {
    throw new apiError(404, "Document not found");
  }

  if (!req.user?.id || document.userId.toString() !== req.user.id) {
    throw new apiError(403, "You are not authorized to share this document");
  }

  const { email, permission } = req.body;

  const sharedUser = await USer.findOne({ email });

  if (!sharedUser) {
    throw new apiError(404, "User not found");
  };

  const documentUser = await DocumentUser.create({
    documentId: id,
    userId: sharedUser._id,
    permission: permission,
  });

  const mail = {
    from: "Anubhavbaranwal02@gmail.com",
    to: sharedUser.email,
    subject: `${req.user.email} shared a document with you!`,
    text: `Click the following link to view and edit the document : ${process.env.FrontendLINk}/document/${id}`,
  };

  await mailservice.sendMail(mail);

  return res.status(201).json(new apiResponse(201, documentUser, "Document shared successfully"));
});
const Deletepermission=asyncHandler(async(req,res)=>{
  const { documentId, userId } = req.params;
  const document=await Document.findById({documentId,userId:req.user?.id});
  if(!document){
    throw new apiError(404,"Document not found");
  }
  const documentUser=await DocumentUser.findOneAndDelete({documentId,userId});
  if(!documentUser){
    throw new apiError(404,"Permission not found");
  }
  return res.status(200).json(new apiResponse(200,{},"Permission deleted successfully"));

});

export { CreatePermission, Deletepermission };