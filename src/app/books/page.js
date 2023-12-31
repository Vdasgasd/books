// src/app/books/pages.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

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

  useEffect(() => {
    const storedToken = sessionStorage.getItem("userData");
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken).token;
      setToken(parsedToken);
    }

    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          setBooks(responseData.data);
        } else {
          console.error(
            "Failed to fetch books:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    if (token) {
      fetchBooks();
    }
  }, [token]);

  const handleAddBook = async () => {
    try {
      // Add data on the server
      const response = await fetch(
        "https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newBook),
        }
      );
      const addedBook = await response.json();

      setBooks((prevBooks) => [...prevBooks, addedBook]);

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

      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Book List</h2>

      {showAddForm && (
        <form className="mb-8">
          <div className="mb-4">
            <label className="block text-white mb-2">Title:</label>
            <input
              type="text"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              className="border rounded px-2 py-1 text-black w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Description:</label>
            <input
              type="text"
              value={newBook.description}
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
              className="border rounded px-2 py-1 text-black w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Subtitle:</label>
            <input
              type="text"
              value={newBook.subtitle}
              onChange={(e) =>
                setNewBook({ ...newBook, subtitle: e.target.value })
              }
              className="border rounded px-2 py-1 text-black w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Author:</label>
            <input
              type="text"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="border rounded px-2 py-1 text-black w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">ISBN:</label>
            <input
              type="text"
              value={newBook.isbn}
              onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
              className="border rounded px-2 py-1 text-black w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Published:</label>
            <input
              type="text"
              value={newBook.published}
              onChange={(e) =>
                setNewBook({ ...newBook, published: e.target.value })
              }
              className="border rounded px-2 py-1 text-black w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Publisher:</label>
            <input
              type="text"
              value={newBook.publisher}
              onChange={(e) =>
                setNewBook({ ...newBook, publisher: e.target.value })
              }
              className="border rounded px-2 py-1 text-black w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Pages:</label>
            <input
              type="number"
              value={newBook.pages}
              onChange={(e) =>
                setNewBook({ ...newBook, pages: parseInt(e.target.value, 10) })
              }
              className="border rounded px-2 py-1 text-black w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Website:</label>
            <input
              type="text"
              value={newBook.website}
              onChange={(e) =>
                setNewBook({ ...newBook, website: e.target.value })
              }
              className="border rounded px-2 py-1 text-black w-full"
            />
          </div>

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
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          showAddForm ? "bg-red-500" : ""
        }`}
      >
        {showAddForm ? "Cancel" : "Add Book"}
      </button>

      <ul className="mt-4">
        {books.map((book) => (
          <li key={book.id} className="mb-4">
            <strong className="text-xl">{book.title}</strong> by {book.author}
            <p className="text-gray-700">{book.description}</p>
            <Link href={`/books/${book.id}`} className="text-blue-500">
              Detail
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BookList;
