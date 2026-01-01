import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organSystem: {
      type: String,
      required: true,
    },
    description: String,
    etiology: String,
    pathophysiology: String,
    clinicalFeatures: String,
    diagnosis: String,
    treatment: String,
    complications: String,
    prognosis: String,
  },
  { timestamps: true }
);

export default mongoose.model("Disease", diseaseSchema);

