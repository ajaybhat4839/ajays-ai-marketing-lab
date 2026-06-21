import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajay's AI Lab",
  description: "AI-powered Growth Engine. Neural marketing, autonomous SEO, and recursive branding.",
  keywords: ["AI marketing", "SEO", "neural networks", "marketing automation"],
  authors: [{ name: "Ajay" }],
  openGraph: {
    title: "Ajay's AI Lab",
    description: "AI-powered Growth Engine for your business",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased selection:bg-purple-500/30 selection:text-white">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_120%,rgba(34,211,238,0.08),transparent)]" />
        </div>
        {children}
      </body>
    </html>
  );
}