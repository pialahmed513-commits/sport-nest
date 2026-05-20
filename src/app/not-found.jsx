"use client";

import Link from "next/link";
import { FaHome, FaFutbol, FaExclamationTriangle } from "react-icons/fa";

export default function GlobalNotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#030608] px-5 text-white">
      {/* Glowing Icon Container */}
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-4 ring-red-500/5 animate-bounce">
        <FaExclamationTriangle className="text-6xl" />
        <div className="absolute -inset-1 rounded-full bg-red-500/20 blur-xl opacity-50" />
      </div>

      {/* 404 Big Heading */}
      <h1 className="mt-8 text-8xl font-black tracking-widest sm:text-9xl">
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          404
        </span>
      </h1>

      {/* Error Message */}
      <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
        Oops! Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-center text-base leading-relaxed text-[#a7b0b8]">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable. Click below to go back safely!
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
        {/* Home Link Button */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-6 py-4 font-extrabold text-[#020609] transition hover:scale-[1.02] shadow-lg shadow-[#00d18f]/10"
        >
          <FaHome className="text-lg" />
          Go to Home
        </Link>

        {/* Facilities Link Button */}
        <Link
          href="/facilities"
          className="flex items-center justify-center gap-2 rounded-2xl border border-[#2a3238] bg-[#071014] px-6 py-4 font-bold text-[#a7b0b8] transition hover:border-[#00d18f] hover:text-white"
        >
          <FaFutbol className="text-lg text-[#00d18f]" />
          Explore Facilities
        </Link>
      </div>
    </section>
  );
}