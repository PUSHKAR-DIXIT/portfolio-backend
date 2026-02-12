const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// get profile
router.get("/", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

module.exports = router;
