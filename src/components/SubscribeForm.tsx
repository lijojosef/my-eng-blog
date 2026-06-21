"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const BUTTONDOWN_USERNAME = "lijo"; 
      
      const response = await fetch(
        `https://buttondown.email/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded" 
          },
          body: new URLSearchParams({ email }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        throw new Error("SUBSCRIBE_FAIL: API rejected input payload.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "ERR_CONNECTION");
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 select-none">
          $
        </span>
        <input
          type="email"
          required
          disabled={status === "loading" || status === "success"}
          placeholder="user@domain.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="w-full bg-zinc-50 [@media(prefers-color-scheme:dark)]:bg-zinc-900/50 border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800 focus:border-emerald-600/50 [@media(prefers-color-scheme:dark)]:focus:border-emerald-400/50 rounded-xl px-4 py-2.5 pl-8 text-xs text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50 focus:outline-none transition-colors disabled:opacity-60"
        />
      </div>

      <div className="flex gap-3 justify-end pt-1">
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full sm:w-auto border border-emerald-600/30 text-emerald-600 [@media(prefers-color-scheme:dark)]:border-emerald-400/30 [@media(prefers-color-scheme:dark)]:text-emerald-400 px-5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-emerald-500/[0.04] transition-colors bg-transparent disabled:opacity-50 cursor-pointer"
        >
          {status === "loading" ? "Staging..." : status === "success" ? "Complete" : "Execute"}
        </button>
      </div>

      {/* Live Pipeline Feedbacks */}
      {status === "success" && (
        <p className="text-[10px] text-emerald-600 [@media(prefers-color-scheme:dark)]:text-emerald-400 tracking-wide mt-2">
          STATUS_OK: Verification email dispatched. Check your payload.
        </p>
      )}
      {status === "error" && (
        <p className="text-[10px] text-red-600 [@media(prefers-color-scheme:dark)]:text-red-400 tracking-wide mt-2">
          CRITICAL_ERR: {errorMessage}
        </p>
      )}
    </form>
  );
}
