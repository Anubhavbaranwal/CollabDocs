import { USer } from "../models/User.model"; 
import { asyncHandler } from "../utils/AsyncHandling";
import { Document } from "../models/Document.model";
import { DocumentUser } from "../models/Document-User.model";
import { mailservice } from "../utils/mailService";

const CreatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

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
    text: `Click the following link to view and edit the document : http://localhost:3000/document/${id}`,
  };

  await mailservice.sendMail(mail);

  return res.status(201).json(new apiResponse(201, documentUser, "Document shared successfully"));
});
const Deletepermission=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const userId=req.user?.id;
    const documentUser=await DocumentUser.findOneAndDelete({documentId:id,userId});
    if(!documentUser){
        throw new apiError(404,"Document not found");
    }
    return res.status(200).json(new apiResponse(200,documentUser,"Document unshared successfully"));
});

export { CreatePermission, Deletepermission };