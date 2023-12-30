// src/app/books/pages.js
import { useEffect, useState } from "react";

const BookList = ({ token }) => {
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

    fetchBooks();
  }, [token]);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
