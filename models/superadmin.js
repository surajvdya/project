import mongoose, { Schema } from "mongoose";

const superAdminSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperAdmin", superAdminSchema);
