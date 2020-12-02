import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendSuccess, sendError } from "../lib/requestHandler";

import Log from "../lib/log";
import config from "../lib/config";
import models from "../models";
const sequelize = models.sequelize;

class SuperAdminController {
  constructor() {}

  async superAdminLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User Not Found");
      }
      let isAuthenticated = await bcrypt.compare(password, user.password);
      if (!isAuthenticated) {
        throw new Error(
          "Authentication failed, please check your email and password"
        );
      }

      const userData = await models.User.findOne({
        where: { id: user.id },
        include: { model: models.SuperAdmin, as: "superadmin" }
      });
      if (!userData.superadmin) {
        throw new Error("You are not registered as SuperAdmin");
      }
      const { id, firstName, lastName } = userData.superadmin;
      const tokenData = {
        superAdminId: id,
        firstName,
        lastName,
        email
      };

      let token = jwt.sign({ data: tokenData }, config.JWT_SECRET_KEY, {
        expiresIn: config.TOKEN_EXPIRES_IN
      });
      console.log({ token });
      sendSuccess(res, `SuperAdmin Logged In`, { token });
    } catch (error) {
      Log.error(`Post /api/superadmin/login  ${error}`);
      sendError(res, "superadmin login failed", { error: error.message });
    }
  }

  async superAdminRegister(req, res) {
    const t = await sequelize.transaction();
    try {
      const { email, password } = req.body;
      let userData = { email, password, userType: "superadmin" };
      delete req.body.email;
      delete req.body.password;

      const newUser = await models.User.create(userData, { transaction: t });
      if (newUser) {
        // req.body.userId = newUser.id;
        let superAdmin = await newUser.setSuperAdmins(req.body, {
          transaction: t
        });

        // const newTrainee = await createTrainee(req.body, t);
        await t.commit();
        sendSuccess(
          res,
          "SuperAdmin Registered",
          {
            superAdmin: { id: superAdmin.id }
          },
          201
        );
      }
    } catch (error) {
      await t.rollback();
      Log.error(`Post /api/superadmin/register  ${error}`);
      sendError(res, "superAdmin registration failed", {
        error: error.message
      });
    }
  }

  async addCity() {
    try {
      console.log(req.body);
      const city = new models.City(req.body);
      const newCity = await city.save();
      if (newCity) {
        sendSuccess(res, "new city created", { _id: newCity.id }, 201);
      }
    } catch (error) {
      Log.error(`Post /api/superadmin/add-city  ${error}`);
      sendError(res, "Failed to add new city", {
        error: error.message
      });
    }
  }
}

module.exports = new SuperAdminController();
