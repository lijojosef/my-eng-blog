"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="
              text-sm
              font-mono
              uppercase
              tracking-[0.3em]
              text-emerald-600
            "
          >
            Lijo Joseph
          </p>

          <h1
            className="
              mt-8
              text-5xl
              sm:text-6xl
              md:text-7xl
              font-bold
              tracking-tight
              leading-[1.05]
            "
          >
            Notes from an engineer trying to understand how things work.
          </h1>

          <p
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-relaxed
              text-zinc-600
              dark:text-zinc-400
            "
          >
            I write about systems, cloud architecture, AI, and the lessons
            learned from building and debugging software.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#posts"
              className="
                rounded-lg
                bg-emerald-600
                px-6
                py-3
                font-medium
                text-white
                hover:bg-emerald-700
                transition-colors
              "
            >
              Read the blog
            </a>

            <a
              href="https://github.com/lijojosef"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-lg
                border
                border-border
                px-6
                py-3
                font-medium
                hover:bg-zinc-100
                dark:hover:bg-zinc-900
                transition-colors
              "
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
