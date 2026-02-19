import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="container">
      <Header />

      <h1 className="h1">Skillify</h1>
      <p className="p">
        Lerne nicht nur „Content konsumieren“. Sammle Ressourcen, lasse Skills ableiten,
        prüfe dich selbst — und halte dein Wissen durch smarte Wiederholung frisch.
      </p>

      <div className="row" style={{ marginTop: 16 }}>
        <Link className="btn btnPrimary" href="/dashboard">Zum Dashboard →</Link>
        <span className="pill">
          <span className="dot" />
          Prototyp: Mock-Analyse & Mini-Tests
        </span>
      </div>

      <div className="grid" style={{ marginTop: 22 }}>
        <div className="card">
          <div className="h2">So funktioniert’s</div>
          <ol className="p" style={{ marginTop: 10 }}>
            <li>Topic erstellen (z.B. „React Basics“)</li>
            <li>Ressourcen hinzufügen (Video/Artikel/Notiz)</li>
            <li>„Analyse“ → Skill-Set wird generiert</li>
            <li>Skills bestätigen oder Quiz starten</li>
            <li>Review-Reminder, wenn unsicher oder lange nicht wiederholt</li>
          </ol>
        </div>

        <div className="card">
          <div className="h2">Was du hier demonstrieren kannst</div>
          <div className="kpi" style={{ marginTop: 10 }}>
            <div className="kpiBox">
              <div className="small">Skill-Transparenz</div>
              <b>✅ sichtbar</b>
            </div>
            <div className="kpiBox">
              <div className="small">Messbarkeit</div>
              <b>🧪 Quiz</b>
            </div>
            <div className="kpiBox">
              <div className="small">Nachhaltigkeit</div>
              <b>🔁 Review</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
