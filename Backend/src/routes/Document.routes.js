import { Router } from "express";
import { VerifyJWT } from "../middleware/Auth.middleware";
import { getAllDocuments, getDocumentbyID ,createDocument,updateDocument,deleteDocument} from "../controllers/Document.controller.js";
import {CreatePermission, Deletepermission} from "../controllers/Share.controller.js";

const router = Router();

router.route("/").get(VerifyJWT,getAllDocuments);
router.route("/:id").get(VerifyJWT,getDocumentbyID);
router.route("/").post(VerifyJWT,createDocument);
router.route("/:id").put(VerifyJWT,updateDocument);
router.route("/:id").delete(VerifyJWT,deleteDocument);
router.route("/:id/share").post(VerifyJWT,CreatePermission);
router.route("/:documentId/share/:userId").delete(VerifyJWT,Deletepermission);

export default router;
