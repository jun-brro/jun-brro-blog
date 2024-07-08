import InsightRoll from "@/src/components/About/InsightRoll";

const insights = [
  "3+ Awards Won from several Competitions 🏅",
  "5+ Deep Learning Projects Completed 🧠",
  "2+ Early Start Up Experience 🚀",
  "Challenging Leader 🎯",
];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
