import express from "express";
const router = express.Router();
import superAdminController from "../controller/superadmin";
import validation from "../middleware/validation";
router.get("/", (req, res) => {
  res.send("Hello SuperAdmin");
});

router.post("/login", superAdminController.superAdminLogin);

router.post(
  "/register",
  // validation.checkValidationRules("userRegister"),
  // validation.validate,
  superAdminController.superAdminRegister
);

router.post(
  "/add-city",
  validation.checkValidationRules("city"),
  validation.validate,
  superAdminController.addCity
);

module.exports = router;
