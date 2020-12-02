"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("videos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      status: Sequelize.STRING,
      videoUrl: { type: Sequelize.STRING, allowNull: false },
      uploadedBy: { type: Sequelize.STRING, allowNull: false },
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
      categoryId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: {
        //     tableName: "workout-categories"
        //   },
        //   key: "id"
        // },
        allowNull: false
      },
      views: Sequelize.INTEGER,
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
    return queryInterface.dropTable("videos");
  }
};
