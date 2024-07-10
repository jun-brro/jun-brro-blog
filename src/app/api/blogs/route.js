import { getBlogsAndViews } from "@/src/utils/getBlogsAndViews";

export async function GET() {
  try {
    const sortedBlogs = await getBlogsAndViews();
    return new Response(JSON.stringify(sortedBlogs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching sorted blogs:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch sorted blogs" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
