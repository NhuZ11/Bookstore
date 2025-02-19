"use client";
import { AppSidebar } from "@/components/app-sidebar"
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogTrigger, DialogContent, DialogTitle} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const formSchema = z.object({
  bookTitle: z.string().min(1, "Book title is required"),
  author: z.string().min(1, "Author name is required"),
  genre: z.string().min(1, "Genre is required"),
  year: z.string().min(1, "Year is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number") 
});


export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookTitle: "",
      author: "",
      genre: "",
      year: "",
      description: "",
      price: "",
    },
  });
    const handleSubmit = (data: z.infer<typeof formSchema>) => {
      console.log("Form Submitted", data);
    };
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-[#c0b5b8] ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block " />
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="m-10 ">
          <Card className="flex-start size-auto w-auto bg-[#EDE0D4]">
           
          <CardHeader className="flex flex-col items-center">
          <div className="flex gap-40">
            <CardTitle className="italic text-6xl">Upload Your Books <br></br>To Increase Your Sales</CardTitle>
            
            <CardContent>
                <p className="text-2xl">Engage your shop books with this Dashboard
                  <br></br>and make sales everyday to your shop
                </p>
              </CardContent>
            <Image 
            src="/We Heart It.jpg"  
            alt="Bookstore"
            width={300} 
            height={300}
            className="rounded-lg "
          />  
           
          </div>
              </CardHeader>
              
      <CardFooter>
       {/* Add a Book Button */}
      
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-36 h-14 mb-6 bg-[#8B5E3C] text-white hover:bg-[#6D4C41] text-2xl">Add a Book</Button>
        </DialogTrigger>
       
        <DialogContent className="max-w-lg w-full p-6 bg-[#EDE0D4]">
          <VisuallyHidden>
            <DialogTitle >Add a New Book</DialogTitle>
          </VisuallyHidden>
          <h2 className="text-xl font-semibold mb-4 flex justify-center text-[#2C3E50]">Add a New Book</h2>
          
        
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 bg-[#EDE0D4] ">
              <FormField control={form.control} name="bookTitle" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#2C3E50]">Book Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field}
                    className="bg-[#FAF3E0] border-[#8B5E3C]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="author" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#2C3E50]">Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} 
                     className="bg-[#FAF3E0] border-[#8B5E3C]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Genre & Year Fields Side by Side */}
              <div className="flex gap-4">
                <FormField control={form.control} name="genre" render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full bg-[#FAF3E0] border-[#8B5E3C]">
                        <SelectValue placeholder="Select a genre"  />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="text-[#2C3E50]">Genres</SelectLabel>
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
                  <FormItem className="flex-1">
                    <FormLabel className="text-[#2C3E50]">Year of Publication</FormLabel>
                    <FormControl>
                    <Input type="date" max={new Date().toISOString().split("T")[0]} {...field} className="bg-[#FAF3E0] border-[#8B5E3C]"  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2C3E50]">Price (Rs)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="0.01"
                        placeholder="Enter price" 
                        {...field} 
                        className="bg-[#FAF3E0] border-[#8B5E3C]"
                        onChange={(e) => field.onChange(e.target.value.replace(/[^0-9.]/g, ""))} // Ensures only numbers & decimal
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#2C3E50]">Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book description" {...field} 
                     className="bg-[#FAF3E0] border-[#8B5E3C]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
                  
              <Button type="submit" className="w-full bg-[#8B5E3C] text-white hover:bg-[#6D4C41]  ">Submit</Button>
            </form>
          </Form>
         
        
        </DialogContent>
        </Dialog>
        </CardFooter>
        </Card>
              
              
          
       </div>
        {/* Empty Book Table */}
     <div className="ml-20 w-full max-w-5xl py-10 px-20  ">
     <Table>
       <TableHeader className="bg-[#EDE0D4] text-[#2C3E50]">
         <TableRow>
           <TableHead className="text-[#2C3E50]">Title</TableHead>
           <TableHead className="text-[#2C3E50]">Author</TableHead>
           <TableHead className="text-[#2C3E50]">Genre</TableHead>
           <TableHead className="text-[#2C3E50]">Year</TableHead>
           <TableHead className="text-[#2C3E50]">Description</TableHead>
           <TableHead className="text-[#2C3E50]">Action</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         <TableRow>
           <TableCell colSpan={6} className="text-center">No books available</TableCell>
         </TableRow>
       </TableBody>
     </Table>
   </div>
        
      </SidebarInset>
    </SidebarProvider>
    
  )
}

