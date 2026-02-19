import Link from "next/link";
import { Topic } from "../lib/types";

export default function TopicCard({ topic }: { topic: Topic }) {
  const resourceCount = topic.resources.length;
  const skillCount = topic.skills.length;

  return (
    <Link href={`/topic/${topic.id}`} className="card" style={{ display: "block" }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="h2">{topic.title}</div>
          <div className="small">{topic.goal}</div>
        </div>

        <span className="pill">
          <span className="dot" />
          {resourceCount} Ressourcen · {skillCount || "—"} Skills
        </span>
      </div>
    </Link>
  );
}
