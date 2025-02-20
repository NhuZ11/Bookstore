"use client";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const API_LINK = "http://localhost:8000/books";

export default function DeleteBook() {
  const params = useParams();
  const id = params.id ;
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_LINK}/${id}/delete/`);
      setMessage("Book deleted successfully!");
      setTimeout(() => router.push("/dashboard"), 1000); // Redirect after deletion
    } catch (error) {
      setMessage("Failed to delete book.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Delete Book</h1>
      {message && <p className="text-red-500">{message}</p>}
      <p>Are you sure you want to delete this book?</p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Delete
      </button>
      <button
        onClick={() => router.push('/dashboard')}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
      >
        Cancel
      </button>
    </div>
  );
}