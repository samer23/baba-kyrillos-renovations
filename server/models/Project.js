import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    progress: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Project", projectSchema)