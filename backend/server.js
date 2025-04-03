const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const roadmapRoutes = require("./routes/roadmapRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

//sends /api/ai/ routes to roadmapRoutes to handle all subroutes i.e., /api/ai/generate.
app.use("/api/ai", roadmapRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
