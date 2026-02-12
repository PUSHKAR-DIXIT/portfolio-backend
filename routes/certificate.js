const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

// ===== Schema =====
const certificateSchema = new mongoose.Schema({
  title: String,
  image: String,
});

const Certificate = mongoose.model("Certificate", certificateSchema);

// ===== Multer Setup =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ===== GET Certificates =====
router.get("/", async (req, res) => {
  try {
    const certs = await Certificate.find();
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== POST Certificate =====
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newCert = new Certificate({
      title: req.body.title,
      image: `public/uploads/${req.file.filename}`,
    });

    await newCert.save();
    res.json(newCert);
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
