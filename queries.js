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

    // 1. Find all books in a specific genre (e.g., Fiction)
    const fictionBooks = await collection.find({ genre: "Fiction" }).toArray();
    console.log('Books in Fiction genre:', fictionBooks);

    // 2. Find books published after 2000
    const recentBooks = await collection.find({ published_year: { $gt: 2000 } }).toArray();
    console.log('Books published after 2000:', recentBooks);

    // 3. Find books by a specific author
    const orwellBooks = await collection.find({ author: "George Orwell" }).toArray();
    console.log('Books by George Orwell:', orwellBooks);

    // 4. Update price of a specific book
    const updateResult = await collection.updateOne(
      { title: "1984" },
      { $set: { price: 12.99 } }
    );
    console.log('Update result:', updateResult.modifiedCount);

    // 5. Delete a book by title
    const deleteResult = await collection.deleteOne({ title: "Moby Dick" });
    console.log('Delete result:', deleteResult.deletedCount);

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

runQueries();
