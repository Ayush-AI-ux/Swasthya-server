import express from "express";
import Visitor from "../models/Visitor.js";

const router = express.Router();

/* ================= ADD / COUNT VISITOR ================= */
router.post("/", async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";

    const alreadyVisited = await Visitor.findOne({ ip });

    if (!alreadyVisited) {
      await Visitor.create({ ip });
    }

    const count = await Visitor.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Visitor tracking failed" });
  }
});

/* ================= GET TOTAL VISITORS ================= */
router.get("/", async (req, res) => {
  try {
    const count = await Visitor.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch visitors" });
  }
});

/* ✅ THIS LINE WAS MISSING / WRONG BEFORE */
export default router;
