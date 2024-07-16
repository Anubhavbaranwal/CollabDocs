import { DocumentUser } from "../models/Document-User.model";
import { Document } from "../models/Document.model";
import { asyncHandler } from "../utils/AsyncHandling";

const findDocumentById=async(id, userId)=> {
    // Attempt to find the document by ID and that it either belongs to the user or is public
    let document = await Document.findOne({
      $or: [
        { _id: id, userId: userId },
        { _id: id, isPublic: true }
      ]
    });
  
    // If the document is not found, attempt to find it through shared documents
    if (!document) {
      const sharedDocument = await DocumentUser.findOne({
        userId: userId,
        documentId: id
      }).populate('documentId'); // Assuming 'documentId' is a reference to the Document model
  
      if (!sharedDocument) return null;
  
      document = sharedDocument.documentId; // Assuming the populated field is 'documentId'
    }
  
    return document;
  }

const getDocumentbyID=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const userId = req.user.id; 
    const document=await findDocumentById(id,userId);
    if(!document){
        throw new apiError(404,"Document not found");
    }
    return res.status(200).json(new apiResponse(200,document,"Document fetched successfully"));
}  );

const getAllDocuments=asyncHandler(async(req,res)=>{
    const ownedDocuments = await Document.find({ userId: req.user?.id });

    const sharedDocumentRelations = await DocumentUser.find({ userId: req.user?.id });

    const sharedDocumentIds = sharedDocumentRelations.map((docUser) => docUser.documentId);
  
    const sharedDocuments = await Document.find({ _id: { $in: sharedDocumentIds } });
  
    const combinedDocuments = [...ownedDocuments, ...sharedDocuments];

    return res.status(200).json(new apiResponse(200,combinedDocuments,"Documents fetched successfully"));
})
const createDocument=asyncHandler(async(req,res)=>{
    const document=await Document.create({
        userId:req.user?.id,
    });
    return res.status(201).json(new apiResponse(201,document,"Document created successfully"));
})
const updateDocument=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const userId=req.user?.id;
    const {title,content,isPublic}=req.body;
    const document=await findDocumentById(id,userId);

    if(!document){
        throw new apiError(404,"Document not found");
    }
    if(title){
        document.title=title;
    }
    if(content){
        document.content=content;
    }
    if(isPublic){
        document.isPublic=isPublic;
    }
    await document.save();

    return res.status(200).json(new apiResponse(200,document,"Document updated successfully"));
});
const deleteDocument=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const userId=req.user?.id;
    const document=await findDocumentById(id,userId);
    if(!document){
        throw new apiError(404,"Document not found");
    }
    await document.remove();
    return res.status(200).json(new apiResponse(200,{},"Document deleted successfully"));
});

export {getDocumentbyID,getAllDocuments,createDocument,updateDocument,deleteDocument};
    