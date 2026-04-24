import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Operator } from "../models/Operator.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.OPERATOR_EMAIL;
    const rawPassword = process.env.OPERATOR_PASSWORD;

    if (!email || !rawPassword) {
      throw new Error("Укажите OPERATOR_EMAIL и OPERATOR_PASSWORD в .env");
    }

    const exists = await Operator.findOne({ email });
    if (exists) {
      console.log("Оператор уже существует");
      process.exit(0);
    }

    const password = await bcrypt.hash(rawPassword, 10);

    await Operator.create({ email, password });
    console.log("Оператор создан");
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

run();
