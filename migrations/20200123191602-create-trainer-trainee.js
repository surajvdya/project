"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("trainer-trainees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trainerId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "trainers"
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
      startDate: { type: Sequelize.DATE },
      endDate: { type: Sequelize.DATE },
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
    return queryInterface.dropTable("trainer-trainees");
  }
};
