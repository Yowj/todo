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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Main loading container */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl max-w-md w-full text-center relative backdrop-blur-sm">
        {/* Anime character */}
        <div className="mb-6 flex flex-col items-center">
          <div className="text-5xl mb-2 animate-bounce">
            <span className={`inline-block ${characters[currentCharacter].color}`}>
              {characters[currentCharacter].emoji}
            </span>
          </div>
          <div className="text-xs text-gray-400 animate-pulse">
            {characters[currentCharacter].text}
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Loading{dots}</h2>
          <p className="text-gray-400 text-sm">Please wait while we process your request</p>
        </div>

        {/* Status indicators */}
        <div className="mt-6 flex justify-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">System Ready</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-xs">Initializing application components...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
