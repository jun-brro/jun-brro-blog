"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default function PostComment({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("");
  const [reply, setReply] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch comments:", error);
    } else {
      setComments(data);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getSession();
    if (!user) {
      setStatus("Please log in to comment.");
      return;
    }

    const newComment = {
      post_id: postId,
      user_id: user.id,
      content: comment,
      created_at: new Date().toISOString(),
      parent_id: replyTo || null,
    };

    const { error } = await supabase.from("comments").insert([newComment]);
    if (error) {
      setStatus("Failed to post comment.");
    } else {
      setStatus("Comment posted successfully!");
      setComment("");
      setReplyTo(null);
      fetchComments();
    }
  };

  const handleReply = (commentId) => {
    setReplyTo(commentId);
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
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-transparent dark:bg-gray-900 dark:text-white"
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
                  <strong>{comment.user_id}</strong>
                </p>
                <p className="text-gray-800 dark:text-gray-300 mb-2">
                  {comment.content}
                </p>
                <p className="text-gray-600 dark:text-gray-500 text-sm">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
                <button
                  onClick={() => handleReply(comment.id)}
                  className="mt-2 py-1 px-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-600 transition text-sm"
                >
                  Reply
                </button>
              </div>
              {comments
                .filter((c) => c.parent_id === comment.id)
                .map((reply) => (
                  <div
                    key={reply.id}
                    className="ml-4 mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded shadow-md"
                  >
                    <p className="text-gray-800 dark:text-gray-300 mb-2">
                      <strong>{reply.user_id}</strong>
                    </p>
                    <p className="text-gray-800 dark:text-gray-300 mb-2">
                      {reply.content}
                    </p>
                    <p className="text-gray-600 dark:text-gray-500 text-sm">
                      {new Date(reply.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p className="text-gray-800 dark:text-gray-300">No comments found.</p>
        )}
      </div>
    </div>
  );
}
