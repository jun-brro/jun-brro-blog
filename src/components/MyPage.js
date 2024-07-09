"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "../context/AuthContext";

const supabase = createClientComponentClient();

const MyPage = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserInfo();
      fetchUserComments();
    }
  }, [user]);

  const fetchUserInfo = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setUserInfo(data);
    }
  };

  const fetchUserComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
    } else {
      setComments(data);
    }
  };

  const handleDeleteAccount = async () => {
    const { error } = await supabase.auth.admin.deleteUser(user.id);

    if (error) {
      setStatus("Failed to delete account.");
    } else {
      setStatus("Account deleted successfully.");
      // 로그아웃 및 리디렉션 로직 추가 필요
    }
  };

  return (
    <section className="w-full flex flex-col p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
      <span className="font-semibold text-lg sm:text-3xl md:text-4xl text-accent dark:text-accentDark">
        My Page
      </span>
      {userInfo && (
        <div className="mt-8 mb-12 p-4 sm:p-6 md:p-8 dark:bg-gray-800 bg-gray-100 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
              User Information
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-300 mb-2">
              <strong>Username:</strong> {userInfo.username}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-300 mb-2">
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-300 mb-2">
              <strong>ID:</strong> {userInfo.id}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
          My Comments
        </h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 p-4 sm:p-6 md:p-8 dark:bg-gray-800 bg-gray-100 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600"
            >
              <p className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-300 mb-2">
                {comment.content}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-500">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-300">
            No comments found.
          </p>
        )}
      </div>
      <button
        onClick={handleDeleteAccount}
        className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-8 w-auto text-center"
      >
        Delete Account
      </button>

      {status && <p className="mt-4 text-red-600">{status}</p>}
    </section>
  );
};

export default MyPage;
