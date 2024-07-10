import { getBlogsAndViews } from "@/src/utils/getBlogsAndViews";

export default async function handler(req, res) {
  try {
    console.log("API /api/blogs called");
    const sortedBlogs = await getBlogsAndViews();
    console.log("Sorted blogs from API:", sortedBlogs);
    res.status(200).json(sortedBlogs);
  } catch (error) {
    console.error("Error fetching sorted blogs:", error);
    res.status(500).json({ error: "Failed to fetch sorted blogs" });
  }
}
