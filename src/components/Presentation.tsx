"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";

interface PresentationProps {
  slides: React.ReactNode[];
  title: string;
}

export default function Presentation({ slides, title }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape" && isFullscreen) exitFullscreen();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isFullscreen]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide((s) => s + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide((s) => s - 1);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (err) {
        console.error(`Error attempting to enable full-screen mode: ${err}`);
      }
    } else {
      exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-center justify-center w-full relative group transition-all duration-300 select-none ${
isFullscreen ? "min-h-screen bg-background p-0" : "min-h-[70vh]"
}`}
    >
      {/* Absolute layout wrapper prevents layout jumping during cross-fade */}
      <div className="w-full h-full flex flex-col items-center justify-center flex-1 py-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }} // Custom cubic-bezier for liquid response
            className={`w-full text-center ${
isFullscreen ? "max-w-none h-full flex flex-col justify-center items-center px-0" : "max-w-3xl px-6"
}`}
          >
            <div className={`prose prose-zinc dark:prose-invert max-w-none ${isFullscreen ? "w-full" : ""}`}>
              {slides[currentSlide]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-10 pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={mounted ? currentSlide === 0 : undefined}
            className="pointer-events-auto p-3 rounded-full bg-muted border border-border disabled:opacity-30 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="text-sm font-mono text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="pointer-events-auto p-3 rounded-full bg-muted border border-border hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
          </button>
          <button
            onClick={nextSlide}
            disabled={mounted ? currentSlide === slides.length - 1 : undefined}
            className="pointer-events-auto p-3 rounded-full bg-muted border border-border disabled:opacity-30 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
