import React from "react";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex gap-3 flex-col max-w-[450px] items-center justify-between">
        <h1 className="text-white/60">Base Watch</h1>
        <p className="text-4xl font-bold text-center text-white">
          Your go-to solution for monitoring and managing your portfolio.
        </p>
        <p className="text-sm text-white/60 text-center">
          Get started by navigating to the dashboard.
        </p>
        <a
          href="/portfolio"
          className="mt-2 px-4 py-2 bg-blue-600 text-xs text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
      <p className="mt-4 text-xs text-white/40">
        © 2025 Base Watch. All rights reserved.
      </p>
    </div>
  );
}
