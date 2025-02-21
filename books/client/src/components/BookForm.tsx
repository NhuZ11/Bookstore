"use client";

import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/books/";


const genres = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Self-Help",
];

interface Book {
  book_name: string;
  genre: string;
  author: string;
  year: number | string;
  description: string;
  price: number | string;
}

export function BookForm() {
  const [book, setBook] = useState<Book>({
    book_name: "",
    genre: "",
    author: "",
    year: "",
    description: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Convert year and price to numbers
    const payload = {
      ...book,
      year: parseInt(book.year as string, 10),
      price: parseFloat(book.price as string),
    };

    // Validate year and price
    if (isNaN(payload.year)) {
      setMessage("Please enter a valid year.");
      setIsLoading(false);
      return;
    }
    if (isNaN(payload.price)) {
      setMessage("Please enter a valid price.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage("Book added successfully!");
      setBook({ book_name: "", genre: "", author: "", year: "", description: "", price: "" }); // Reset form
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data); // Log the full error response
        setMessage(error.response?.data?.message || "Failed to add book.");
      } else {
        console.error("Unexpected error:", error);
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-[#2C3E50]">Add Book</h1>
      {message && <p className={`text-${message.includes("successfully") ? "green" : "red"}-500`}>{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="book_name"
          placeholder="Book Title"
          value={book.book_name}
          onChange={handleChange}
          className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
          required
        />
        {/* Dropdown for Genre */}
        <select
          name="genre"
          value={book.genre}
          onChange={handleChange}
          className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
          required
        >
          <option value="">Select Genre</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={book.year}
          onChange={handleChange}
          className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
          className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
          required
        />
        <button
          type="submit"
          className="text-white p-2 rounded bg-[#8B5E3C] hover:bg-[#6D4C41] "
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}