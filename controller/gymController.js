import { sendSuccess, sendError } from "../lib/requestHandler";
import Log from "../lib/log";
import models from "../models";
import mongoose from "mongoose";

class GymController {
  constructor() {}

  async fetchGyms(req, res) {
    try {
      let searchKey = req.query.search;
      let city = req.query.city;
      let filterObject = { isDeleted: false };
      if (searchKey) {
        searchKey = searchKey.trim();
        filterObject.name = { $regex: searchKey, $options: "ig" };
      }
      if (city) {
        filterObject.city = city.trim();
      }

      const gyms = await models.Gym.find(filterObject)
        .select("-__v")
        .populate("user", "email");

      // let responseData = [];
      // await Promise.all(
      //   gyms.map(async gym => {
      //     let gymTrainers = await models.GymTrainer.find({
      //       gym: gym._id,
      //       isVerified: true
      //     }).populate("trainer");
      //     let trainers = [];
      //     gymTrainers.map(gt => {
      //       trainers.push(gt.trainer);
      //     });
      //     responseData.push = { gym, trainers };
      //   })
      // );

      sendSuccess(res, "fetched all gyms", { gyms }, 200);
    } catch (error) {
      Log.error(`Post /api/gym  ${error.message}`);
      sendError(res, "Failed to fetch gyms", { error: error.message });
    }
  }

  async fetchTrainers(req, res) {
    try {
      let searchKey = req.query.search;
      let searchObject = { isDeleted: false };
      if (searchKey) {
        searchKey = searchKey.trim();
        searchObject = {
          $or: [
            {
              firstName: { $regex: searchKey, $options: "ig" },
              lastName: { $regex: searchKey, $options: "ig" }
            }
          ]
        };
      }

      const trainers = await models.Trainer.find(searchObject)
        .select("-__v")
        .populate("user", "email");

      sendSuccess(res, "fetched all gyms", { trainers }, 200);
    } catch (error) {
      Log.error(`Post /api/trainer  ${error.message}`);
      sendError(res, "Failed to fetch trainers", { error: error.message });
    }
  }

  async addVideos(req, res) {
    try {
      const { videoUrl } = req.body;
      const youtubeId = videoUrl.split("?v=")[1].split("&")[0];
      const videoData = new models.Video(req.body);
      const newVideo = await videoData.save();
      if (newVideo) {
        const responseData = {
          _id: newVideo._id,
          thumnbailUrl: `https://img.youtube.com/vi/${youtubeId}/0.jpg`
        };
        sendSuccess(res, "New Video Added", responseData, 201);
      }
    } catch (error) {
      Log.error(`Post /api/gym/video  ${error.message}`);
      sendError(res, "Failed to add video", { error: error.message });
    }
  }

  async fetchVideos(req, res) {
    try {
      let { limit, page } = req.query;
      let skip;
      if (limit && page) {
        limit = parseInt(limit);
        page = parseInt(page);
        skip = limit * (page - 1);
      } else {
        limit = 0;
        skip = 0;
      }

      const { uploaderId, categoryId, subCategoryId } = req.body;
      let filterObject = {};
      if (uploaderId) {
        if (!mongoose.Types.ObjectId.isValid(uploaderId)) {
          throw new Error("Invalid userId");
        }
        filterObject.uploader = uploaderId;
      }
      if (categoryId && subCategoryId) {
        if (
          !(
            mongoose.Types.ObjectId.isValid(categoryId) &&
            mongoose.Types.ObjectId.isValid(subCategoryId)
          )
        ) {
          throw new Error("Invalid categoryId or subCategoryId");
        }
        filterObject.videoCategory = categoryId;
        filterObject.videoSubCategory = videoSubCategoryId;
      } else if (categoryId) {
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
          throw new Error("Invalid categoryId");
        }
        filterObject.videoCategory = categoryId;
      } else if (subCategoryId) {
        if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
          throw new Error("Invalid subCategoryId");
        }
        filterObject.videoSubCategory = subCategoryId;
      }

      const videos = await models.Video.find(filterObject)
        .select("-__v")
        .limit(limit)
        .skip(skip)
        .populate(
          "uploader",
          "-password -isEmailVerified -isDeleted -createdAt -updatedAt -__v"
        )
        .populate("videoCategory")
        .populate("videoSubCategory");

      const responseData = [];
      if (videos.length) {
        videos.map(video => {
          const youtubeId = video.videoUrl.split("?v=")[1];
          const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
          responseData.push({ video, thumbnailUrl });
        });
      }
      sendSuccess(res, "fetched Videos", responseData, 200);
    } catch (error) {
      Log.error(`get /api/gym/video  ${error.message}`);
      sendError(res, "Failed to fetch videos", { error: error.message });
    }
  }

  async fetchQuotes(req, res) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 1;
      const quotes = await models.Quotes.aggregate([
        { $sample: { size: limit } }
      ]);

      sendSuccess(res, "Fetched Quotes", quotes, 200);
    } catch (err) {
      Log.error(`get /api/gym/quotes  ${error.message}`);
      sendError(res, "Failed to fetch Quotes", { error: error.message });
    }
  }

  async createQuotes(req, res) {
    try {
      const quotes = new models.Quotes(req.body);
      const newQuotes = await quotes.save();
      if (newQuotes) {
        const responseData = {
          _id: newQuotes._id
        };
        sendSuccess(res, "New Quotes Added", responseData, 201);
      }
    } catch (err) {
      Log.error(`post /api/gym/quotes  ${error.message}`);
      sendError(res, "Failed to add quotes", { error: error.message });
    }
  }

  async addTraineeMeasurements(req, res) {
    try {
      console.log(req.body);
      const measurements = new models.TraineeMeasurement(req.body);
      const newMeasurement = await measurements.save();
      sendSuccess(res, "Trainee's measurements added", newMeasurement, 201);
    } catch (err) {
      Log.error(`post /api/gym/trainee-measurement  ${error.message}`);
      sendError(res, "Failed to add measurements", { error: error.message });
    }
  }

  async fetchCities(req, res) {
    try {
      const cities = await models.City.find();
      sendSuccess(res, "fetched cities", { cities }, 201);
    } catch (error) {
      Log.error(`get /api/gym/fetch-city  ${error.message}`);
      sendError(res, "Failed to fetch cities", { error: error.message });
    }
  }
}

module.exports = new GymController();
