import mongoose from "mongoose";

const permissionEnum = ["VIEW", "EDIT"];

const documentUserSchema = new mongoose.Schema({
  permission: { type: String, enum: permissionEnum, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true }
}, { timestamps: true });

// Setting composite primary key
documentUserSchema.index({ userId: 1, documentId: 1 }, { unique: true });

export const DocumentUser = mongoose.model('DocumentUser', documentUserSchema);

