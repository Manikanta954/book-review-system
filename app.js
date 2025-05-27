// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// existing middleware...
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
// Routes (to be added later)
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/reviews", reviewRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the Book Review API");
});

module.exports = app;
