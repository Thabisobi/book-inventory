import React from "react";

function BookTable({ books, onDelete, onEdit }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Manage Books</h2>

      {books.length === 0 ? (
        <p className="text-gray-500">No books added yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Price (M)</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(b => (
              <tr key={b.id}>
                <td className="border border-gray-300 px-4 py-2">{b.title}</td>
                <td className="border border-gray-300 px-4 py-2">{b.author}</td>
                <td className="border border-gray-300 px-4 py-2">{b.category}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{b.quantity}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {Number(b.price).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => onEdit(b)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(b.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookTable;
