import mongoose, { Schema } from "mongoose";

const gymRatingSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    rating: {
      type: String,
      required: true,
      max: 5,
      min: 0
    },
    ratedBy: {
      type: String,
      required: true,
      enum: ["trainee", "trainer"]
    },
    gym: { type: mongoose.Schema.Types.ObjectId, ref: "Gym", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);
module.exports = mongoose.model("GymRating", gymRatingSchema);
