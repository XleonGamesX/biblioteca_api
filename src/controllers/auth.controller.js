import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select("+password");

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    user.password = undefined;

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};