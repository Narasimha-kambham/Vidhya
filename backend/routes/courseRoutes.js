const express = require("express");
const {getCourses} = require("../controllers/courseController");
const {protect} = require("../middleware/middleware");

const router = express.Router();
router.get("/getData",getCourses)
module.exports = router;