const router = require("express").Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, message: "Message saved" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
