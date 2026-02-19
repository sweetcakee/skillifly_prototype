"use client";

import { Skill } from "../lib/types";
import { daysAgo } from "../lib/utils";

export default function SkillList({
  skills,
  onToggle,
  onQuiz,
}: {
  skills: Skill[];
  onToggle: (id: string) => void;
  onQuiz: (skillId: string) => void;
}) {
  if (skills.length === 0) {
    return (
      <div className="card">
        <div className="h2">Skills</div>
        <p className="p" style={{ marginTop: 10 }}>
          Noch keine Skills. Klicke auf <b>Analyse</b>, um aus deinen Ressourcen ein Skill-Set abzuleiten.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="h2">Skill-Set</div>
        <span className="small">{skills.filter(s => s.verified).length}/{skills.length} bestätigt</span>
      </div>

      <hr className="sep" />

      <div className="list">
        {skills.map((s) => {
          const stale = daysAgo(s.lastCheckedAt) >= 7 && s.verified;
          const dotCls =
            s.confidence === "high" ? "dot" : s.confidence === "medium" ? "dotWarn" : "dotBad";

          return (
            <div key={s.id} className="card" style={{ padding: 12, background: "rgba(0,0,0,.12)" }}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div>
                  <div className="row" style={{ gap: 8 }}>
                    <span className={`dot ${dotCls}`} />
                    <b>{s.title}</b>
                    {stale && <span className="badge" style={{ background: "rgba(255,204,102,.12)" }}>Review fällig</span>}
                  </div>
                  <div className="small" style={{ marginTop: 6 }}>{s.description}</div>
                </div>

                <div className="row">
                  <button className="btn" onClick={() => onQuiz(s.id)}>Quiz</button>
                  <button className={`btn ${s.verified ? "btnPrimary" : ""}`} onClick={() => onToggle(s.id)}>
                    {s.verified ? "Bestätigt ✓" : "Bestätigen"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}