"use client";
import { useState } from "react";
import supabase from "../server/supabaseClient.js";
import { XIcon } from "@heroicons/react/solid";

const SignupForm = ({ setIsLogin, closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      const user = supabase.auth.user();
      const { error: insertError } = await supabase
        .from("users")
        .insert([{ id: user.id, email, username }]);

      if (insertError) {
        alert(insertError.message);
      } else {
        closeModal();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white dark:bg-black text-dark dark:text-light p-6 sm:p-10 md:p-12 rounded-lg shadow-lg transform transition-transform duration-300 animate-fadeIn">
        <button onClick={closeModal} className="absolute top-4 right-4">
          <XIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100" />
        </button>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-dark"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-dark"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-dark"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-accent hover:bg-accent/80 dark:bg-accentDark dark:hover:bg-accentDark/80 text-white dark:text-black rounded transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => setIsLogin(true)}
            className="text-accent hover:underline dark:text-accentDark cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
