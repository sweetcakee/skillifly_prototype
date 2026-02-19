import { Topic } from "./types";

const FIXED_NOW = "2026-01-01T00:00:00.000Z";

export const mockTopics: Topic[] = [
  {
    id: "react_basics",
    title: "React Basics",
    goal: "Ich will Komponenten, State & Props sicher erklären und anwenden können.",
    createdAt: FIXED_NOW,
    resources: [
      { id: "r1", type: "youtube", title: "React in 20 Minutes", url: "https://youtube.com/" },
      { id: "r2", type: "article", title: "Thinking in React", url: "https://react.dev/" },
      { id: "r3", type: "note", title: "Eigene Notizen", note: "State = Daten, Props = Übergabe, UI = Funktion(State)" },
    ],
    skills: [],
  },
  {
    id: "sql_foundation",
    title: "SQL Foundation",
    goal: "SELECT/JOIN/GROUP BY verstehen und typische Queries schreiben.",
    createdAt: FIXED_NOW,
    resources: [
      { id: "s1", type: "article", title: "SQL Joins erklärt", url: "https://example.com/" },
    ],
    skills: [],
  },
];
