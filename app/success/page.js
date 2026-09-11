"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen w-full bg-black text-[#FDE7EF] flex items-center justify-center p-4">
      <div className="max-w-[600px] w-full text-center">
        <p className="text-primary text-sm tracking-wide mb-3">Message received</p>
        <h1 className="text-4xl sm:text-5xl font-bold inline border-b-4 border-primary pb-1">
          Thank you!
        </h1>
        <p className="mt-8 text-accent leading-relaxed">
          Your message is on its way. I&apos;ll get back to you as soon as I can —
          pinky promise. <span className="text-primary">✨</span>
        </p>
        <p className="mt-4 text-secondary text-sm">
          In the meantime, feel free to keep exploring the portfolio.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/#contact"
            className="border-2 border-secondary bg-secondary text-black px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to contact
          </Link>
          <Link
            href="/"
            className="border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-black transition-colors duration-300"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
