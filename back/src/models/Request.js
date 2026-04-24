import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    problem: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

export const Request = mongoose.model("Request", requestSchema);
