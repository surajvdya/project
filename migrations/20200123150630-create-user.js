"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Please enter your email"
          },
          isEmail: {
            args: true,
            msg: "Invalid Email"
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // allowNull defaults to true
        validate: {
          notNull: {
            msg: "Please enter your Password"
          },
          max: {
            args: 32,
            msg: "Password should be at most 32 character long"
          },
          min: {
            args: 6,
            msg: "Password should be at least 6 character long"
          }
        }
      },
      userType: {
        type: Sequelize.STRING,
        validate: {
          isIn: {
            args: [["trainee", "trainer", "gym", "superadmin"]],
            msg: "Must be trainee or trainer or gym or superadmin"
          }
        }
      },
      lastOnline: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable("users");
  }
};
