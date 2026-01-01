import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);
