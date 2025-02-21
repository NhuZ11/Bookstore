"use client";

import { useState } from "react";
import axios from "axios";
import { validateBookForm } from "@/components/ui/form-validation";

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate form input
    const validationErrors = validateBookForm(book);
    if (validationErrors) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Convert year and price to numbers
    const payload = {
      ...book,
      year: parseInt(book.year as string, 10),
      price: parseFloat(book.price as string),
    };

    try {
      await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setBook({ book_name: "", genre: "", author: "", year: "", description: "", price: "" }); // Reset form
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      {/* <h1 className="text-2xl font-bold mb-4 text-[#2C3E50]">Add Book</h1> */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            name="book_name"
            placeholder="Book Title"
            value={book.book_name}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C] w-full"
          />
          {errors.book_name && <p className="text-red-500 text-sm">{errors.book_name}</p>}
        </div>

        <div>
          <select
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C] w-full"
          >
            <option value="">Select Genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
        </div>

        <div>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C] w-full"
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
        </div>

        <div>
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={book.year}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C] w-full"
            min="0"
          />
          {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C] w-full"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={book.price}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C] w-full"
            min="0"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <button
          type="submit"
          className="text-white p-2 rounded bg-[#8B5E3C] hover:bg-[#6D4C41] w-full"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
