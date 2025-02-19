"use client"
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Book = {
  id: string;
  name: string;
  genre: string;
  description: string;
  author: string;
  year?: number;
  price?: number;
};

const books: Book[] = [
  {
    id: "1",
    name: "English Book",
    genre: "Study",
    description: "hello hello",
    author: "Ram",
    year: 2000,
    price: 500,
  },
  {
    id: "2",
    name: "Nepali Book",
    genre: "Study",
    description: "they are great",
    author: "Shyam",
    year: 2005,
    price: 400,
  },
  {
    id: "3",
    name: "Math Book",
    genre: "Education",
    description: "hello hello",
    author: "Hari",
    year: 2010,
    price: 350,
  },
  {
    id: "4",
    name: "Science Book",
    genre: "Education",
    description: "they are great",
    author: "Gopal",
    year: 2015,
    price: 450,
  },
];

export default function UserDashboard() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="p-6 flex gap-6">
      {/* Left: Book Table */}
      <div className="w-2/3">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Available Book List
        </h1>
        <Table className="shadow-xl rounded-lg overflow-hidden border border-gray-200">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="w-[150px] text-gray-700">Name</TableHead>
              <TableHead className="text-gray-700">Genre</TableHead>
              <TableHead className="text-gray-700">Author</TableHead>
              <TableHead className="text-gray-700">Year</TableHead>
              <TableHead className="text-right text-gray-700">Price</TableHead>
            
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.id}
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <TableCell className="font-semibold text-gray-900">
                  {book.name}
                </TableCell>
                <TableCell>
                  <Badge className="px-2 py-1 text-sm">{book.genre}</Badge>
                </TableCell>
                <TableCell className="text-gray-700">{book.author}</TableCell>
                <TableCell className="text-gray-800">
                  {book.year ?? "N/A"}
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-900">
                  {book.price ? `$${book.price.toFixed(2)}` : "N/A"}
                </TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Right: Expanded Details */}
      <div className="w-1/3">
        <Card className="p-4 shadow-md border h-full">
          <h2 className="text-2xl font-semibold mb-4">Book Details</h2>
          {selectedBook ? (
            <CardContent className="text-gray-600 space-y-2">
              <p>
                <span className="font-semibold text-gray-900">Name: </span>
                {selectedBook.name}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Genre: </span>
                {selectedBook.genre}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Author: </span>
                {selectedBook.author}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Description: </span>
                {selectedBook.description}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Year: </span>
                {selectedBook.year ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Price: </span>
                {selectedBook.price ? `$${selectedBook.price.toFixed(2)}` : "N/A"}
              </p>
              <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">
                Add To Cart
              </Button>
            </CardContent>
          ) : (
            <CardContent className="text-gray-500">
              Click a book to see details.
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
