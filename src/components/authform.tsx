// /components/AuthForm.tsx
"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  onSubmit: (
    action: "login" | "signup",
    formData: FormData
  ) => Promise<{
    success: boolean;
    errors?: { email?: string[]; password?: string[] };
  }>;
}

export default function AuthForm({ onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});
  const router = useRouter();
  const supabase = createClient();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (action: "login" | "signup") => {
    setErrors({});
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const result = await onSubmit(action, formData);
      if (result && !result.success && result.errors) {
        setErrors(result.errors);
      } else {
        router.push("/private");
        router.refresh();
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setErrors({ email: ["An unexpected error occurred. Please try again."] });
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Error signing in with Google:", error);
      setErrors({ email: [error.message] });
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Login or Sign Up</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <div className="space-y-4">
          <button
            onClick={() => handleSubmit("login")}
            type="button"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => handleSubmit("signup")}
            type="button"
            className="w-full bg-transparent text-gray-500 border border-0.5 border-gray-300  bg-gray-500 hover:text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Daftar Baru
          </button>
        </div>
      </form>
      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full bg-transparent text-gray-500 border border-0.5 border-gray-300  hover:text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Masuk melalui Google
        </button>
      </div>
    </div>
  );
}
