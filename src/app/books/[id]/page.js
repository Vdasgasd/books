"use client";
import React from "react";

import { useState, useEffect } from "react";

const DetailBooks = ({ params }) => {
  const { id } = params;
  const [book, setBook] = useState([]);
  const [token, setToken] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false); // New state for showing update form

  const handleDelete = async (id) => {
    try {
      // Delete data on the server
      await fetch(
        `https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books/${id}`,
        {
          method: "DELETE",
        }
      );

      // Update state
      //   setBook((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("userData");
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken).token;
      setToken(parsedToken);
    }

    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books/${id}`,
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
          setBook(responseData);
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
      console.log(token);
    }
  }, [id, token]);

  const handleUpdate = async (id, newData) => {
    try {
      // Update data on the server
      const response = await fetch(
        `https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books/${id}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        }
      );
      //   const updatedBook = await response.json();

      //   // Update state
      //   setBook((prevBooks) =>
      //     prevBooks.map((book) => (book.id === id ? updatedBook : book))
      //   );
      //   setBook(null); // Reset book after update
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleUpdateButtonClick = () => {
    // Toggle the update form visibility
    setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
  };

  return (
    <div className=" shadow-md rounded p-6">
      <h3 className="text-xl font-semibold mb-2">{book?.title}</h3>
      <p className="text-gray-700">{book?.description}</p>
      <p>
        <strong>Subtitle:</strong> {book?.subtitle}
      </p>
      <p>
        <strong>Author:</strong> {book?.author}
      </p>
      <p>
        <strong>ISBN:</strong> {book?.isbn}
      </p>
      <p>
        <strong>Published:</strong> {book?.published}
      </p>
      <p>
        <strong>Publisher:</strong> {book?.publisher}
      </p>
      <p>
        <strong>Pages:</strong> {book?.pages}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a href={book?.website} target="_blank" rel="noopener noreferrer">
          {book?.website}
        </a>
      </p>
      <p>
        <strong>Created At:</strong> {book?.created_at}
      </p>
      <p>
        <strong>Updated At:</strong> {book?.updated_at}
      </p>
      {/* Button to toggle update form */}
      <button
        type="button"
        onClick={handleUpdateButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        {showUpdateForm ? "Hide Update Form" : "Show Update Form"}
      </button>
      {showUpdateForm && book && (
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mt-4 mb-2">Update Book</h2>
          <form>
            <label className="block mb-2 text-white">Title:</label>
            <input
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Description:</label>
            <input
              type="text"
              value={book.description}
              onChange={(e) =>
                setbook({
                  ...book,
                  description: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Subtitle:</label>
            <input
              type="text"
              value={book.subtitle}
              onChange={(e) =>
                setbook({
                  ...book,
                  subtitle: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Author:</label>
            <input
              type="text"
              value={book.author}
              onChange={(e) =>
                setbook({
                  ...book,
                  author: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">ISBN:</label>
            <input
              type="text"
              value={book.isbn}
              onChange={(e) =>
                setbook({
                  ...book,
                  isbn: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Published:</label>
            <input
              type="text"
              value={book.published}
              onChange={(e) =>
                setbook({
                  ...book,
                  published: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Publisher:</label>
            <input
              type="text"
              value={book.publisher}
              onChange={(e) =>
                setbook({
                  ...book,
                  publisher: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Pages:</label>
            <input
              type="number"
              value={book.pages}
              onChange={(e) =>
                setbook({
                  ...book,
                  pages: parseInt(e.target.value, 10),
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-white">Website:</label>
            <input
              type="text"
              value={book.website}
              onChange={(e) =>
                setbook({
                  ...book,
                  website: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <button
              type="button"
              onClick={() => handleUpdate(book.id, book)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DetailBooks;
