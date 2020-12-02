"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("gym-trainees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gymId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "gyms"
          },
          key: "id"
        },
        allowNull: false
      },
      traineeId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "trainees"
          },
          key: "id"
        },
        allowNull: false
      },
      currentStatus: { type: Sequelize.BOOLEAN, defaultValue: true },
      joiningDate: { type: Sequelize.DATE },
      endingDate: { type: Sequelize.DATE },
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
    return queryInterface.dropTable("gym-trainees");
  }
};
