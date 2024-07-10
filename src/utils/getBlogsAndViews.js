import { allBlogs } from "contentlayer/generated";
import supabase from "../server/supabaseClient";

export const getBlogsAndViews = async () => {
  // 모든 블로그 게시물 가져오기
  const blogs = allBlogs;

  // Supabase에서 조회수 데이터 가져오기
  const { data: views, error: viewsError } = await supabase
    .from("views")
    .select("*");

  if (viewsError) {
    console.error("Error fetching views:", viewsError);
    return blogs; // 조회수를 가져오지 못한 경우, 원래의 블로그 목록 반환
  }

  // 조회수를 블로그와 매칭
  const blogsWithViews = blogs.map((blog) => {
    const blogViews = views.find(
      (view) => view.slug === blog._raw.sourceFileDir
    );
    return {
      ...blog,
      views: blogViews ? blogViews.count : 0,
    };
  });

  console.log("Blogs with views: ", blogsWithViews); // 로깅 추가

  // 조회수를 기준으로 내림차순 정렬
  const sortedByViews = blogsWithViews.sort((a, b) => b.views - a.views);

  return sortedByViews;
};
