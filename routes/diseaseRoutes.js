import express from "express";
import Disease from "../models/Disease.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =========================================================
   GET ALL DISEASES (USER + ADMIN)
   ========================================================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch diseases" });
  }
});

/* =========================================================
   GET DISEASES BY ORGAN SYSTEM (USER + ADMIN) ✅ Step 8.2
   ========================================================= */
router.get("/organ/:organ", authMiddleware, async (req, res) => {
  try {
    const diseases = await Disease.find({
      organSystem: req.params.organ, // ✅ FIXED
    });
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch diseases" });
  }
});

/* =========================================================
   ADD DISEASE (ADMIN ONLY)
   ========================================================= */
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const disease = await Disease.create(req.body);
      res.status(201).json(disease);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

/* =========================================================
   GET SINGLE DISEASE BY ID (USER + ADMIN)
   ========================================================= */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);

    if (!disease) {
      return res.status(404).json({ message: "Disease not found" });
    }

    res.json(disease);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch disease" });
  }
});

/* =========================================================
   UPDATE DISEASE (ADMIN ONLY) ✅ Step 8.3
   ========================================================= */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const updatedDisease = await Disease.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(updatedDisease);
    } catch (error) {
      res.status(500).json({ message: "Failed to update disease" });
    }
  }
);

/* =========================================================
   DELETE DISEASE (ADMIN ONLY) ✅ Step 8.3
   ========================================================= */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      await Disease.findByIdAndDelete(req.params.id);
      res.json({ message: "Disease deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete disease" });
    }
  }
);

export default router;
