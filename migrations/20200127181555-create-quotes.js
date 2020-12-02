"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("quotes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.STRING },
      imageUrl: { type: Sequelize.STRING },
      uploadedBy: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["gymOwner", "trainer", "superadmin"]],
            msg: "Must be gymOwner or trainer or superadmin"
          }
        }
      },
      uploaderId: {
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
    return queryInterface.dropTable("quotes");
  }
};
