"use client";
import React from "react";

import { useState, useEffect } from "react";

const DetailBooks = ({ params }) => {
  const { id } = params;
  const [book, setBook] = useState([]);
  const [token, setToken] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);

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

      if (response.ok) {
        // Update state with the updated book
        const updatedBook = await response.json();
        setBook(updatedBook);

        // Hide the update form after a successful update
        setShowUpdateForm(false);
      } else {
        console.error(
          "Failed to update book:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete data on the server
      await fetch(
        `https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBook(null);
      window.location.href = "../books";
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdateButtonClick = () => {
    // Toggle the update form visibility
    setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-md rounded">
      <h3 className="text-2xl text-black font-semibold mb-4">{book?.title}</h3>
      <p className="text-gray-700">{book?.description}</p>

      <div className="mt-4">
        <p className="text-blue-800">
          <strong>Subtitle:</strong> {book?.subtitle}
        </p>
        <p className="text-green-800">
          <strong>Author:</strong> {book?.author}
        </p>
        <p className="text-purple-800">
          <strong>ISBN:</strong> {book?.isbn}
        </p>
        <p className="text-indigo-800">
          <strong>Published:</strong> {book?.published}
        </p>
        <p className="text-yellow-800">
          <strong>Publisher:</strong> {book?.publisher}
        </p>
        <p className="text-red-800">
          <strong>Pages:</strong> {book?.pages}
        </p>
        <p className="text-orange-800">
          <strong>Website:</strong>{" "}
          <a
            href={book?.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-800"
          >
            {book?.website}
          </a>
        </p>
        <p className="text-gray-800">
          <strong>Created At:</strong> {book?.created_at}
        </p>
        <p className="text-gray-800">
          <strong>Updated At:</strong> {book?.updated_at}
        </p>
      </div>
      <button
        type="button"
        onClick={handleUpdateButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        {showUpdateForm ? "Hide Update Form" : "Show Update Form"}
      </button>
      <button
        onClick={() => handleDelete(book.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-5 focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
      {showUpdateForm && book && (
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mt-4 mb-2 text-gray-800">
            Update Book
          </h2>
          <form>
            <label className="block mb-2 text-gray-800">Title:</label>
            <input
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-gray-800">Description:</label>
            <input
              type="text"
              value={book.description}
              onChange={(e) =>
                setBook({
                  ...book,
                  description: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-gray-800">Subtitle:</label>
            <input
              type="text"
              value={book.subtitle}
              onChange={(e) =>
                setBook({
                  ...book,
                  subtitle: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-gray-800">Author:</label>
            <input
              type="text"
              value={book.author}
              onChange={(e) =>
                setBook({
                  ...book,
                  author: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-gray-800">ISBN:</label>
            <input
              type="text"
              value={book.isbn}
              onChange={(e) =>
                setBook({
                  ...book,
                  isbn: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-gray-800">Published:</label>
            <input
              type="date"
              value={book.published}
              onChange={(e) =>
                setBook({
                  ...book,
                  published: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-gray-800">Publisher:</label>
            <input
              type="text"
              value={book.publisher}
              onChange={(e) =>
                setBook({
                  ...book,
                  publisher: e.target.value,
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-gray-800">Pages:</label>
            <input
              type="number"
              value={book.pages}
              onChange={(e) =>
                setBook({
                  ...book,
                  pages: parseInt(e.target.value, 10),
                })
              }
              className="border rounded px-2 py-1 mb-2 text-black"
            />

            <label className="block mb-2 text-gray-800">Website:</label>
            <input
              type="text"
              value={book.website}
              onChange={(e) =>
                setBook({
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
      <button
        type="button"
        className="flex mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        <a href="../books">Kembali</a>
      </button>
    </div>
  );
};

export default DetailBooks;
