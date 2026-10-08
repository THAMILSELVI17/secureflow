const express = require("express");

const {
  getRecords,
  getRecord
} = require("../controllers/recordController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getRecords);

router.get("/:id", protect, getRecord);

module.exports = router;