"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const API_LINK = "http://localhost:8000/books";
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

export default function UpdateBook() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [book, setBook] = useState<Book>({
    book_name: "",
    genre: "",
    author: "",
    year: "",
    description: "",
    price: "",
  });

  const [message, setMessage] = useState("");

  // Fetch book details when component mounts
  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API_LINK}/${id}/`) // Ensure the backend endpoint supports this
      .then((res) => setBook(res.data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedBook = {
        ...book,
        year: Number(book.year), // Ensure number values are correctly formatted
        price: Number(book.price),
      };

      await axios.put(`${API_LINK}/${id}/update/`, updatedBook);
      setMessage("Book updated successfully!");
      setTimeout(() => router.push("/book"), 1500);
    } catch (error) {
      setMessage("Failed to update book.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Update Book</h1>
      {message && <p className={`text-${message.includes("successfully") ? "green" : "red"}-500`}>{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="book_name"
          placeholder="Book Title"
          value={book.book_name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        {/* Dropdown for Genre */}
        <select
          name="genre"
          value={book.genre}
          onChange={handleChange}
          className="border p-2 rounded"
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
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={book.year}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
}
