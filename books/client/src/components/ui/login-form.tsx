'use client'
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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-6 bg-[#F5F1E3] ", className)}
      {...props}
    >
      <Card className="bg-[#EDE0D4] ">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center text-[#2C3E50]">
            Welcome to Book Heaven 
          </CardTitle>
          <CardDescription className="text-[#4A4A4A] text-center">
            Login to explore and manage your bookstore collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* Email Input */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[#2C3E50]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-[#FAF3E0] border-[#8B5E3C] "
                  
                />
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-[#2C3E50]">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-[#8B5E3C] underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-[#FAF3E0] border-[#8B5E3C] "
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#8B5E3C] text-white hover:bg-[#6D4C41]"
              >
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
