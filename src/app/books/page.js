// components/BookList.js
"use client";
import { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              // Include any necessary authorization headers
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
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

    fetchBooks();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <p className="text-gray-700">{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
