import React, { useEffect, useState } from "react";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";
import { getBlogsAndViews } from "@/src/utils/getBlogsAndViews";

const FeaturedPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("FeaturedPosts component mounted");

    const fetchBlogs = async () => {
      console.log("Fetching blogs in FeaturedPosts...");
      try {
        const sortedBlogs = await getBlogsAndViews();
        console.log("Fetched and sorted blogs in FeaturedPosts:", sortedBlogs);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs in FeaturedPosts:", error);
      } finally {
        setLoading(false);
        console.log("Loading set to false in FeaturedPosts");
      }
    };

    fetchBlogs().catch((error) =>
      console.error("Fetch blogs error in FeaturedPosts:", error)
    );
  }, []);

  if (loading) {
    console.log("Loading blogs in FeaturedPosts...");
    return <div>Loading...</div>;
  }

  console.log("Blogs loaded successfully in FeaturedPosts:", blogs);

  return (
    <section className="w-full mt-16 sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
        Popular Posts
      </h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-10 sm:mt-16">
        <article className="col-span-2 sxl:col-span-1 row-span-2 relative">
          <div className="block sm:hidden">
            <BlogLayoutTwo blog={blogs[1]} />
          </div>
          <div className="hidden sm:block">
            <BlogLayoutOne blog={blogs[1]} />
          </div>
        </article>
        <article className="col-span-2 sm:col-span-1 row-span-1 relative">
          <BlogLayoutTwo blog={blogs[2]} />
        </article>
        <article className="col-span-2 sm:col-span-1 row-span-1 relative">
          <BlogLayoutTwo blog={blogs[3]} />
        </article>
      </div>
    </section>
  );
};

export default FeaturedPosts;
