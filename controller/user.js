import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { sendSuccess, sendError } from "../lib/requestHandler";
import sendEmail from "../service/sendEmail";
import { verificationEmailTemplate } from "../template/verificationEmail";
import {
  createTrainee,
  createTrainer,
  createGym,
  createStore
} from "../service/index";
import Log from "../lib/log";
import config from "../lib/config";
import models from "../models";
import { request } from "express";
// const sequelize = models.sequelize;

class UserController {
  constructor() {}

  async loginUser(req, res) {
    try {
      const { email, password, userType } = req.body;

      const query = models.User.findOne({
        email: email,
        isEmailVerified: true,
        isDeleted: false
      });
      const user = await query;
      if (!user) {
        throw new Error(
          "Authentication failed, please check your email and password"
        );
      }
      let isAuthenticated = await bcrypt.compare(password, user.password);

      if (!isAuthenticated) {
        throw new Error(
          "Authentication failed, please check your email and password"
        );
      }

      if (user.userType !== userType) {
        throw new Error(`You are not registered as ${userType}`);
      }

      const userData = await query
        .populate(userType, "-__v")
        .select("-password -__v");

      if (!userData[userType]) {
        throw new Error(`You are not fully registered as ${userType}`);
      }

      const responseData = JSON.parse(JSON.stringify(userData[userType]));
      responseData.email = user.email;
      responseData.userId = user._id;

      sendSuccess(res, `User Logged In as ${userType}`, {
        [userType]: responseData
      });

      // if (userType === "gym") {
      //   const userData = await models.User.findOne({ _id: user._id }).populate(
      //     "gym"
      //   );
      //   if (!userData.gym) {
      //     throw new Error("You are not registered as Gym Owner");
      //   }
      //   data = {
      //     ...userData.gym,
      //     email
      //   };
      // const { _id, name, ownerName } = userData.gym;
      // tokenData = {
      //   gymId: _id,
      //   name,
      //   ownerName,
      //   email
      // };
    } catch (error) {
      Log.error(`Post /api/user/login  ${error.message}`);
      sendError(res, "user login failed", { error: error.message });
    }
  }

  async registerUser(req, res) {
    try {
      const { email, password, userType } = req.body;
      let userData = { email, password, userType };

      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      userData.verificationCode = verificationCode;

      // userData.emailVerification.code = verificationCode;
      // userData.emailVerification.expires = Date.now() + 60000;

      userData.isEmailVerified = false;

      const mailOptions = {
        from: config.MAIL_USER,
        to: email,
        subject: "Please confirm your Email account",
        html: verificationEmailTemplate(verificationCode)
      };

      let user = new models.User(userData);

      const newUser = await user.save();

      if (newUser) {
        sendEmail(mailOptions);
        sendSuccess(
          res,
          `User registered and verification code is sent to your email ${email}`,
          {
            user: { _id: newUser._id }
          },
          201
        );
      }
    } catch (error) {
      Log.error(`Post /api/user/register  ${error}`);
      sendError(res, "user registration failed", { error: error.message });
    }
  }

  async verifyUserEmail(req, res) {
    try {
      const verificationCode = req.params.code;
      const user = await models.User.findOne({ verificationCode });

      // const user = await models.User.findOne({
      //   "emailVerification.code": verificationCode,
      //   "emailVerification.expires": { $gt: Date.now() }
      // });

      if (!user) {
        throw new Error("User not found, invalid code");
      }
      user.isEmailVerified = true;
      user.verificationCode = undefined;
      await user.save();

      const responseData = { _id: user._id, email: user.email };

      sendSuccess(res, "Email Verified", { user: responseData }, 200);
    } catch (error) {
      Log.error(`GET /api/user/verify-email  ${error}`);
      sendError(res, "user email verification failed", {
        error: error.message
      });
    }
  }

  async createTrainee(req, res) {}

  async createUser(req, res) {
    try {
      const query = models.User.findOne({
        _id: req.body.user,
        isDeleted: false
      }).select("id email userType isEmailVerified");

      const user = await query;

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.isEmailVerified) {
        throw new Error("Your email is not verified");
      }

      const userType = req.body.userType;

      if (user.userType !== userType) {
        throw new Error(`User not registered as ${userType}`);
      }

      const dbModel = userType.charAt(0).toUpperCase() + userType.slice(1); //userType=trainer ,dbModel = Trainer
      let isAlreadyExists = await models[dbModel].findOne({
        user: user,
        isDeleted: false
      });
      if (isAlreadyExists) {
        throw new Error(`${userType} of this userId already exists`);
      }

      // const userPopulatedData = await query.populate(userType);

      // if (userPopulatedData[userType]) {
      //   throw new Error(`${userType} of this userId already exists`);
      // }

      const createUser = new models[dbModel](req.body);

      const newUser = await createUser.save();

      sendSuccess(res, `${userType} Created`, { [userType]: newUser._id }, 201);
    } catch (err) {
      Log.error(`GET /api/user/create  ${err}`);
      sendError(res, `Failed to create ${req.body.userType}`, {
        error: err.message
      });
    }
  }

  async addTraineeToGym() {
    // const { trainee, gym, joiningDate, endingDate } = req.body;
    try {
      const traineeGym = new models.GymTrainee(req.body);
      const newTraineeGym = traineeGym.save();
      if (newTraineeGym) {
        const gymTrainers = await models.GymTrainer.find({
          gym,
          isVerified: true
        }).populate("trainer");

        let trainers = [];
        gymTrainers.map(gt => {
          trainers.push(gt.trainer);
        });
        sendSuccess(
          res,
          `Trainee added to Gym`,
          { gymTraineeId: newTraineeGym._id, gymTrainers: trainers },
          201
        );
      }
    } catch (err) {
      Log.error(`POST /api/user/gym-trainee  ${err}`);
      sendError(res, `Failed to add trainee to Gym`, {
        error: err.message
      });
    }
  }

  async addTraineeToTrainer() {
    try {
      const traineeTrainer = new models.TrainerTrainee(req.body);
      const newTraineeTrainer = await traineeTrainer.save();
      if (newTraineeTrainer) {
        sendSuccess(
          res,
          `Trainer added to Trainee`,
          { traineeTrainerId: newTraineeTrainer._id },
          201
        );
      }
    } catch (err) {
      Log.error(`POST /api/user/trainee-trainer  ${err}`);
      sendError(res, `Failed to add trainer to trainee`, {
        error: err.message
      });
    }
  }

  async addTrainerToGym() {
    try {
      const gymTrainer = new models.GymTrainer(req.body);
      const newGymTrainer = await gymTrainer.save();
      if (newGymTrainer) {
        sendSuccess(
          res,
          `Trainer added to Gym`,
          { gymTrainerId: newGymTrainer._id },
          201
        );
      }
    } catch (err) {
      Log.error(`POST /api/user/gym-trainer  ${err}`);
      sendError(res, `Failed to add trainer to Gym`, {
        error: err.message
      });
    }
  }

  async addTraineeMeasurements() {}
}

module.exports = new UserController();
