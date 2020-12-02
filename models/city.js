import mongoose, { Schema } from "mongoose";

const citySchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
