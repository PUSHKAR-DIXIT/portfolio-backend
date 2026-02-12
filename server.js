require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Static folder (uploads)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB ERROR:", err.message));

// Routes
app.use("/api/profile", require("./routes/profile"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/certificates", require("./routes/certificate"));

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
