"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("gym-trainers", {
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
      startDate: { type: Sequelize.DATE },
      endDate: { type: Sequelize.DATE },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: false },
      currentStatus: { type: Sequelize.BOOLEAN, defaultValue: false },
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
    return queryInterface.dropTable("gym-trainers");
  }
};
