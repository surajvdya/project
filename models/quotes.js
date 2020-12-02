import mongoose, { Schema } from "mongoose";

const quotesSchema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String },
    imageUrl: { type: String, required: true },
    uploadedBy: {
      //Must be 'gymOwner' or 'trainer' or 'superadmin'
      type: String,
      required: true,
      enum: ["gym", "trainer", "superadmin"]
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotes", quotesSchema);
