# 📚 Book Review REST API

A RESTful API built using **Node.js**, **Express**, and **MongoDB** to manage books and reviews. This project allows users to perform CRUD operations on books and reviews, search for books, and fetch paginated reviews with average ratings.

---

## 🚀 Features

- Add, retrieve, update, and delete books
- Add, update, and delete reviews (only by review owner)
- Fetch a book by ID or genre
- Fetch a book with paginated reviews and average rating
- Search books by title or author (case-insensitive)
- Structured error handling

---

## 🛠 Project Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Manikanta954/book-review-system.git
cd book-review-system
```

### 2. Folder Structure

```
book-review-api/
│
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
├── .env
├── app.js
├── server.js
└── README.md
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

This is `.env` file in the root directory with the following:

```plaintext
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bookreviewdb
JWT_SECRET=manikanta954
```

### 5. Start the Server

```bash
npm run dev
```

The server will run at: **http://localhost:5000**

---

## 🔐 Authentication APIs

### Sign Up

- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/signup`
- **Body**:
  ```json
  {
    "name": "Your name",
    "email": "example@gmail.com",
    "password": "your password"
  }
  ```

### Login

- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/login`
- **Body**:
  ```json
  {
    "email": "example@gmail.com",
    "password": "your password"
  }
  ```

---

## 📚 Book Routes

**Note**: All routes except search and genre-based retrieval require **Authorization: Bearer <token>** in the request header.

### Add a Book

- **Method**: POST
- **URL**: `http://localhost:5000/api/books`
- **Body**:
  ```json
  {
    "title": "Deep Work",
    "author": "Cal Newport",
    "genre": "Productivity",
    "description": "Rules for focused success in a distracted world."
  }
  ```

### Get All Books

- **Method**: GET
- **URL**: `http://localhost:5000/api/books`
- **Response** (example):
  ```json
  [
    {
      "_id": "6835a686634110e0d6efeff5",
      "title": "Atomic Habits",
      "author": "Manikanta",
      "genre": "Self-help",
      "description": "A guide to building good habits.",
      "reviews": [
        "6835b10d08c9be3a13ede7d4",
        "6835cbed02cb0b244a117904"
      ],
      "createdAt": "2025-05-27T11:48:22.455Z",
      "updatedAt": "2025-05-27T14:27:57.319Z",
      "__v": 2
    }
  ]
  ```

### Get a Specific Book

- **Method**: GET
- **URL**: `http://localhost:5000/api/books/:bookId`
- **Response** (example):
  ```json
  {
    "book": {
      "_id": "6835a686634110e0d6efeff5",
      "title": "Atomic Habits",
      "author": "Manikanta",
      "genre": "Self-help",
      "description": "A guide to building good habits.",
      "reviews": [
        "6835b10d08c9be3a13ede7d4",
        "6835cbed02cb0b244a117904"
      ],
      "createdAt": "2025-05-27T11:48:22.455Z",
      "updatedAt": "2025-05-27T14:27:57.319Z",
      "__v": 2
    },
    "averageRating": "5.00",
    "reviews": [
      {
        "_id": "6835cbed02cb0b244a117904",
        "book": "6835a686634110e0d6efeff5",
        "user": {
          "_id": "6835a3d4cae167de67124178",
          "name": "Manikanta"
        },
        "rating": 5,
        "comment": "Great book!",
        "createdAt": "2025-05-27T14:27:57.304Z",
        "updatedAt": "2025-05-27T14:27:57.304Z",
        "__v": 0
      }
    ],
    "totalReviews": 1,
    "page": 1,
    "limit": 5
  }
  ```

### Get Books by Genre

- **Method**: GET
- **URL**: `http://localhost:5000/api/books/genre/:genre`
- **Example**: `http://localhost:5000/api/books/genre/self-help`
- **Note**: Case-insensitive search.

### Get Book with Paginated Reviews & Average Rating

- **Method**: GET
- **URL**: `http://localhost:5000/api/books/:bookId?page=1&limit=2`
- **Response**: Includes book details, paginated reviews, average rating, and pagination metadata.

### Delete a Book

- **Method**: DELETE
- **URL**: `http://localhost:5000/api/books/:bookId`

---

## 📝 Review Routes

**Note**: All review routes require **Authorization: Bearer <token>** in the request header.

### Add a Review

- **Method**: POST
- **URL**: `http://localhost:5000/api/books/:bookId/reviews`
- **Example**: `http://localhost:5000/api/books/6835eae9abd8dc60e526ffa1/reviews`
- **Body**:
  ```json
  {
    "rating": 5,
    "comment": "Amazing book!"
  }
  ```

### Update a Review

- **Method**: PUT
- **URL**: `http://localhost:5000/api/reviews/:reviewId`
- **Example**: `http://localhost:5000/api/reviews/6836103ddcfc7c36c917a34a`
- **Body**:
  ```json
  {
    "rating": 4,
    "comment": "Updated review!"
  }
  ```
- **Note**: Only the review owner can update.

### Delete a Review

- **Method**: DELETE
- **URL**: `http://localhost:5000/api/reviews/:reviewId`
- **Note**: Only the review owner can delete.

---

## 🔍 Search Books

- **Method**: GET
- **URL**: `http://localhost:5000/api/books/search?q=enterSearchValue`
- **example**: `http://localhost:5000/api/books/search?q=Productivity`
- **Note**: Searches by title or author (case-insensitive, partial match).
