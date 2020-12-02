import express from "express";
const router = express.Router();
import gymController from "../controller/gymController";
import { checkValidationRules, validate } from "../middleware/validation";

router.get("/", (req, res) => {
  res.send("Hello Gym");
});

router.get("/fetch-gym", gymController.fetchGyms);

router.get("/fetch-trainer", gymController.fetchTrainers);

router.post(
  "/videos",
  checkValidationRules("videos"),
  validate,
  gymController.addVideos
);

router.get("/videos", gymController.fetchVideos);

router.post(
  "/quotes",
  checkValidationRules("quotes"),
  validate,
  gymController.createQuotes
);

router.get("/quotes", gymController.fetchQuotes);

router.post(
  "/trainee-measurements",
  checkValidationRules("traineeMeasurements"),
  validate,
  gymController.addTraineeMeasurements
);

router.get("/fetch-city", gymController.fetchCities);

module.exports = router;
