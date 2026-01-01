import express from "express";
import MedicalFact from "../models/MedicalFact.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * ADMIN: Add medical fact
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const fact = new MedicalFact(req.body);
      await fact.save();
      res.status(201).json(fact);
    } catch (err) {
      res.status(500).json({ message: "Failed to add medical fact" });
    }
  }
);

/**
 * ADMIN: Update medical fact
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const updated = await MedicalFact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Update failed" });
    }
  }
);

/**
 * ADMIN: Delete medical fact
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      await MedicalFact.findByIdAndDelete(req.params.id);
      res.json({ message: "Medical fact deleted" });
    } catch (err) {
      res.status(500).json({ message: "Delete failed" });
    }
  }
);

/**
 * USER: Get medical facts
 */
router.get("/", authMiddleware, async (req, res) => {
  const facts = await MedicalFact.find().sort({ createdAt: -1 });
  res.json(facts);
});

export default router;
