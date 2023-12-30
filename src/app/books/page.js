// src/app/books.js
"use client";
import React, { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the server
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

        // Check if the 'data' property exists in the response
        const booksData = data.data ? data.data : [];

        setBooks(booksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Book List</h1>
      <div className="mb-4">
        {books.map((book) => (
          <div key={book.id} className=" shadow-md rounded p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-700">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
