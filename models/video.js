import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String },
    videoUrl: { type: String, required: true },
    uploadedBy: {
      type: String,
      required: true,
      enum: ["gym", "trainer", "superAdmin"]
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    videoCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutCategory",
      required: true
    },
    videoSubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutSubCategory",
      required: true
    },
    views: { type: Number },

    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
