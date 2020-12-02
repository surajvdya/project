"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("trainee-measurements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      height: Sequelize.STRING,
      weight: Sequelize.STRING,
      chest: Sequelize.STRING,
      arms: Sequelize.STRING,
      waist: Sequelize.STRING,
      shoulder: Sequelize.STRING,
      neck: Sequelize.STRING,
      forearms: Sequelize.STRING,
      hip: Sequelize.STRING,
      thigh: Sequelize.STRING,
      calves: Sequelize.STRING,
      weightPlan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isIn: {
            args: [["weight loss", "weight gain"]],
            msg: "Must be weight loss or weight gain"
          }
        }
      },
      targetWeight: Sequelize.STRING,
      traineeId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("trainee-measurements");
  }
};
