import { Request } from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const { fullName, phone, problem = "" } = req.body;

    if (!fullName?.trim()) {
      return res.status(400).json({ message: "ФИО обязательно" });
    }

    const digits = phone?.replace(/\D/g, "") || "";
    if (!digits || digits.length !== 11) {
      return res.status(400).json({ message: "Телефон заполнен некорректно" });
    }

    const request = await Request.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      problem: problem.trim(),
    });

    return res.status(201).json({ request });
  } catch {
    return res.status(500).json({ message: "Не удалось создать заявку" });
  }
};

export const getRequests = async (_req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    return res.json({ requests });
  } catch {
    return res.status(500).json({ message: "Не удалось получить заявки" });
  }
};
