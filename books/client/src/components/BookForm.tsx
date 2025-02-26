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
  image?: File | null;
}

export function BookForm() {
  const [book, setBook] = useState<Book>({
    book_name: "",
    genre: "",
    author: "",
    year: "",
    description: "",
    price: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBook({ ...book, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("book_name", book.book_name);
    formData.append("genre", book.genre);
    formData.append("author", book.author);
    formData.append("year", book.year.toString());
    formData.append("description", book.description);
    formData.append("price", book.price.toString());
    if (book.image) {
      formData.append("image", book.image);
    }

    try {
      await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Book added successfully!");
      setBook({ book_name: "", genre: "", author: "", year: "", description: "", price: "", image: null });
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage("Failed to add book.");
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
          min={0}
          value={book.price}
          onChange={handleChange}
          className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
          required
        />
        {/* Image Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
        />
        <button
          type="submit"
          className="text-white p-2 rounded bg-[#8B5E3C] hover:bg-[#6D4C41]"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
