// pages/index.js
"use client";
import { useState, useEffect } from "react";

const BookList = ({ books }) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      {books.data.map((book) => (
        <div key={book.id} className="mb-4">
          <h3 className="text-xl font-semibold">{book.title}</h3>
          <p className="text-gray-600 mb-2">{book.subtitle}</p>
          <p className="text-gray-700">{book.description}</p>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://book-crud-service-6dmqxfovfq-et.a.run.app/api/books"
        );

        const data = await response.json();

        if (response.ok) {
          setBooks(data);
        } else {
          console.error("Failed to get books:", data.message);
        }
      } catch (error) {
        console.error("Error getting books:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold mb-8">Next.js Book App</h1>
        {books && <BookList books={books} />}
      </div>
    </div>
  );
};

export default Home;
