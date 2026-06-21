import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar"; // Absolute alias path resolution

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Statically exported metadata safely preserved in your Server Component layout
export const metadata: Metadata = {
  title: "INTI_CORE // Lijo Joseph",
  description: "Notes from an engineer trying to understand how things work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased font-mono select-none">
        
        {/* Your new modular navigation system */}
        <Navbar />
        
        {/* Main application body layer */}
        <main className="flex-1">
          {children}
        </main>
        
      </body>
    </html>
  );
}
