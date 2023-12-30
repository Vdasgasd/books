// src/components/BookList.js
"use client"; // src/components/BookList.js
import React, { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    subtitle: "",
    author: "",
    isbn: "",
    published: "",
    publisher: "",
    pages: 0,
    website: "",
  });

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        const initialFakeData = [
          {
            id: 1,
            user_id: 1,
            isbn: "9781491943533",
            title: "Practical Modern JavaScript",
            subtitle: "Dive into ES6 and the Future of JavaScript",
            author: "Nicolás Bevacqua",
            published: "2017-07-16 00:00:00",
            publisher: "O'Reilly Media",
            pages: 334,
            description:
              "To get the most out of modern JavaScript, you need to learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.",
            website:
              "https://github.com/mjavascript/practical-modern-javascript",
            created_at: "2023-01-12T14:50:05.000000Z",
            updated_at: "2023-01-12T14:50:05.000000Z",
          },
          // Add more books as needed
        ];
        setBooks(initialFakeData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // the empty dependency array ensures that the effect runs only once

  const [showAddForm, setShowAddForm] = useState(false);

  const handleUpdate = (id, newData) => {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? {
            ...book,
            ...newData,
            updated_at: new Date().toISOString(),
          }
        : book
    );

    setBooks(updatedBooks);
    setSelectedBook(null); // Reset selectedBook after update
  };

  const handleDelete = (id) => {
    const filteredBooks = books.filter((book) => book.id !== id);

    setBooks(filteredBooks);
  };

  const handleAddBook = () => {
    // Adding a new book to the state with current timestamp
    setBooks([
      ...books,
      {
        ...newBook,
        id: books.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    // Clearing the form after adding a new book
    setNewBook({
      title: "",
      description: "",
      subtitle: "",
      author: "",
      isbn: "",
      published: "",
      publisher: "",
      pages: 0,
      website: "",
    });
    // Hide the "Add Book" form after adding a new book
    setShowAddForm(false);
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleCancelUpdate = () => {
    // Reset selectedBook and hide the update form
    setSelectedBook(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8 flex">
      <div className="w-full pr-8">
        <h1 className="text-3xl font-bold mb-4">Book List</h1>
        <div className="flex justify-end w-full ">
          <a
            href="/logout"
            className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline fixed right-5 top-5  "
          >
            Logout
          </a>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Add New Book</h2>
          {/* Show the "Add Book" form when showAddForm is true */}
          {showAddForm && (
            <form>
              <label className="block mb-2 text-white">Title:</label>
              <input
                type="text"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                className="border rounded px-2 py-1 mb-2 text-black"
              />

              <label className="block mb-2 text-white">Description:</label>
              <input
                type="text"
                value={newBook.description}
                onChange={(e) =>
                  setNewBook({ ...newBook, description: e.target.value })
                }
                className="border rounded px-2 py-1 mb-2 text-black"
              />

              <label className="block mb-2 text-white">Subtitle:</label>
              <input
                type="text"
                value={newBook.subtitle}
                onChange={(e) =>
                  setNewBook({ ...newBook, subtitle: e.target.value })
                }
                className="border rounded px-2 py-1 mb-2 text-black"
              />

              <label className="block mb-2 text-white">Author:</label>
              <input
                type="text"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                className="border rounded px-2 py-1 mb-2 text-black"
              />

              <label className="block mb-2 text-white">ISBN:</label>
              <input
                type="text"
                value={newBook.isbn}
                onChange={(e) =>
                  setNewBook({ ...newBook, isbn: e.target.value })
                }
                className="border rounded px-2 py-1 mb-2 text-black"
              />

              <label className="block mb-2 text-white">Published:</label>
              <input
                type="text"
                value={newBook.published}
                onChange={(e) =>
                  setNewBook({ ...newBook, published: e.target.value })
                }
                className="border rounded px-2 py-1 mb-2 text-black"
              />

              <label className="block mb-2 text-white">Publisher:</label>
              <input
                type="text"
                value={newBook.publisher}
                onChange={(e) =>
                  setNewBook({ ...newBook, publisher: e.target.value })
                }
                className="border rounded px-2 py-1 mb-2 text-black"
              />

              <label className="block mb-2 text-white">Pages:</label>
              <input
                type="number"
                value={newBook.pages}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    pages: parseInt(e.target.value, 10),
                  })
                }
                className="border rounded px-2 py-1 mb-2 text-black"
              />

              <label className="block mb-2 text-white">Website:</label>
              <input
                type="text"
                value={newBook.website}
                onChange={(e) =>
                  setNewBook({ ...newBook, website: e.target.value })
                }
                className="border rounded px-2 py-1 mb-2 text-black"
              />

              <button
                type="button"
                onClick={handleAddBook}
                className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3"
              >
                Add Book
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showAddForm ? "Cancel" : "Add Book"}
          </button>
        </div>
        {books.map((book) => (
          <div key={book.id} className=" shadow-md rounded p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-700">{book.description}</p>

            <div className="mt-5">
              <button
                onClick={() => handleSelectBook(book)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Detail & update
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">Book Details</h2>
          <div className=" shadow-md rounded p-6">
            <h3 className="text-xl font-semibold mb-2">{selectedBook.title}</h3>
            <p className="text-gray-700">{selectedBook.description}</p>
            <p>
              <strong>Subtitle:</strong> {selectedBook.subtitle}
            </p>
            <p>
              <strong>Author:</strong> {selectedBook.author}
            </p>
            <p>
              <strong>ISBN:</strong> {selectedBook.isbn}
            </p>
            <p>
              <strong>Published:</strong> {selectedBook.published}
            </p>
            <p>
              <strong>Publisher:</strong> {selectedBook.publisher}
            </p>
            <p>
              <strong>Pages:</strong> {selectedBook.pages}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={selectedBook.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedBook.website}
              </a>
            </p>
            <p>
              <strong>Created At:</strong> {selectedBook.created_at}
            </p>
            <p>
              <strong>Updated At:</strong> {selectedBook.updated_at}
            </p>
          </div>
          <h2 className="text-2xl font-bold mt-4 mb-2">Update Book</h2>
          <form>
            <label className="block mb-2 text-white">Title:</label>
            <input
              type="text"
              value={selectedBook.title}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, title: e.target.value })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Description:</label>
            <input
              type="text"
              value={selectedBook.description}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  description: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Subtitle:</label>
            <input
              type="text"
              value={selectedBook.subtitle}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  subtitle: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Author:</label>
            <input
              type="text"
              value={selectedBook.author}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  author: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">ISBN:</label>
            <input
              type="text"
              value={selectedBook.isbn}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  isbn: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Published:</label>
            <input
              type="text"
              value={selectedBook.published}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  published: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Publisher:</label>
            <input
              type="text"
              value={selectedBook.publisher}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  publisher: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Pages:</label>
            <input
              type="number"
              value={selectedBook.pages}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  pages: parseInt(e.target.value, 10),
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Website:</label>
            <input
              type="text"
              value={selectedBook.website}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  website: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <button
              type="button"
              onClick={() => handleUpdate(selectedBook.id, selectedBook)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Update
            </button>

            <button
              type="button"
              onClick={handleCancelUpdate}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookList;
