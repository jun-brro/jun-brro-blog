import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";

const BlogLayoutOne = ({ blog }) => {
  return (
    <div className="group inline-block overflow-hidden rounded-xl w-full">
      <Image
        src={blog.image.filePath.replace("../public", "")}
        placeholder="blur"
        blurDataURL={blog.image.blurhashDataUrl}
        alt={blog.title}
        width={blog.image.width}
        height={blog.image.height}
        className="w-full h-60 object-center object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300"
        sizes="(max-width: 1180px) 100vw, 50vw"
      />

      <div className="w-auto px-4 xs:px-6 mt-4">
        <Tag
          link={`/categories/${slug(blog.tags[0])}`}
          name={blog.tags[0]}
          className="px-6 text-xs sm:text-sm py-1 sm:py-2 !border"
        />
        <Link href={blog.url} className="mt-4 block">
          <h2 className="font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-black dark:text-light mt-2 sm:mt-4">
            <span
              className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50
                group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {blog.title}
            </span>
          </h2>
        </Link>
        <p className="hidden sm:inline-block mt-4 text-black dark:text-light md:text-lg lg:text-xl font-in">
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default BlogLayoutOne;
