import mongoose, { Schema } from "mongoose";

const gymSchema = new Schema(
  {
    name: { type: String, required: true },
    contact: {
      type: Number
    },
    imageUrl: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    openTime: {
      type: String,
      required: true
    },
    closeTime: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gym", gymSchema);
