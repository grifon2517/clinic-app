import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Operator } from "../models/Operator.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email и пароль обязательны" });
    }

    const operator = await Operator.findOne({ email });

    if (!operator) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, operator.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const token = jwt.sign(
      { id: operator._id, email: operator.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.json({ token });
  } catch {
    return res.status(500).json({ message: "Ошибка авторизации" });
  }
};
