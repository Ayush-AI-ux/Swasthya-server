// import express from "express";
// import nodemailer from "nodemailer";

// const router = express.Router();

// router.post("/send-query", async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({
//       success: false,
//       message: "All fields are required",
//     });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Website Support" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: "New Contact Us Query",
//       html: `
//         <h3>New Query Received</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Message:</b><br/>${message}</p>
//       `,
//     });

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Mail error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//     });
//   }
// });

// export default router;


// import express from "express";
// import nodemailer from "nodemailer";

// const router = express.Router();

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: { rejectUnauthorized: false },
// });

// router.post("/send-query", async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ success: false, message: "All fields are required" });
//   }

//   try {
//     await transporter.sendMail({
//       from: `"Swasthya Support" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: "New Contact Us Query",
//       html: `
//         <h3>New Query Received</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Message:</b><br/>${message}</p>
//       `,
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Mail error:", error);
//     res.status(500).json({ success: false, message: "Failed to send email" });
//   }
// });

// export default router;

import express from "express";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send-query", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    await resend.emails.send({
      from: "Website Support <onboarding@resend.dev>", // SAME as EMAIL_USER
      to: ["swasthya.medical.akansh@gmail.com"],
      replyTo: email, // ⭐ improvement over nodemailer
      subject: "New Contact Us Query",
      html: `
        <h3>New Query Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

export default router;
;


