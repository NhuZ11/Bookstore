"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyLogo
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/signup" className="hover:underline">
            Register
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-blue-700 p-4">
          <Link href="/" className="block py-2" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="block py-2" onClick={() => setIsOpen(false)}>
            About
          </Link>
      
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/signup" className="hover:underline">
            Register
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
