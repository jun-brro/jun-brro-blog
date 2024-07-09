"use client";
import { useState, useEffect } from "react";
import supabase from "@/src/server/supabaseClient";
import PasswordPrompt from "../PasswordPrompt";

export default function PostComment({ postTitle }) {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyUsername, setReplyUsername] = useState("");
  const [replyPassword, setReplyPassword] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("title", postTitle)
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
      title: postTitle,
      username,
      password,
      content: comment,
      created_at: new Date().toISOString(),
      parent_id: null,
    };

    const { error } = await supabase.from("comments").insert([newComment]);
    if (error) {
      setStatus("Failed to post comment.");
      alert("댓글 작성에 실패했습니다.");
    } else {
      setStatus("Comment posted successfully!");
      setComment("");
      setUsername("");
      setPassword("");
      fetchComments();
      alert("Comment posted successfully!");
    }
  };

  const handleReply = async (commentId) => {
    const newReply = {
      title: postTitle,
      username: replyUsername,
      password: replyPassword,
      content: replyContent,
      created_at: new Date().toISOString(),
      parent_id: commentId,
    };

    const { error } = await supabase.from("comments").insert([newReply]);
    if (error) {
      setStatus("Failed to post reply.");
      alert("답글 작성에 실패했습니다.");
    } else {
      setStatus("Reply posted successfully!");
      setReplyContent("");
      setReplyUsername("");
      setReplyPassword("");
      setReplyTo(null);
      fetchComments();
      alert("Reply posted successfully!");
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
      alert("Incorrect password. Unable to delete comment.");
      return;
    }

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      setStatus("Failed to delete comment.");
      alert("Failed to delete comment.");
    } else {
      setStatus("Comment deleted successfully!");
      fetchComments();
      alert("Comment deleted successfully!");
    }

    setIsPromptOpen(false);
  };

  const renderComments = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => (
        <div key={comment.id} className="mb-4 ml-4">
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
            <button
              onClick={() => setReplyTo(comment.id)}
              className="mt-2 py-1 px-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-600 transition text-sm"
            >
              Reply
            </button>
            {replyTo === comment.id && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReply(comment.id);
                }}
                className="mt-4"
              >
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={replyUsername}
                    onChange={(e) => setReplyUsername(e.target.value)}
                    className="flex-1 p-2 mb-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent dark:bg-gray-900"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={replyPassword}
                    onChange={(e) => setReplyPassword(e.target.value)}
                    className="flex-1 p-2 mb-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent dark:bg-gray-900"
                    required
                  />
                </div>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows={3}
                  className="w-full p-3 mb-2 border border-gray-300 dark:border-gray-700 rounded-3xl bg-transparent dark:bg-gray-900"
                  required
                />
                <button
                  type="submit"
                  className="py-1 px-4 bg-accentDark text-white rounded-3xl hover:bg-accentDark-hover transition"
                >
                  Post Reply
                </button>
              </form>
            )}
            {renderComments(comments, comment.id)}
          </div>
          {comments.filter((c) => c.parent_id === parentId).length > 1 && (
            <hr className="my-4 border-gray-300 dark:border-gray-700" />
          )}
        </div>
      ));
  };

  return (
    <section className="w-full flex flex-col p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
      <div className="w-full flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold dark:text-white capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left">
          Post a Comment
        </h2>
        <form
          onSubmit={handleComment}
          className="w-full p-8 bg-transparent mt-5"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 p-3 mb-4 border border-gray-300 dark:border-gray-700 rounded-3xl bg-transparent dark:bg-gray-900"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 p-3 mb-4 border border-gray-300 dark:border-gray-700 rounded-3xl bg-transparent dark:bg-gray-900"
              required
            />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            rows={5}
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-700 rounded-3xl bg-transparent dark:bg-gray-900"
            required
          />
          <button
            type="submit"
            className="w-full py-3 px-6 bg-accentDark text-white rounded-3xl hover:bg-accentDark-hover transition"
          >
            Post Comment
          </button>
          {status && <p className="mt-4 text-red-600">{status}</p>}
        </form>
        <div className="mt-8 w-full">
          {comments.length > 0 ? (
            renderComments(comments)
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
