 SETTING UP A NODE.JS APP: 

 Step 1: Install Node.js and NPM. And check wether they are installed or not by running the commands node ~v, nom ~v
 
 Step 2: Create a new project folder and add a new file and name it as app.js.

 Step 3: Start a new node.js application by running the command npm init

 Step 4: Install Express and import modules.

 API DOCUMENTATION
 
    Retrieve All Books
    
    Endpoint: GET /api/books
    Description: Retrieve a list of all books in the library.
    Request: No request parameters.
    Response: Gives a JSON File containg all the books.

    Add a New Book
    
    Endpoint: POST /api/books
    Description: Add a new book to the library.
    Request:
      { "title": "New Book", "author": "New Author" }
    Response:
      { "message": "Book added successfully" }

    Update Book Details
    
    Endpoint: PUT /api/books/:id
    Description: Update the details of a specific book.
    Request:
    URL Parameters:
    id: ID of the book to be updated.
      { "title": "Updated Title", "author": "Updated Author" }
    Response: 
      { "message": "Book updated successfully" }

 
