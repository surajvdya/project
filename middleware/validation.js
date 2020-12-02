import { check, param, body, validationResult } from "express-validator";
import { findUserByEmail } from "../service";
import moment from "moment";

function checkValidationRules(method) {
  switch (method) {
    case "userLogin": {
      return [
        check("email")
          .exists({ checkFalsy: true })
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Invalid Email"),
        check("password")
          .exists({ checkFalsy: true })
          .withMessage("password is required"),
        check("userType")
          .exists({ checkFalsy: true })
          .withMessage("userType is required")
          .isString()
          .withMessage("userType must be String")
          .isIn(["gym", "trainer", "trainee", "store"])
          .withMessage(
            "userType must be one of gym or trainer or trainee or store"
          )
      ];
    }
    case "userRegister": {
      return [
        emailCheck("email"),
        check("password")
          .exists({ checkNull: true })
          .withMessage("password is required")
          .notEmpty()
          .isAlphanumeric()
          .isLength({
            min: 6,
            max: 32
          })
          .withMessage(
            "Password must contain at least 6 and at most 32 characters"
          ),
        check("passwordConfirmation")
          .exists({ checkNull: true })
          .withMessage("passwordConfirmation is required")
          .notEmpty()
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error("Password confirmation does not match password");
            }
            // Indicates the success of this synchronous custom validator
            return true;
          }),
        check("userType")
          .exists({ checkFalsy: true })
          .withMessage("userType is required")
          .isString()
          .withMessage("must be String")
          .isIn(["gym", "trainer", "trainee", "store"])
          .withMessage("must be one of gym or trainer or trainee or store")
      ];
    }
    case "trainee": {
      console.log("inside validation");
      return [
        checkName("firstName", "First Name trainee"),
        checkName("lastName", "Last Name"),
        check("imageUrl")
          .optional()
          .isString()
          .withMessage("Image Url should be string value"),
        check("gender")
          .exists({ checkFalsy: true })
          .withMessage("gender is required")
          .isString()
          .withMessage("gender should be string value"),
        check("dateOfBirth")
          .exists({ checkFalsy: true })
          .withMessage("Date of Birth is required"),
        check("phoneNumber")
          .exists({ checkFalsy: true })
          .withMessage("Phone Number is required")
          .isNumeric()
          .withMessage("Phone Number should be numeric value"),
        check("city")
          .optional()
          .isString()
          .withMessage("city shoud be string value"),
        check("location")
          .optional()
          .isString()
          .withMessage("location should be string value"),
        check("user")
          .exists({ checkFalsy: true })
          .withMessage("user Id is required")
          .isMongoId()
          .withMessage("Invalid Id")
      ];
    }
    case "trainer": {
      console.log("inside trainer");
      return [
        checkName("firstName", "First Name trainer"),
        checkName("lastName", "Last Name"),
        check("imageUrl")
          .optional()
          .isString()
          .withMessage("only string value trainer"),
        check("gender")
          .optional()
          .isString()
          .withMessage("only string value"),
        check("dateOfBirth").optional(),
        check("phoneNumber")
          .optional()
          .isNumeric()
          .withMessage("only numeric value"),
        check("city")
          .optional()
          .isString()
          .withMessage("only string value"),
        check("location")
          .optional()
          .isString()
          .withMessage("only string value"),
        check("user")
          .exists({ checkFalsy: true })
          .withMessage("user Id is required")
          .isMongoId()
          .withMessage("Invalid Id")
      ];
    }
    case "videos": {
      return [
        checkName("name", "Name"),
        check("status")
          .optional()
          .isString("status:only string value"),
        check("videoUrl")
          .exists({ checkFalsy: true })
          .withMessage("videoUrl is required")
          .isString()
          .custom((value, { req }) => {
            const hostname = new URL(value).host;
            if (!hostname.includes("youtube")) {
              throw new Error("Video must be the youtube video");
            }
            // Indicates the success of this synchronous custom validator
            return true;
          }),
        check("uploadedBy")
          .exists({ checkFalsy: true })
          .withMessage("uploadedBy is required")
          .isIn(["gym", "trainer", "superadmin"])
          .withMessage("only gym, trainer or superadmin can upload video"),
        check("uploader")
          .exists({ checkFalsy: true })
          .withMessage("uploader(userId) is required")
          .isMongoId()
          .withMessage("Invalid Id"),
        check("videoCategory")
          .exists({ checkFalsy: true })
          .withMessage("category(workout categoryId) is required")
          .isMongoId()
          .withMessage("Invalid Id")
      ];
    }

    case "quotes": {
      return [
        checkName("name", "Name"),
        check("status")
          .optional()
          .isString("status:only string value"),
        check("imageUrl")
          .exists({ checkFalsy: true })
          .withMessage("imageUrl is required")
          .isString()
          .withMessage("imageUrl:only string value"),
        check("uploadedBy")
          .exists({ checkFalsy: true })
          .withMessage("uploadedBy is required")
          .isIn(["gym", "trainer", "superadmin"])
          .withMessage("only gym, trainer or superadmin can upload video"),
        check("uploader")
          .exists({ checkFalsy: true })
          .withMessage("uploader(userId) is required")
          .isMongoId()
          .withMessage("Invalid Id")
      ];
    }
    case "city": {
      return [
        checkName("name", "Name"),
        check("imageUrl")
          .exists({ checkFalsy: true })
          .withMessage("imageUrl is required")
          .isString()
          .withMessage("imageUrl:only string value")
      ];
    }

    case "traineeMeasurements": {
      return [
        check("height")
          .optional()
          .isString()
          .withMessage("height should be string value"),
        check("weight")
          .optional()
          .isString()
          .withMessage("weight should be string value"),
        check("chest")
          .optional()
          .isString()
          .withMessage("chest should be string value"),
        check("arms")
          .optional()
          .isString()
          .withMessage("arms should be string value"),
        check("waist")
          .optional()
          .isString()
          .withMessage("waist should be string value"),
        check("shoulder")
          .optional()
          .isString()
          .withMessage("shoulder should be string value"),
        check("neck")
          .optional()
          .isString()
          .withMessage("neck should be string value"),
        check("forearms")
          .optional()
          .isString()
          .withMessage("forearms should be string value"),
        check("hip")
          .optional()
          .isString()
          .withMessage("hip should be string value"),
        check("thigh")
          .optional()
          .isString()
          .withMessage("thigh should be string value"),
        check("calves")
          .optional()
          .isString()
          .withMessage("calves should be string value"),
        check("weightPlan")
          .optional()
          .isIn(["weight loss", "weight gain"])
          .withMessage("weightPlan only includes loss and gain value"),
        check("targetWeight")
          .optional()
          .isString(),
        check("trainee")
          .exists({ checkFalsy: true })
          .withMessage("trainee(Id) is required")
          .isMongoId()
          .withMessage("Invalid trainee Id")
      ];
    }

    case "gymTrainee": {
      return [
        check("gym")
          .exists({ checkFalsy: true })
          .withMessage("gym(Id) is required")
          .isMongoId()
          .withMessage("Invalid Id"),
        check("trainee")
          .exists({ checkFalsy: true })
          .withMessage("trainee(Id) is required")
          .isMongoId()
          .withMessage("Invalid Id"),
        check("currentStatus")
          .optional()
          .isBoolean("currentStatus:only Boolean value"),
        check("isVerified")
          .optional()
          .isBoolean("isVerified:only Boolean value"),
        check("joiningDate")
          .exists({ checkFalsy: true })
          .withMessage("joiningDate is required")
          .custom(value => {
            if (!moment(new Date(value)).isValid())
              return Promise.reject("invalid date");
            return true;
          }),
        check("endingDate")
          .exists({ checkFalsy: true })
          .withMessage("joiningDate is required")
          .custom(value => {
            if (!moment(new Date(value)).isValid())
              return Promise.reject("invalid date");
            return true;
          })
      ];
    }
  }
}

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const error = errors.array()[0].msg;
  let err = new Error(error);
  err.status = 400;
  next(err);
}

function checkName(name, value) {
  return check(name)
    .exists({ checkFalsy: true })
    .withMessage(`${value} is required`)
    .isString()
    .withMessage(`${value} must be a string value`);
}
function emailCheck(name) {
  return check(name)
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(value => {
      return findUserByEmail(value).then(user => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
        return true;
      });
    });
}

function passwordCheck(name) {
  return check(name)
    .exists({ checkNull: true })
    .withMessage("password is required")
    .notEmpty()
    .isAlphanumeric()
    .isLength({
      min: 4,
      max: 20
    })
    .withMessage("Password must contain at least 4 and at most 20 characters");
  // .custom(() => {
  //   if (req.body.password === req.body.confirmPassword) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // })
  // .withMessage("Passwords don't match.");
}

function checkUserTypeValidation(req, res, next) {
  const userType = req.body.userType;
  console.log("userType middleware", userType);
  checkValidationRules(userType);
  next();
}

module.exports = {
  checkValidationRules,
  checkUserTypeValidation,
  validate
};
