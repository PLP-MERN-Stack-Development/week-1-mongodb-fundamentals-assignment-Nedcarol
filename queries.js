const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Index for performance
    await collection.createIndex({ published_year: 1 });
    await collection.createIndex({ genre: 1, author: 1 });

    // Find books in a specific genre
    const fictionBooks = await collection.find({ genre: "Fiction" }).toArray();
    console.log('Books in Fiction genre:', fictionBooks);

    // Find books published after 2000
    const recentBooks = await collection.find({ published_year: { $gt: 2000 } }).toArray();
    console.log('Books published after 2000:', recentBooks);

    // Find books by George Orwell
    const orwellBooks = await collection.find({ author: "George Orwell" }).toArray();
    console.log('Books by George Orwell:', orwellBooks);

    // Update price of 1984
    const updateResult = await collection.updateOne(
      { title: "1984" },
      { $set: { price: 12.99 } }
    );
    console.log('Update result:', updateResult.modifiedCount);

    // Delete a book by title
    const deleteResult = await collection.deleteOne({ title: "Moby Dick" });
    console.log('Delete result:', deleteResult.deletedCount);

    // Group books by decade
    const booksByDecade = await collection.aggregate([
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
    ]).toArray();

    console.log('Books grouped by decade:', booksByDecade);

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

runQueries();
