import express from "express";
import path from "path";
import bodyParser from "body-parser";
// import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./lib/config";
import Log from "./lib/log";
import router from "./router";

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8088;
    this.initDB();
    this.initExpressMiddleware();
    this.initRoutes();
    this.start();
  }

  async initDB() {
    //init Database
    // const { DBNAME, DBHOST, DBUSER, DBPASS } = config;
    // const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
    //   host: DBHOST,
    //   dialect: "mysql"
    // });
    // try {
    //   await sequelize.authenticate();
    //   console.log("DB connection has been established successfully.");
    // } catch (error) {
    //   Log.error("DB connection failed");
    //   console.error("Unable to connect to the database:", error);
    // }
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 30000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      useUnifiedTopology: true
    };

    mongoose.connect(config.MONGODB_CONNECTION_URL, options).then(
      () => {
        Log.info("DB is ready");
      },
      err => {
        Log.error("DB is not ready yet, check connection", err.message);
      }
    );
  }

  initExpressMiddleware() {
    this.app.use(morgan("dev"));
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    this.app.use(bodyParser.json());
    // this.app.use(cors());
    // this.app.use(express.static(path.join(__dirname, "public")));
    // this.app.set("view engine", "ejs");
  }

  initRoutes() {
    this.app.get("/", (req, res, next) => {
      res.status(200).json({
        App: "Gym Hub",
        message: "Booted up"
      });
    });

    this.app.use("/api", router);

    //undefined routes
    this.app.use((req, res, next) => {
      let err = new Error("Resource Not Found");
      err.status = 400;
      next(err);
    });

    //internal server error handling
    this.app.use((err, req, res, next) => {
      let status = err.status || 500;
      let error = {
        message: err.message
      };
      // console.log(error);
      Log.error(error);
      res.status(status).json(error);
    });
    true;
  }

  start() {
    this.app.listen(this.port, () =>
      Log.info(`GymHub is ready to go on ${this.port}...`)
    );
    this.app.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
        status: "fail",
        error: error.message
      });
    });
  }
}

new App();
