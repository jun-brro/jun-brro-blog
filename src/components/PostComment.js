"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import PasswordPrompt from "./PasswordPrompt"; // Adjust the import path as necessary

const supabase = createClientComponentClient();

export default function PostComment({ postTitle }) {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postTitle)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch comments:", error);
    } else {
      setComments(data);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const newComment = {
      post_id: postTitle,
      username,
      password,
      content: comment,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("comments").insert([newComment]);
    if (error) {
      setStatus("Failed to post comment.");
    } else {
      setStatus("Comment posted successfully!");
      setComment("");
      setUsername("");
      setPassword("");
      fetchComments();
    }
  };

  const confirmDelete = (commentId) => {
    setCommentToDelete(commentId);
    setIsPromptOpen(true);
  };

  const handleDeleteComment = async (inputPassword) => {
    const commentId = commentToDelete;
    const commentToDeleteObj = comments.find(
      (comment) => comment.id === commentId
    );

    if (commentToDeleteObj.password !== inputPassword) {
      setStatus("Incorrect password. Unable to delete comment.");
      setIsPromptOpen(false);
      return;
    }

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      setStatus("Failed to delete comment.");
    } else {
      setStatus("Comment deleted successfully!");
      setComments(comments.filter((comment) => comment.id !== commentId));
    }

    setIsPromptOpen(false);
  };

  return (
    <section className="w-full flex flex-col p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left">
          Post a Comment
        </h2>
        <form
          onSubmit={handleComment}
          className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded shadow-md"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 dark:border-gray-700 rounded bg-transparent dark:bg-gray-900 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 dark:border-gray-700 rounded bg-transparent dark:bg-gray-900 dark:text-white"
            required
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="w-full p-2 mb-2 border border-gray-300 dark:border-gray-700 rounded bg-transparent dark:bg-gray-900 dark:text-white"
            required
          />
          <button
            type="submit"
            className="mt-2 py-2 px-4 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-600 transition"
          >
            Post Comment
          </button>
          {status && <p className="mt-2 text-red-600">{status}</p>}
        </form>
        <div className="mt-8 w-full max-w-md">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow-md">
                  <p className="text-gray-800 dark:text-gray-300 mb-2">
                    <strong>{comment.username}</strong>
                  </p>
                  <p className="text-gray-800 dark:text-gray-300 mb-2">
                    {comment.content}
                  </p>
                  <p className="text-gray-600 dark:text-gray-500 text-sm">
                    {new Date(comment.created_at).toLocaleString("ko-KR", {
                      timeZone: "Asia/Seoul",
                    })}
                  </p>
                  <button
                    onClick={() => confirmDelete(comment.id)}
                    className="mt-2 py-1 px-2 bg-red-500 dark:bg-red-700 text-white rounded hover:bg-red-600 dark:hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-800 dark:text-gray-300">
              No comments found.
            </p>
          )}
        </div>
      </div>
      {isPromptOpen && (
        <PasswordPrompt
          onConfirm={handleDeleteComment}
          onCancel={() => setIsPromptOpen(false)}
        />
      )}
    </section>
  );
}
