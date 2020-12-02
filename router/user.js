import express, { request } from "express";
const router = express.Router();
import userController from "../controller/user";
import {
  checkValidationRules,
  checkUserTypeValidation,
  validate
} from "../middleware/validation";

router.get("/", (req, res) => {
  res.send("Hello User");
});

router.post(
  "/login",
  checkValidationRules("userLogin"),
  validate,
  userController.loginUser
);

router.post(
  "/register",
  checkValidationRules("userRegister"),
  validate,
  userController.registerUser
);

router.get("/verify-email/:code", userController.verifyUserEmail);

// router.post(
//   "/create-trainee",
//   checkValidationRules("trainee"),
//   validate,
//   userController.createTrainee
// );
router.post(
  "/create",
  checkUserTypeValidation,
  validate,
  userController.createUser
);
// router.post(
//   "/create-gym",
//   checkValidationRules("gym"),
//   validate,
//   userController.createGym
// );
// router.post(
//   "/create-store",
//   checkValidationRules("store"),
//   validate,
//   userController.createStore
// );

router.post(
  "/trainee-gym",
  checkValidationRules("gymTrainee"),
  validate,
  userController.addTraineeToGym
);

router.post("/trainee-trainer", userController.addTraineeToTrainer);

router.post("/trainer-gym", userController.addTrainerToGym);

module.exports = router;
