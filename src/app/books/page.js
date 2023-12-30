// src/app/books/pages.js
"use client";
import { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState("");

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

        const data = await response.json();

        if (response.ok) {
          setBooks(data);
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

    // Call fetchBooks after setting the token
    if (token) {
      fetchBooks();
    }
  }, [token]);

  return (
    <div>
      <h2>Book List</h2>

      {books.map((book) => (
        <div key={book.id} className=" shadow-md rounded p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
          <p className="text-gray-700">{book.description}</p>

          <div className="mt-5">
            {/* <button
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
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
