import mongoose, { Schema } from "mongoose";

const trainerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    gender: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    city: {
      type: String
    },
    location: {
      type: String
    },
    availibility: {
      //for personal training
      type: Boolean,
      default: false
    },
    price: {
      type: Number
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

module.exports = mongoose.model("Trainer", trainerSchema);
