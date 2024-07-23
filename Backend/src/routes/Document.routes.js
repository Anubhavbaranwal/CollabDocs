import { Router } from "express";
import { verifyJWT } from "../middleware/Auth.middleware.js";
import { getAllDocuments, getDocumentbyID ,createDocument,updateDocument,deleteDocument} from "../controllers/Document.controller.js";
import {CreatePermission, Deletepermission} from "../controllers/Share.controller.js";

const router = Router();

router.route("/").get(verifyJWT,getAllDocuments);
router.route("/:id").get(verifyJWT,getDocumentbyID);
router.route("/").post(verifyJWT,createDocument);
router.route("/:id").put(verifyJWT,updateDocument);
router.route("/:id").delete(verifyJWT,deleteDocument);
router.route("/:id/share").post(verifyJWT,CreatePermission);
router.route("/:documentId/share/:userId").delete(verifyJWT,Deletepermission);

export default router;
