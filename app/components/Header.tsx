import Link from "next/link";

export default function Header() {
  return (
    <div className="topbar">
      <div className="brand">
        <span style={{
          width: 28, height: 28, borderRadius: 10,
          background: "linear-gradient(135deg, rgba(124,92,255,.9), rgba(54,214,198,.85))",
          display: "inline-block"
        }} />
        <span>Skillify</span>
        <span className="badge">prototype</span>
      </div>

      <div className="row">
        <Link className="btn" href="/">Home</Link>
        <Link className="btn" href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}