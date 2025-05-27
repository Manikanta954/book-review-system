# 📚 Book Review REST API

A RESTful API built using **Node.js**, **Express**, and **MongoDB** to manage books and reviews. This project allows users to perform CRUD operations on books and reviews, search for books, and fetch paginated reviews with average ratings.

---

## 🚀 Features

- Add, retrieve, update, and delete books
- Add, update, and delete reviews (only by review owner)
- Fetch a book with id or genre
- Fetch a book with paginated reviews and average rating
- Search books by title or author (case-insensitive)
- Structured error handling

---

## 🛠 Project Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Manikanta954/book-review-api.git
cd book-review-system

#Folder Structure

book-review-api/
│
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   
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

## 2. Install Dependencies
npm install

## 3.  .env file
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bookreviewdb
JWT_SECRET=manikanta954

## 4. Start the server
npm run dev  
## Server runs at: http://localhost:5000

## Sign up api
# method:post
# http://localhost:5000/api/auth/signup

{
  "name": "Your name",
  "email": "example@gmail.com",
  "password": "your password"
}

## Login api 
# method:post
# http://localhost:5000/api/auth/login
{
  "email": "example@gmail.com",
  "password": "your password"
}


## Add books api
# method:post
🔐 Requires Authorization: Bearer <token>
http://localhost:5000/api/books
# input: 
{
  "title": "Deep Work",
  "author": "Cal Newport",
  "genre": "Productivity",
  "description": "Rules for focused success in a distracted world."
}

## Get All Books
# method :GET 
🔐 Requires Authorization: Bearer <token>
http://localhost:5000/api/books

#output:
        # {
        #     "_id": "6835a686634110e0d6efeff5",
        #     "title": "Atomic Habits",
        #     "author": "Manikanta",
        #     "genre": "Self-help",
        #     "description": "A guide to building good habits.",
        #     "reviews": [
        #         "6835b10d08c9be3a13ede7d4",
        #         "6835cbed02cb0b244a117904"
        #     ],
        #     "createdAt": "2025-05-27T11:48:22.455Z",
        #     "updatedAt": "2025-05-27T14:27:57.319Z",
        #     "__v": 2}

##Get specific book
🔐 Requires Authorization: Bearer <token>
http://localhost:5000/api/books/:bookId
# output:{
#     "book": {
#         "_id": "6835a686634110e0d6efeff5",
#         "title": "Atomic Habits",
#         "author": "Manikanta",
#         "genre": "Self-help",
#         "description": "A guide to building good habits.",
#         "reviews": [
#             "6835b10d08c9be3a13ede7d4",
#             "6835cbed02cb0b244a117904"
#         ],
#         "createdAt": "2025-05-27T11:48:22.455Z",
#         "updatedAt": "2025-05-27T14:27:57.319Z",
#         "__v": 2
#     },
#     "averageRating": "5.00",
#     "reviews": [
#         {
#             "_id": "6835cbed02cb0b244a117904",
#             "book": "6835a686634110e0d6efeff5",
#             "user": {
#                 "_id": "6835a3d4cae167de67124178",
#                 "name": "Manikanta"
#             },
#             "rating": 5,
#             "comment": "Great book!",
#             "createdAt": "2025-05-27T14:27:57.304Z",
#             "updatedAt": "2025-05-27T14:27:57.304Z",
#             "__v": 0
#         }
#     ],
#     "totalReviews": 1,
#     "page": 1,
#     "limit": 5
#}

##get book by 'genre' (case-insensitive)
# method Get
  http://localhost:5000/api/books/genre/:mention-genre


##Get Book by ID with Paginated Reviews & Average Rating
#method :GET 
http://localhost:5000/api/books/:bookId?page=1&limit=2
#you can copy book id from the output of get all books(book ids are auto generated)
# Returns:
Book details
Paginated reviews
Average rating

##🗑 Delete Book
DELETE   http://localhost:5000/api/books/:bookId

🔐 Requires Authorization: Bearer <token>

-------------------------------------------------------------------------
##📝 Review Routes

# ➕ Add Review  (this route is defined in bookRoutes.js itself)
POST http://localhost:5000/api/books/:bookId/reviews/
#example: http://localhost:5000/api/books/6835eae9abd8dc60e526ffa1/reviews/
# input:
{
  "rating": 5,
  "comment": "Amazing book!"
}
🔐 Requires Authorization: Bearer <token>

##✏️ Update Review
PUT http://localhost:5000/api/reviews/:reviewId
#example:http://localhost:5000/api/reviews/6836103ddcfc7c36c917a34a (you can update only your review)

# input:
{
  "rating": 4,
  "comment": "Updated review!"
}
🔐 Only review owner can update


##🗑 Delete Review
DELETE http://localhost:5000/api/reviews/:reviewId

🔐 Only review owner can delete


##🔍 Search Books
GET http://localhost:5000/api/books/search?q=atomic

Searches by title or author (case-insensitive, partial match)