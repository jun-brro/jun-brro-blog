"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default function PostComment({ postId }) {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getSession();
    if (!user) {
      setStatus("Please log in to comment.");
      return;
    }

    const { error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, user_id: user.id, content: comment }]);
    if (error) {
      setStatus("Failed to post comment.");
    } else {
      setStatus("Comment posted successfully!");
      setComment("");
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
      <h2 className="font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left">
        Post a Comment
      </h2>
      <form
        onSubmit={handleComment}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded shadow-md"
      >
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          className="w-full p-2 border border-gray-300 rounded bg-transparent"
          required
        />
        <button
          type="submit"
          className="mt-2 py-2 px-4 bg-blue-500 text-white rounded"
        >
          Post Comment
        </button>
        {status && <p className="mt-2 text-red-600">{status}</p>}
      </form>
    </div>
  );
}
