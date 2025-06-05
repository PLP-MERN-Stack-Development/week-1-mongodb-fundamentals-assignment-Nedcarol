[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19698725&assignment_repo_type=AssignmentRepo)
# MongoDB Fundamentals Assignment

This assignment focuses on learning MongoDB fundamentals including setup, CRUD operations, advanced queries, aggregation pipelines, and indexing.

## Assignment Overview

You will:
1. Set up a MongoDB database
2. Perform basic CRUD operations
3. Write advanced queries with filtering, projection, and sorting
4. Create aggregation pipelines for data analysis
5. Implement indexing for performance optimization

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all tasks in the assignment
2. Add your `queries.js` file with all required MongoDB queries
3. Include a screenshot of your MongoDB database
4. Update the README.md with your specific setup instructions

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.co
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)



📚 MongoDB Bookstore Project
This project is a simple MongoDB-based book database that demonstrates core CRUD operations, indexing for performance, and aggregations such as grouping books by decade.

🛠️ Technologies Used
MongoDB (using MongoDB Compass GUI)

Node.js + mongodb driver

Mongo Shell & Aggregation Pipelines

📁 Database Structure
Database: plp_bookstore

Collection: books

Each document in the books collection includes:

json
Copy
Edit
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "published_year": 1988,
  "price": 10.99,
  "in_stock": true,
  "pages": 197,
  "publisher": "HarperOne"
}
✅ Features Implemented
1. Indexing for Performance
js
Copy
Edit
await collection.createIndex({ published_year: 1 });
await collection.createIndex({ genre: 1, author: 1 });
2. Sample Queries
js
Copy
Edit
// Find books in Fiction genre
collection.find({ genre: "Fiction" })

// Books published after 2000
collection.find({ published_year: { $gt: 2000 } })

// Update a book's price
collection.updateOne({ title: "1984" }, { $set: { price: 12.99 } })

// Delete a book
collection.deleteOne({ title: "Moby Dick" })
3. Group Books by Decade
js
Copy
Edit
collection.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $substr: [{ $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }, 0, 4] },
          "s"
        ]
      },
      count: { $sum: 1 },
      books: { $push: "$title" }
    }
  },
  { $sort: { _id: 1 } }
])
📸 MongoDB Compass Screenshot
Below is a visual view of the book collection using MongoDB Compass:

![Mongod compass screenshot](https://github.com/user-attachments/assets/c895f91a-3f8b-4210-a8ce-f9fa0b569e30)


🔄 How to Run
Make sure MongoDB is running locally at mongodb://localhost:27017

Import data into the plp_bookstore database (manually via Compass or script).

Run the Node.js script to interact with the database:

bash
Copy
Edit
node runQueries.js
💡 Future Improvements
Add user authentication for secure access

Implement REST API using Express.js

Add pagination and sorting features

