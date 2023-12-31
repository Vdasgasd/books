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
        const updatedBook = await response.json();
        setBook(updatedBook);

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
    setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">{book?.title}</h3>
      <p className="text-gray-700">{book?.description}</p>

      <div className="mt-4">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Subtitle</dt>
            <dd className="mt-1 text-gray-900">{book?.subtitle}</dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Author</dt>
            <dd className="mt-1 text-gray-900">{book?.author}</dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">ISBN</dt>
            <dd className="mt-1 text-gray-900">{book?.isbn}</dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Published</dt>
            <dd className="mt-1 text-gray-900">{book?.published}</dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Publisher</dt>
            <dd className="mt-1 text-gray-900">{book?.publisher}</dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Pages</dt>
            <dd className="mt-1 text-gray-900">{book?.pages}</dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            <a
              href={book?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-800"
            >
              <dd className="mt-1 text-gray-900">{book?.website}</dd>
            </a>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Created at</dt>
            <dd className="mt-1 text-gray-900">{book?.created_at}</dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Updated at</dt>
            <dd className="mt-1 text-gray-900">{book?.updated_at}</dd>
          </div>
        </dl>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleUpdateButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showUpdateForm ? "Hide Update Form" : "Show Update Form"}
        </button>

        <button
          onClick={() => handleDelete(book.id)}
          className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>

      {showUpdateForm && book && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Update Book</h2>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  value={book.title}
                  onChange={(e) => setBook({ ...book, title: e.target.value })}
                  className="input-field text-black"
                />
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-800">
                  Description:
                </label>
                <textarea
                  value={book.description}
                  onChange={(e) =>
                    setBook({ ...book, description: e.target.value })
                  }
                  className="input-field text-black"
                ></textarea>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Subtitle:
                </label>
                <input
                  type="text"
                  value={book.subtitle}
                  onChange={(e) =>
                    setBook({ ...book, subtitle: e.target.value })
                  }
                  className="input-field text-black"
                />
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-800">
                  Author:
                </label>
                <input
                  type="text"
                  value={book.author}
                  onChange={(e) => setBook({ ...book, author: e.target.value })}
                  className="input-field text-black"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  ISBN:
                </label>
                <input
                  type="text"
                  value={book.isbn}
                  onChange={(e) => setBook({ ...book, isbn: e.target.value })}
                  className="input-field text-black"
                />
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-800">
                  Published:
                </label>
                <input
                  type="date"
                  value={book.published}
                  onChange={(e) =>
                    setBook({ ...book, published: e.target.value })
                  }
                  className="input-field text-black"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Publisher:
                </label>
                <input
                  type="text"
                  value={book.publisher}
                  onChange={(e) =>
                    setBook({ ...book, publisher: e.target.value })
                  }
                  className="input-field text-black"
                />
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-800">
                  Pages:
                </label>
                <input
                  type="number"
                  value={book.pages}
                  onChange={(e) =>
                    setBook({ ...book, pages: parseInt(e.target.value, 10) })
                  }
                  className="input-field text-black"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Website:
                </label>
                <input
                  type="text"
                  value={book.website}
                  onChange={(e) =>
                    setBook({ ...book, website: e.target.value })
                  }
                  className="input-field text-black"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleUpdate(book.id, book)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Update
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
      >
        <a href="../books" className="text-white">
          Kembali
        </a>
      </button>
    </div>
  );
};

export default DetailBooks;
