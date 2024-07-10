import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Tag from "../Elements/Tag";
import { slug } from "github-slugger";

const HomeCoverSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("HomeCoverSection component mounted");

    const fetchBlogs = async () => {
      console.log("Fetching blogs in HomeCoverSection...");
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const sortedBlogs = await response.json();
        console.log(
          "Fetched and sorted blogs in HomeCoverSection:",
          sortedBlogs
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs in HomeCoverSection:", error);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogs.length) {
    return <div>No blogs available.</div>;
  }

  const topBlog = blogs[0];

  return (
    <div className="w-full inline-block">
      <article className="flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]">
        <div
          className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0
            "
        />
        {topBlog.image && (
          <Image
            src={topBlog.image.filePath.replace("../public", "")}
            placeholder="blur"
            blurDataURL={topBlog.image.blurhashDataUrl}
            alt={topBlog.title}
            fill
            className="w-full h-full object-center object-cover rounded-3xl -z-10"
            sizes="100vw"
            priority
          />
        )}
        <div className="w-full lg:w-3/4 p-6 sm:p-8 md:p-12  lg:p-16 flex flex-col items-start justify-center z-0 text-light">
          <Tag
            link={`/categories/${slug(topBlog.tags[0])}`}
            name={topBlog.tags[0]}
          />
          <Link href={topBlog.url} className="mt-6">
            <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
              <span
                className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
              >
                {topBlog.title}
              </span>
            </h1>
          </Link>
          <p className="hidden  sm:inline-block mt-4 md:text-lg lg:text-xl font-in">
            {topBlog.description}
          </p>
        </div>
      </article>
    </div>
  );
};

export default HomeCoverSection;
