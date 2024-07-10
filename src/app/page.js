// src/app/page.js

"use client";
import { useState, useEffect } from "react";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";
import { getBlogsAndViews } from "@/src/utils/getBlogsAndViews";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Home component mounted");

    const fetchBlogs = async () => {
      console.log("Fetching blogs...");
      try {
        const sortedBlogs = await getBlogsAndViews();
        console.log("Fetched and sorted blogs:", sortedBlogs);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
        console.log("Loading set to false");
      }
    };

    fetchBlogs().catch((error) => console.error("Fetch blogs error:", error));
  }, []);

  if (loading) {
    console.log("Loading blogs...");
    return <div>Loading...</div>;
  }

  console.log("Blogs loaded successfully:", blogs);

  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={blogs} />
      <FeaturedPosts blogs={blogs} />
      <RecentPosts blogs={blogs} />
    </main>
  );
}
