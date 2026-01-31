import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [dots, setDots] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState(0);

  // Popular Naruto and One Piece characters for loading screens
  const characters = [
    { name: "Naruto", emoji: "🍥", text: "Dattebayo!", color: "text-orange-400" },
    { name: "Luffy", emoji: "👒", text: "Gomu Gomu!", color: "text-red-400" },
    { name: "Sasuke", emoji: "⚡", text: "Hn...", color: "text-purple-400" },
    { name: "Zoro", emoji: "⚔️", text: "Three swords!", color: "text-green-400" },
    { name: "Sakura", emoji: "🌸", text: "Cha!", color: "text-pink-400" },
    { name: "Sanji", emoji: "🚬", text: "All Blue!", color: "text-yellow-400" },
  ];

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 600);

    const characterInterval = setInterval(() => {
      setCurrentCharacter((prev) => (prev + 1) % characters.length);
    }, 2000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(characterInterval);
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-900">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Main content - fills the screen */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Anime character */}
        <div className="text-9xl mb-6 animate-bounce">
          <span className={`inline-block ${characters[currentCharacter].color}`}>
            {characters[currentCharacter].emoji}
          </span>
        </div>

        {/* Character text */}
        <div className="text-2xl text-gray-400 animate-pulse mb-12">
          {characters[currentCharacter].text}
        </div>

        {/* Loading text */}
        <h2 className="text-4xl font-semibold text-white mb-4">Loading{dots}</h2>
        <p className="text-gray-400 text-lg">Please wait while we process your request</p>
      </div>

      {/* Footer - pinned to bottom */}
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">System Ready</span>
        </div>
        <p className="text-gray-500 text-sm">Initializing application components...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
