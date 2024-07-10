"use client";
import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { slug as githubSlug } from "github-slugger";
import ViewCounter from "./ViewCounter";
import updateReadingTime from "@/src/utils/updateReadingTime";

const BlogDetails = ({ blog, slug: blogSlug }) => {
  useEffect(() => {
    updateReadingTime(blogSlug, blog.body.raw);
  }, [blogSlug, blog.body.raw]);

  return (
    <div className="bg-accent dark:bg-accentDark text-light dark:text-dark py-2 text-lg sm:text-xl font-medium rounded-lg">
      <div className="p-4 ml-3">
        <time className="block mb-2">
          {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
        </time>
        <span className="block mb-2">
          <ViewCounter slug={blogSlug} />
        </span>
        <Link
          href={`/categories/${githubSlug(blog.tags[0])}`}
          className="block mb-2 hover:scale-105 transition-transform"
        >
          #{blog.tags[0]}
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
