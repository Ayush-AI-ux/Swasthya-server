import mongoose from "mongoose";

const medicalFactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("MedicalFact", medicalFactSchema);
