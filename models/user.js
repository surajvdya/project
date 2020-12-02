import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      required: true,
      enum: ["trainee", "trainer", "gym", "store", "superadmin"]
    },
    isEmailVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    // emailVerification: {
    //   code: { type: String },
    //   expires: { type: Date },
    //   isUsed: { type: Boolean, default: false }
    // },
    isDeleted: { type: Boolean, default: false },
    lastOnline: {
      type: Date
    }
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// password encryption before saving
userSchema.pre("save", async function(next) {
  var user = this;
  try {
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // hash the password using our new salt
    const hash = await bcrypt.hash(user.password, salt);

    // override the cleartext password with the hashed one
    user.password = hash;

    next();
  } catch (error) {
    console.log("error", error.message);
    next(error);
  }
});

// Assoc

userSchema.virtual("trainer", {
  ref: "Trainer",
  localField: "_id",
  foreignField: "user",
  justOne: true
});
userSchema.virtual("trainee", {
  ref: "Trainee",
  localField: "_id",
  foreignField: "user",
  justOne: true
});
userSchema.virtual("gym", {
  ref: "Gym",
  localField: "_id",
  foreignField: "user",
  justOne: true
});
userSchema.virtual("store", {
  ref: "Store",
  localField: "_id",
  foreignField: "user",
  justOne: true
});
userSchema.virtual("superadmin", {
  ref: "SuperAdmin",
  localField: "_id",
  foreignField: "user",
  justOne: true
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
