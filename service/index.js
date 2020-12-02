const models = require("../models");
const Trainee = models.Trainee;
const Trainer = models.Trainer;
const Gym = models.Gym;
const Store = models.Store;

module.exports = {
  findUserByEmail: async email => {
    try {
      const user = await models.User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  },

  createTrainee: async (traineeObject, t) => {
    try {
      const newTrainee = await Trainee.create(traineeObject, {
        transaction: t
      });
      if (newTrainee) {
        return newTrainee;
      }
    } catch (error) {
      throw error;
    }
  },
  createTrainer: async (trainerObject, t) => {
    try {
      const newTrainer = await Trainer.create(trainerObject, {
        transaction: t
      });
      if (newTrainer) {
        return newTrainer;
      }
    } catch (error) {
      throw error;
    }
  },
  createGym: async (gymObject, t) => {
    try {
      const newGym = await Gym.create(gymObject, { transaction: t });
      if (newGym) {
        return newGym;
      }
    } catch (error) {
      throw error;
    }
  },
  createStore: async (storeObject, t) => {
    try {
      const newStore = await Store.create(storeObject, { transaction: t });
      if (newStore) {
        return newStore;
      }
    } catch (error) {
      throw error;
    }
  }
};
