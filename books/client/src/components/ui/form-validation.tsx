export function validateBookForm(book: {
    book_name: string;
    genre: string;
    author: string;
    year: number | string;
    description: string;
    price: number | string;
  }) {
    const errors: Record<string, string> = {};
  
    if (!book.book_name.trim()) errors.book_name = "Book name is required.";
    if (!book.genre) errors.genre = "Genre is required.";
    if (!book.author.trim()) errors.author = "Author is required.";
  
    const year = parseInt(book.year as string, 10);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      errors.year = "Please enter a valid year.";
    }
  
    if (!book.description.trim()) errors.description = "Description is required.";
  
    const price = parseFloat(book.price as string);
    if (isNaN(price) || price <= 0) errors.price = "Please enter a valid price.";
  
    return Object.keys(errors).length ? errors : null;
  }
  