const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;
const DATABASE_FILE = 'books.json';

app.use(bodyParser.json());

let books = [];

// Read initial data from the file if it exists
async function readDataFromFile() {
  try {
    const data = await fs.readFile(DATABASE_FILE, 'utf-8');
    books = JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error.message);
  }
}

// Save data to the file
async function saveDataToFile() {
  try {
    await fs.writeFile(DATABASE_FILE, JSON.stringify(books, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database file:', error.message);
  }
}

// Middleware to read data from file before handling requests
app.use(async (req, res, next) => {
  await readDataFromFile();
  next();
});

// Endpoint to retrieve all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Endpoint to add a new book
app.post('/api/books', (req, res) => {
  const newBook = req.body;

  // Validation
  if (!newBook.title || !newBook.author) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  // Checking for duplicate entries
  const duplicate = books.find(
    book => book.title === newBook.title && book.author === newBook.author
  );
  if (duplicate) {
    return res.status(400).json({ error: 'Duplicate book entry' });
  }

  // Adding the new book to the array
  books.push(newBook);

  // Save the updated data to the file
  saveDataToFile();

  res.status(201).json({ message: 'Book added successfully!' });
});

// Endpoint to update book details
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  // Finding the book to update
  const bookToUpdate = books.find(book => book.id === bookId);

  // Handling case where the book is not found
  if (!bookToUpdate) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Validation
  if (!updatedBook.title || !updatedBook.author) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Updating book details
  bookToUpdate.title = updatedBook.title;
  bookToUpdate.author = updatedBook.author;

  // Save the updated data to the file
  saveDataToFile();

  res.json({ message: 'Book updated successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
