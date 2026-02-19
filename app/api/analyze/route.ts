import { NextResponse } from "next/server";
import type { Resource, Skill } from "../../lib/types";
import { uid } from "../../lib/utils";

function inferSkills(topicTitle: string, goal: string, resources: Resource[]): Skill[] {
  const text = `${topicTitle} ${goal} ${resources.map(r => `${r.title} ${r.url ?? ""} ${r.note ?? ""}`).join(" ")}`.toLowerCase();

  const pool: Array<{ k: string[]; title: string; desc: string }> = [
    { k: ["react", "component", "props", "state", "usestate"], title: "Komponenten, Props & State sicher anwenden", desc: "Ich kann erklären, wann Props vs. State genutzt wird und ein Beispiel bauen." },
    { k: ["next", "routing", "app router", "layout", "page"], title: "Next.js Routing & App Router verstehen", desc: "Ich kann Pages, Layouts und dynamische Routes erklären und nutzen." },
    { k: ["sql", "join", "group by", "select"], title: "SQL Queries schreiben (SELECT/JOIN/GROUP BY)", desc: "Ich kann typische Datenabfragen formulieren und Ergebnisse interpretieren." },
    { k: ["auth", "login", "session", "jwt"], title: "Auth-Grundlagen (Sessions/JWT) einordnen", desc: "Ich kann den Unterschied erklären und Sicherheitsaspekte benennen." },
    { k: ["scrape", "crawler", "parser"], title: "Content-Extraction konzeptionieren", desc: "Ich kann beschreiben, wie Inhalte aus URLs extrahiert und normalisiert werden." },
    { k: ["learning", "spaced", "repeat", "memory"], title: "Wiederholung gezielt einsetzen", desc: "Ich kann Spaced Repetition erklären und für mich anwenden." },
  ];

  // fallback: generische Skills aus Ressourcentypen
  const generic: Skill[] = [
    { id: uid("skill"), title: "Kernaussagen aus Ressourcen extrahieren", description: "Ich kann die 3 wichtigsten Punkte pro Ressource zusammenfassen.", confidence: "medium", verified: false },
    { id: uid("skill"), title: "Begriffe & Konzepte in eigene Worte übersetzen", description: "Ich kann Definitionen ohne Copy/Paste erklären.", confidence: "low", verified: false },
  ];

  const matched = pool
    .filter(p => p.k.some(kw => text.includes(kw)))
    .slice(0, 6)
    .map(p => ({
      id: uid("skill"),
      title: p.title,
      description: p.desc,
      confidence: "medium" as const,
      verified: false,
    }));

  // kleine Heuristik: wenn viele Ressourcen, confidence leicht hoch
  const bump = resources.length >= 3;

  const skills = (matched.length ? matched : generic).map(s => ({
    ...s,
    confidence: bump ? "high" : s.confidence,
  }));

  return skills;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, goal, resources } = body as { title: string; goal: string; resources: Resource[] };

  const skills = inferSkills(title, goal, resources || []);
  return NextResponse.json({ skills });
}