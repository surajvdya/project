import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: { type: String },
    phoneNumber: { type: String },
    contactPerson: {
      type: String,
      required: true
    },
    status: { type: Boolean, default: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
