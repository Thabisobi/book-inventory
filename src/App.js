import React, { useState, useEffect } from "react";
import { loadBooks, saveBooks } from "./utils/storage";
import BookForm from "./components/bookform";
import BookTable from "./components/booktable";
import Dashboard from "./components/dashboard";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setBooks(loadBooks());
  }, []);

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  function addBook(book) {
    setBooks([...books, { ...book, id: Date.now() }]);
  }

  function updateBook(updated) {
    setBooks(books.map(b => (b.id === updated.id ? updated : b)));
    setSelectedBook(null);
  }

  function deleteBook(id) {
    setBooks(books.filter(b => b.id !== id));
  }

  function editBook(book) {
    setSelectedBook(book);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Bookstore Inventory</h1>
      <Dashboard books={books} />
      <BookForm onAdd={addBook} onUpdate={updateBook} selectedBook={selectedBook} />
      <BookTable books={books} onDelete={deleteBook} onEdit={editBook} />
    </div>
  );
}

export default App;
