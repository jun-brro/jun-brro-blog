"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      const user = data.user;
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({ id: user.id, nickname });
      if (profileError) {
        setError(profileError.message);
      } else {
        router.push("/login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left">
          Sign Up
        </h2>
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded shadow-md"
        >
          {error && <p className="mb-4 text-red-600">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded w-full bg-transparent"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded w-full bg-transparent"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded w-full bg-transparent"
              required
              autoComplete="nickname"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
