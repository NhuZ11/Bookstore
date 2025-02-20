"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"
// import { SelectContent, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectLabel } from "@radix-ui/react-select";

// const genres = ["Fiction", "Non-Fiction", "Mystery", "Fantasy", "Science Fiction", "Biography", "History", "Romance", "Thriller"];

const formSchema = z.object({
  bookTitle: z.string().min(1, "Book title is required"),
  author: z.string().min(1, "Author name is required"),
  genre: z.string().min(1, "Genre is required"),
  year: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  description: z.string().min(1, "Description is required"),
});

export default function BookstoreForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookTitle: "",
      author: "",
      genre: "",
      year: "",
      description: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Submitted", data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
          <FormField control={form.control} name="bookTitle" render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          
          <FormField control={form.control} name="author" render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex gap-4">
          <FormField control={form.control} name="genre" render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Genres</SelectLabel>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Mystery">Mystery</SelectItem>
                    <SelectItem value="Fantasy">Fantasy</SelectItem>
                    <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                    <SelectItem value="Biography">Biography</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Romance">Romance</SelectItem>
                    <SelectItem value="Thriller">Thriller</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          
          <FormField control={form.control} name="year" render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Publication</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Enter year of publication" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          </div>
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter book description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
