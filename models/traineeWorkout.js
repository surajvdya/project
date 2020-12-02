import mongoose, { Schema } from "mongoose";

const traineeWorkoutSchema = new Schema(
  {
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee",
      required: true
    },
    workout: {
      day: {
        one: [
          {
            category: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "WorkoutCategory"
            },
            subCategory: [
              {
                subCategoryId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "WorkoutsubCategory"
                },
                set: [
                  {
                    name: { type: String },
                    weight: { type: Number },
                    count: { type: Number },
                    interval: { type: Number }
                  }
                ]
              }
            ]
          }
        ],
        two: [
          {
            category: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "WorkoutCategory"
            },
            subCategory: [
              {
                subCategoryId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "WorkoutsubCategory"
                },
                set: [
                  {
                    name: { type: String },
                    weight: { type: Number },
                    count: { type: Number },
                    interval: { type: Number }
                  }
                ]
              }
            ]
          }
        ],
        three: [
          {
            category: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "WorkoutCategory"
            },
            subCategory: [
              {
                subCategoryId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "WorkoutsubCategory"
                },
                set: [
                  {
                    name: { type: String },
                    weight: { type: Number },
                    count: { type: Number },
                    interval: { type: Number }
                  }
                ]
              }
            ]
          }
        ],
        four: [
          {
            category: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "WorkoutCategory"
            },
            subCategory: [
              {
                subCategoryId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "WorkoutsubCategory"
                },
                set: [
                  {
                    name: { type: String },
                    weight: { type: Number },
                    count: { type: Number },
                    interval: { type: Number }
                  }
                ]
              }
            ]
          }
        ],
        five: [
          {
            category: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "WorkoutCategory"
            },
            subCategory: [
              {
                subCategoryId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "WorkoutsubCategory"
                },
                set: [
                  {
                    name: { type: String },
                    weight: { type: Number },
                    count: { type: Number },
                    interval: { type: Number }
                  }
                ]
              }
            ]
          }
        ],
        six: [
          {
            category: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "WorkoutCategory"
            },
            subCategory: [
              {
                subCategoryId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "WorkoutsubCategory"
                },
                set: [
                  {
                    name: { type: String },
                    weight: { type: Number },
                    count: { type: Number },
                    interval: { type: Number }
                  }
                ]
              }
            ]
          }
        ],
        seven: [
          {
            category: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "WorkoutCategory"
            },
            subCategory: [
              {
                subCategoryId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "WorkoutsubCategory"
                },
                set: [
                  {
                    name: { type: String },
                    weight: { type: Number },
                    count: { type: Number },
                    interval: { type: Number }
                  }
                ]
              }
            ]
          }
        ]
      },
      ownWorkout: { type: Boolean, default: false },
      existingWorkout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkoutPlan",
        required: true
      },
      isVerified: { type: Boolean, default: false } //trainer or gym should verify trainee for workout plan
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TraineeWorkout", traineeWorkoutSchema);
