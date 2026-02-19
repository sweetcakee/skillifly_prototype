import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillify – Make learning measurable",
  description: "Prototype: Lernressourcen → Skill-Set → Selbstcheck → Wiederholung",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
