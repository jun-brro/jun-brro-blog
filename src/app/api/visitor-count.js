import supabase from "@/src/server/supabaseClient";

export default async function handler(req, res) {
  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜 (KST)

  if (req.method === "GET") {
    // 오늘의 방문자 수 가져오기
    const { data: todayData, error: todayError } = await supabase
      .from("visitor_counts")
      .select("*")
      .eq("date", today)
      .single();

    if (todayError && todayError.code !== "PGRST116") {
      return res.status(500).json({ error: todayError.message });
    }

    const todayCount = todayData ? todayData.count : 0;

    // 총 방문자 수 계산하기
    const { data: totalData, error: totalError } = await supabase
      .from("visitor_counts")
      .select("count");

    if (totalError) {
      return res.status(500).json({ error: totalError.message });
    }

    const totalCount = totalData.reduce((sum, row) => sum + row.count, 0);

    return res.status(200).json({ todayCount, totalCount });
  }

  if (req.method === "POST") {
    // 오늘의 방문자 수 업데이트
    const { data: todayData, error: todayError } = await supabase
      .from("visitor_counts")
      .upsert({ date: today, count: 1 }, { onConflict: "date" });

    if (todayError) {
      return res.status(500).json({ error: todayError.message });
    }

    return res.status(200).json({ message: "Visitor count updated" });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
