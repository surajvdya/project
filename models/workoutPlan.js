import mongoose, { Schema } from "mongoose";

const workoutPlanSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    goal: { type: String, required: true },
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
    uploadedBy: { type: String, required: true, enum: ["gym", "trainer"] },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutCategory",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
