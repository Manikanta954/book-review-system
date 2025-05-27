const express = require("express");
const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");
const Review = require("../models/Review");
const router = express.Router();

// POST /books – Add a new book (Authenticated)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    const book = new Book({ title, author, genre, description });
    await book.save();

    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
});

// GET /books – Get all books (Pagination + Filters)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const query = {};
    if (author) query.author = new RegExp(author, "i");
    if (genre) query.genre = new RegExp(genre, "i");

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});
// GET /books/genre/:genre – Get books by genre (case-insensitive)
router.get("/genre/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    const books = await Book.find({
      genre: { $regex: genre, $options: "i" }, // Case-insensitive match
    });

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by genre", error });
  }
});

//search

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Query parameter 'q' is required" });
    }

    const regex = new RegExp(q, "i");

    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    }).limit(20);

    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: "Error searching books", error });
  }
});

// GET book details + average rating + reviews with pagination
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    // Find book by id
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Get reviews for the book, paginated
 const reviews = await Review.find({ book: id })
      .populate("user", "name") // populate user name
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Calculate average rating
    const allReviews = await Review.find({ book: id });
    const avgRating =
      allReviews.length > 0
        ? allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length
        : 0;

    res.json({
      book,
      averageRating: avgRating.toFixed(2),
      reviews,
      totalReviews: allReviews.length,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details", error });
  }
});

// POST review (authenticated, one review per user per book)
router.post("/:id/reviews", authMiddleware, async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.userId;
    const { rating, comment } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview)
      return res.status(400).json({ message: "You have already reviewed this book" });

    // Create new review
    const review = new Review({
      book: bookId,
      user: userId,
      rating,
      comment,
    });
    await review.save();

    // Add review to book's reviews array
    book.reviews.push(review._id);
    await book.save();

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});




module.exports = router;
