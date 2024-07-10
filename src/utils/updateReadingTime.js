import supabase from "@/src/server/supabaseClient";
import readingTime from "reading-time";

export default async function updateReadingTime(slug, content) {
  const readingStats = readingTime(content);

  const { data, error } = await supabase
    .from("views")
    .upsert({ slug, readingTime: readingStats.text }, { onConflict: ["slug"] });

  if (error) {
    console.error("Failed to update reading time:", error);
  } else {
    console.log("Reading time updated:", data);
  }
}
