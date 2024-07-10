import React, { useEffect, useState } from "react";
import BlogLayoutThree from "../Blog/BlogLayoutThree";
import { getBlogsAndViews } from "@/src/utils/getBlogsAndViews";

const RecentPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("RecentPosts component mounted");

    const fetchBlogs = async () => {
      console.log("Fetching blogs in RecentPosts...");
      try {
        const sortedBlogs = await getBlogsAndViews();
        console.log("Fetched and sorted blogs in RecentPosts:", sortedBlogs);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs in RecentPosts:", error);
      } finally {
        setLoading(false);
        console.log("Loading set to false in RecentPosts");
      }
    };

    fetchBlogs().catch((error) =>
      console.error("Fetch blogs error in RecentPosts:", error)
    );
  }, []);

  if (loading) {
    console.log("Loading blogs in RecentPosts...");
    return <div>Loading...</div>;
  }

  console.log("Blogs loaded successfully in RecentPosts:", blogs);

  return (
    <section className="w-full mt-16 sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
        Recent Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-16">
        {blogs.slice(4, 10).map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
