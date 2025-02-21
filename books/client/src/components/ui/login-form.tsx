'use client';
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/utils/authService";
import { useRouter } from 'next/router';
import Link from "next/link";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  // const router = useRouter(); // Use the router for redirection

  // Email validation function
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear errors on input change
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { email?: string; password?: string } = {};

    // Email Validation
    // if (!formData.email.trim()) {
    //   validationErrors.email = "Email is required.";
    // } else if (!validateEmail(formData.email)) {
    //   validationErrors.email = "Enter a valid email.";
    // }

    // Password Validation
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    // If there are errors, prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Call the login function from the auth service
      await login(formData);
      window.location.href = '/userdashboard';

      // On successful login, redirect to the dashboard
      // router.push('/dashboard');
    } catch (err) {
      console.error('Invalid username or password');
      alert("Login failed, please check your credentials.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 bg-[#F5F1E3]", className)} {...props}>
      <Card className="bg-[#EDE0D4]">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center text-[#2C3E50]">
            Welcome to Book Heaven
          </CardTitle>
          <CardDescription className="text-[#4A4A4A] text-center">
            Login to explore and manage your bookstore collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Email Input */}
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-[#2C3E50]">
                  Name
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter Your Name"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-[#FAF3E0] border-[#8B5E3C]"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-[#2C3E50]">Password</Label>
                  <a href="#" className="ml-auto text-sm text-[#8B5E3C] underline-offset-4 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-[#FAF3E0] border-[#8B5E3C]"
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-[#8B5E3C] text-white hover:bg-[#6D4C41]">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-[#4A4A4A]">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4 text-[#8B5E3C]">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
