const express = require("express");
const { summarize, explain } = require("../controllers/toolController");
const { protect } = require("../middleware/middleware");

const router = express.Router();
//gives control to controller to handle the request and call original API
router.post("/summarize", protect, summarize);
router.post("/explain", protect, explain);

module.exports = router;