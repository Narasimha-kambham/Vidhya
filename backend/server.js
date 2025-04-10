const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const roadmapRoutes = require("./routes/roadmapRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const connectDB = require("./config/db");
const { protect } = require("./middleware/middleware");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes

//sends /api/ai/ routes to roadmapRoutes to handle all subroutes i.e., /api/ai/generate.
app.use("/api/ai", roadmapRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
