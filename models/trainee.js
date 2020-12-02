import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const traineeSchema = new Schema(
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
    isPremium: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

traineeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Trainee", traineeSchema);
