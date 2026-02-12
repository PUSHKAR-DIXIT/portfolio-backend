const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

/* ============================= */
/*   MONGOOSE MODEL              */
/* ============================= */

const certificateSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
  },
  { collection: "certificates" }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

/* ============================= */
/*   MULTER STORAGE              */
/* ============================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ============================= */
/*   ROUTES                      */
/* ============================= */

// GET all certificates
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upload certificate
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newCert = new Certificate({
      title: req.body.title,
      image: `public/uploads/${req.file.filename}`, // 🔥 important
    });

    await newCert.save();
    res.json(newCert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

