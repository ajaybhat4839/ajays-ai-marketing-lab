import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajay's AI Marketing Lab",
  description: "Ai powered Growth Engine for your business, built by ajay",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark"> 
      {/* We add "dark" class because high-tech apps look best in Dark Mode */}
      <body className="bg-black text-white antialiased selection:bg-cyan-500/30">
        {/* Modern Background Effect (Free/CSS Only) */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        {children}
      </body>
    </html>
  );
}