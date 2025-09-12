import React, { useState, useEffect } from "react";

function BookForm({ onAdd, onUpdate, selectedBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (selectedBook) {
      setTitle(selectedBook.title);
      setAuthor(selectedBook.author);
      setCategory(selectedBook.category || "");
      setQuantity(selectedBook.quantity);
      setPrice(selectedBook.price);
    } else {
      setTitle("");
      setAuthor("");
      setCategory("");
      setQuantity("");
      setPrice("");
    }
  }, [selectedBook]);

  function handleSubmit(e) {
    e.preventDefault();
    const book = {
      id: selectedBook ? selectedBook.id : Date.now(),
      title,
      author,
      category,
      quantity: Number(quantity),
      price: Number(price),
    };

    if (selectedBook) {
      onUpdate(book);
    } else {
      onAdd(book);
    }

    setTitle("");
    setAuthor("");
    setCategory("");
    setQuantity("");
    setPrice("");
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">
        {selectedBook ? "✏️ Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price (M)"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            selectedBook
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {selectedBook ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
