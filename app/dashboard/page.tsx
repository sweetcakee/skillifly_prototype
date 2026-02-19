"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../components/Header";
import ResourceForm from "../components/ResourceForm";
import SkillList from "../components/SkillList";
import QuizModal from "../components/QuizModal";
import { mockTopics } from "../lib/mock";
import { Resource, Skill, Topic } from "../lib/types";

export default function TopicPage() {
  const params = useParams<{ id: string }>();
  const topicId = params.id;

  const initial = useMemo(() => {
    return mockTopics.find(t => t.id === topicId) ?? {
      id: topicId,
      title: "Neues Topic",
      goal: "Lernziel definieren",
      createdAt: new Date().toISOString(),
      resources: [],
      skills: [],
    } as Topic;
  }, [topicId]);

  const [topic, setTopic] = useState<Topic>(initial);
  const [loading, setLoading] = useState(false);

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizSkillId, setQuizSkillId] = useState<string | null>(null);

  const quizSkill = useMemo(() => {
    return topic.skills.find(s => s.id === quizSkillId) ?? null;
  }, [topic.skills, quizSkillId]);

  function addResource(r: Resource) {
    setTopic({ ...topic, resources: [r, ...topic.resources] });
  }

  async function analyze() {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: topic.title, goal: topic.goal, resources: topic.resources }),
      });
      const data = await res.json();
      setTopic({ ...topic, skills: data.skills as Skill[] });
    } finally {
      setLoading(false);
    }
  }

  function toggleSkill(id: string) {
    setTopic({
      ...topic,
      skills: topic.skills.map(s => s.id === id ? {
        ...s,
        verified: !s.verified,
        lastCheckedAt: new Date().toISOString(),
        confidence: !s.verified ? "high" : s.confidence
      } : s)
    });
  }

  function openQuiz(skillId: string) {
    setQuizSkillId(skillId);
    setQuizOpen(true);
  }

  function markPassed() {
    if (!quizSkillId) return;
    setTopic({
      ...topic,
      skills: topic.skills.map(s => s.id === quizSkillId ? {
        ...s,
        verified: true,
        confidence: "high",
        lastCheckedAt: new Date().toISOString()
      } : s)
    });
  }

  const reviewsDue = useMemo(() => {
    // simple Regel: low confidence oder unverified = Review
    return topic.skills.filter(s => !s.verified || s.confidence === "low").length;
  }, [topic.skills]);

  return (
    <div className="container">
      <Header />

      <div className="card" style={{ marginTop: 18 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <div className="h2">{topic.title}</div>
            <div className="small">{topic.goal}</div>
          </div>

          <div className="row">
            <span className="pill">
              <span className={reviewsDue > 0 ? "dotBad" : "dot"} style={{ width: 8, height: 8, borderRadius: 99, display: "inline-block" }} />
              {reviewsDue > 0 ? `${reviewsDue} Review(s) empfohlen` : "Alles im grünen Bereich"}
            </span>
            <button className="btn btnPrimary" onClick={analyze} disabled={loading || topic.resources.length === 0}>
              {loading ? "Analysiere…" : "Analyse starten"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid">
        <div>
          <div className="card" style={{ marginTop: 14 }}>
            <div className="h2">Ressourcen</div>
            <div className="list" style={{ marginTop: 10 }}>
              {topic.resources.length === 0 ? (
                <p className="p">Noch keine Ressourcen. Füge rechts etwas hinzu.</p>
              ) : (
                topic.resources.map(r => (
                  <div key={r.id} className="card" style={{ padding: 12, background: "rgba(0,0,0,.12)" }}>
                    <div className="row" style={{ justifyContent: "space-between" }}>
                      <b>{r.title}</b>
                      <span className="badge">{r.type}</span>
                    </div>
                    {r.url && <div className="small" style={{ marginTop: 6 }}>{r.url}</div>}
                    {r.note && <div className="small" style={{ marginTop: 6 }}>{r.note}</div>}
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <SkillList
              skills={topic.skills}
              onToggle={toggleSkill}
              onQuiz={openQuiz}
            />
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <ResourceForm onAdd={addResource} />

          <div className="card" style={{ marginTop: 14 }}>
            <div className="h2">Prototyp-Logik</div>
            <p className="p" style={{ marginTop: 8 }}>
              Die „Analyse“ ist hier eine Mock-API: sie schaut auf Ressourcen-Typen + Keywords und erstellt ein Skill-Set.
              Später kannst du das durch echtes Scraping + LLM ersetzen.
            </p>
            <hr className="sep" />
            <div className="small">
              Nächster Schritt wäre Persistenz (DB) + Auth + echte Extract/Analyze Pipeline. 
              Projekt verfolgen: https://github.com/sweetcakee
            </div>
          </div>
        </div>
      </div>

      <QuizModal
        open={quizOpen}
        skill={quizSkill}
        onClose={() => setQuizOpen(false)}
        onPassed={markPassed}
      />
    </div>
  );
}