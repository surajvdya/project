let models = require("./models");
let test = async function(sequelize, Sequelize) {
  try {
    await sequelize.authenticate();
    console.log("db sync started");
    await sequelize.sync();
    console.log("db sync finished");
    return;
  } catch (error) {
    console.log("error", error);
  }
};

test(models.sequelize, models.sequelize);
