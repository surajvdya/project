const router = require("express").Router();
const userRouter = require("./user");
const superAdminRouter = require("./superAdmin");
const gymRouter = require("./gymRouter");

router.use("/user", userRouter);
router.use("/superadmin", superAdminRouter);
router.use("/gym", gymRouter);

module.exports = router;
