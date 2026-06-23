"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SubscribeForm from "./SubscribeForm"; // Import the extracted form component

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-100 [@media(prefers-color-scheme:dark)]:border-zinc-900 bg-zinc-50/80 [@media(prefers-color-scheme:dark)]:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xs font-bold tracking-tight text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50">
            &gt;_ INTI_CORE // LIJO_JOSEPH
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-zinc-600 [@media(prefers-color-scheme:dark)]:text-zinc-400 hover:text-zinc-900 [@media(prefers-color-scheme:dark)]:hover:text-zinc-50 transition-colors">
              /whoami
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="border border-emerald-600/30 text-emerald-600 [@media(prefers-color-scheme:dark)]:border-emerald-400/30 [@media(prefers-color-scheme:dark)]:text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-emerald-500/[0.04] transition-colors bg-transparent cursor-pointer"
            >
              [SUBSCRIBE]
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white [@media(prefers-color-scheme:dark)]:bg-zinc-950 border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800 rounded-xl p-6 shadow-xl space-y-4 z-10 text-left"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-widest text-emerald-600 [@media(prefers-color-scheme:dark)]:text-emerald-400 font-semibold">
                  &gt;_ SYS_DAEMON // NEWSLETTER_SUB
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 [@media(prefers-color-scheme:dark)]:hover:text-zinc-200 text-xs transition-colors cursor-pointer"
                >
                  [ESC]
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50">
                  Sync logs directly to your inbox.
                </h3>
                <p className="text-xs text-zinc-500 [@media(prefers-color-scheme:dark)]:text-zinc-400 leading-relaxed font-light font-sans">
                  Get notified when automated static builds push deep-dives on systems, cloud architecture, and debugging.
                </p>
              </div>

              {/* Render the clean extracted form component here */}
              <SubscribeForm />

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto text-center px-4 py-2 rounded-xl text-xs font-bold uppercase text-zinc-500 hover:bg-zinc-100 [@media(prefers-color-scheme:dark)]:hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
