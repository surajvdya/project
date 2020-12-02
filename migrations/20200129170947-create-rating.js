"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ratings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: Sequelize.STRING,
      text: Sequelize.STRING,
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: { max: 5, min: 0 }
      },
      ratedBy: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["trainee", "trainer"]],
            msg: "Must be trainee or trainer"
          }
        }
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
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
        },
        allowNull: false
      },
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
    return queryInterface.dropTable("ratings");
  }
};
