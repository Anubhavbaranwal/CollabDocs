import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: mongoose.Schema.Types.Mixed, },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Virtual field for `users` through `DocumentUser`
documentSchema.virtual("users", {
  ref: "DocumentUser",
  localField: "_id",
  foreignField: "documentId",
  justOne: false,
  options: { onDelete: "CASCADE" },
});

// Default scope equivalent for including `DocumentUser` with populated `User`
documentSchema.set("toObject", { virtuals: true });
documentSchema.set("toJSON", { virtuals: true });

documentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "users",
    populate: {
      path: "userId",
      select: "email",
    },
  });
  next();
});

export const Document = mongoose.model("Document", documentSchema);


