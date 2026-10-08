const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    recordId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    ownerId: {
      type: String,
      required: true
    },

    accessLevel: {
      type: String,
      enum: ["full", "limited"],
      default: "limited"
    },

    status: {
      type: String,
      enum: ["active", "pending", "archived"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Record", recordSchema);