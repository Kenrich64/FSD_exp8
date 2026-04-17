require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 🔌 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Error:", err));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Test route
app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working correctly",
    port: PORT,
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Extra DB info
mongoose.connection.once("open", () => {
  console.log("📦 Connected to DB:", mongoose.connection.name);
});