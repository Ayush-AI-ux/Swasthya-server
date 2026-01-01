// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";

// import authRoutes from "./routes/authRoutes.js";
// import diseaseRoutes from "./routes/diseaseRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import visitorRoutes from "./routes/visitorRoutes.js";
// import medicalFactRoutes from "./routes/medicalFactRoutes.js";

// dotenv.config();

// const app = express();

// /* ================== MIDDLEWARE ================== */
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       /\.vercel\.app$/   // allow all Vercel domains
//     ],
//     credentials: true
//   })
// );

// app.use(express.json());

// /* ================== HEALTH CHECK ================== */
// app.get("/", (req, res) => {
//   res.send("Swasthya API is running 🚀");
// });

// /* ================== ROUTES ================== */
// app.use("/api/auth", authRoutes);
// app.use("/api/diseases", diseaseRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/visitors", visitorRoutes);
// app.use("/api/medical-facts", medicalFactRoutes);

// /* ================== DATABASE ================== */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Atlas connected"))
//   .catch((err) => console.log("MongoDB error:", err));

// /* ================== SERVER ================== */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import medicalFactRoutes from "./routes/medicalFactRoutes.js";

dotenv.config();

const app = express();

/* ================== MIDDLEWARE ================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      /\.vercel\.app$/,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ================== HEALTH CHECK ================== */
app.get("/", (req, res) => {
  res.send("Swasthya API is running 🚀");
});

/* ================== ROUTES ================== */
app.use("/api/auth", authRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/medical-facts", medicalFactRoutes);

/* ================== DATABASE ================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.log("MongoDB error:", err));

/* ================== SERVER ================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
