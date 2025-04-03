const express = require("express");
const { generateRoadmap } = require("../controllers/roadmapController");

const router = express.Router();
//gives control to controller to handle the request and call original API
router.post("/generate", generateRoadmap);

module.exports = router;
