"use client";

import { useMemo, useState } from "react";
import { Skill } from "../lib/types";

type Question = {
  q: string;
  options: string[];
  correctIndex: number;
};

function buildQuestions(skill: Skill): Question[] {
  // simpel & generisch – reicht für Prototyp
  return [
    {
      q:` Welche Aussage passt am besten zu: "${skill.title}"?`,
      options: [
        "Ich kann das Konzept erklären und auf ein Beispiel anwenden.",
        "Ich habe den Begriff mal gehört, aber kann ihn nicht erklären.",
        "Ich kenne nur die Definition auswendig.",
      ],
      correctIndex: 0,
    },
    {
      q: "Was ist ein gutes Zeichen für echtes Verständnis?",
      options: [
        "Ich kann es in eigenen Worten erklären und Fehler erkennen.",
        "Ich kann es 1:1 aus einem Video nachsprechen.",
        "Ich erinnere mich an den Thumbnail-Titel.",
      ],
      correctIndex: 0,
    },
  ];
}

export default function QuizModal({
  open,
  skill,
  onClose,
  onPassed,
}: {
  open: boolean;
  skill: Skill | null;
  onClose: () => void;
  onPassed: () => void;
}) {
  const questions = useMemo(() => (skill ? buildQuestions(skill) : []), [skill]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!open || !skill) return null;

  function pick(optionIndex: number) {
    const q = questions[idx];
    const ok = optionIndex === q.correctIndex;
    const nextScore = score + (ok ? 1 : 0);

    if (idx === questions.length - 1) {
      setScore(nextScore);
      setDone(true);
      return;
    }
    setScore(nextScore);
    setIdx(idx + 1);
  }

  function resetAndClose() {
    setIdx(0);
    setScore(0);
    setDone(false);
    onClose();
  }

  const passed = done && score >= Math.ceil(questions.length * 0.7);

  return (
    <div className="modalOverlay" onClick={resetAndClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <b>Mini-Quiz</b>
          <button className="btn" onClick={resetAndClose}>Schließen</button>
        </div>

        <p className="small" style={{ marginTop: 6 }}>
          Skill: <b>{skill.title}</b>
        </p>

        <hr className="sep" />

        {!done ? (
          <>
            <div className="h2">{questions[idx].q}</div>
            <div className="list" style={{ marginTop: 10 }}>
              {questions[idx].options.map((opt, i) => (
                <button key={i} className="btn" style={{ textAlign: "left", borderRadius: 14 }} onClick={() => pick(i)}>
                  {opt}
                </button>
              ))}
            </div>
            <div className="small" style={{ marginTop: 10 }}>
              Frage {idx + 1} / {questions.length}
            </div>
          </>
        ) : (
          <>
            <div className="h2">{passed ? "Bestanden ✅" : "Noch unsicher 🔁"}</div>
            <p className="p" style={{ marginTop: 8 }}>
              Score: <b>{score}</b> / {questions.length}
            </p>

            <div className="row" style={{ marginTop: 10 }}>
              {passed ? (
                <button
                  className="btn btnPrimary"
                  onClick={() => {
                    onPassed();
                    resetAndClose();
                  }}
                >
                  Skill als bestätigt markieren
                </button>
              ) : (
                <button className="btn" onClick={() => { setIdx(0); setScore(0); setDone(false); }}>
                  Nochmal versuchen
                </button>
              )}
              <button className="btn" onClick={resetAndClose}>Schließen</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
