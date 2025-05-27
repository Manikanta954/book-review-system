const express = require("express");
const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// PUT /reviews/:id - Update your own review
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.userId;
    const { rating, comment } = req.body;

    // Find review
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Check ownership
    if (review.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized to update this review" });

    // Update fields
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    res.json({ message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.userId;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized to delete this review" });

    await review.deleteOne(); // ✅ preferred over remove()

    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error); // ✅ helpful log
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
});

module.exports = router;
