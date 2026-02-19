"use client";

import { useState } from "react";
import { Resource, ResourceType } from "../lib/types";
import { uid } from "../lib/utils";

export default function ResourceForm({ onAdd }: { onAdd: (r: Resource) => void }) {
  const [type, setType] = useState<ResourceType>("youtube");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");

  function submit() {
    if (!title.trim()) return;

    const r: Resource = {
      id: uid("res"),
      type,
      title: title.trim(),
      url: url.trim() || undefined,
      note: note.trim() || undefined,
    };
    onAdd(r);
    setTitle("");
    setUrl("");
    setNote("");
  }

  return (
    <div className="card">
      <div className="h2">Ressource hinzufügen</div>

      <div className="row" style={{ marginTop: 10 }}>
        <button className={`btn ${type === "youtube" ? "btnPrimary" : ""}`} onClick={() => setType("youtube")}>YouTube</button>
        <button className={`btn ${type === "article" ? "btnPrimary" : ""}`} onClick={() => setType("article")}>Artikel</button>
        <button className={`btn ${type === "doc" ? "btnPrimary" : ""}`} onClick={() => setType("doc")}>Dokument</button>
        <button className={`btn ${type === "note" ? "btnPrimary" : ""}`} onClick={() => setType("note")}>Notiz</button>
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          className="input"
          placeholder="Titel (z.B. 'React useState erklärt')"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {type !== "note" ? (
        <div style={{ marginTop: 10 }}>
          <input
            className="input"
            placeholder="URL (optional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      ) : (
        <div style={{ marginTop: 10 }}>
          <input
            className="input"
            placeholder="Notiz (kurz) (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )}

      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn btnPrimary" onClick={submit}>Hinzufügen</button>
        <span className="small">Prototyp: Speichert im lokalen State (kein DB)</span>
      </div>
    </div>
  );
}