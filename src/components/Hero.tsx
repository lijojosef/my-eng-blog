"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full py-20 md:py-32 font-mono select-none tracking-tight">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          {/* Pulsing Terminal Identifier */}
          <p className="text-xs uppercase tracking-widest text-emerald-600 [@media(prefers-color-scheme:dark)]:text-emerald-400 font-semibold animate-pulse">
            &gt;_ ENGINEERING_FOR_DUMMIES // LIJO_JOSEPH
          </p>

          {/* High-contrast Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50 !mt-4">
            Notes from an engineer trying to understand how things work.
          </h1>

          {/* Subtext aligned with system color boundaries */}
          <p className="max-w-2xl text-xs md:text-sm leading-relaxed font-light text-zinc-600 [@media(prefers-color-scheme:dark)]:text-zinc-400 !mt-6">
            I write about systems, cloud architecture, AI, and the lessons
            learned from building and debugging software.
          </p>

          {/* Terminal Bracketed Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 !mt-8">
            <a
              href="#posts"
              className="border border-emerald-600/30 text-emerald-600 [@media(prefers-color-scheme:dark)]:border-emerald-400/30 [@media(prefers-color-scheme:dark)]:text-emerald-400 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-emerald-500/[0.04] transition-colors bg-transparent text-center"
            >
              [READ THE BLOG]
            </a>

            <a
              href="https://github.com/lijojosef"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-zinc-100/50 [@media(prefers-color-scheme:dark)]:hover:bg-zinc-900/40 transition-colors bg-transparent text-center text-zinc-700 [@media(prefers-color-scheme:dark)]:text-zinc-300"
            >
              [CONNECT_ON_GITHUB]
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
