import { useEffect, useState } from "react";

const gradientThemes = [
    { name: "Purple Dream", gradient: "from-gray-900 via-purple-800 to-fuchsia-700" },
    { name: "Oceanic", gradient: "from-blue-900 via-indigo-700 to-purple-600" },
    { name: "Teal Breeze", gradient: "from-green-900 via-teal-700 to-blue-500" },
    { name: "Sunset Glow", gradient: "from-red-900 via-pink-700 to-yellow-500" },
    { name: "Dark Knight", gradient: "from-black via-gray-800 to-gray-600" },
    { name: "Lush Forest", gradient: "from-green-900 via-lime-700 to-emerald-500" },
    { name: "Firestorm", gradient: "from-orange-900 via-red-700 to-yellow-500" },
    { name: "Cyberpunk", gradient: "from-pink-700 via-purple-600 to-blue-500" },
    { name: "Royal Gold", gradient: "from-yellow-700 via-amber-600 to-orange-500" },
    { name: "Mystic Blue", gradient: "from-blue-900 via-cyan-700 to-teal-500" },
    { name: "Frozen Lake", gradient: "from-sky-700 via-blue-500 to-cyan-300" },
    { name: "Blazing Heat", gradient: "from-red-900 via-orange-700 to-yellow-400" },
    { name: "Midnight", gradient: "from-gray-900 via-gray-700 to-gray-500" },
    { name: "Emerald Touch", gradient: "from-green-800 via-teal-600 to-cyan-500" },
    { name: "Rosewood", gradient: "from-rose-800 via-red-600 to-orange-400" },
    { name: "Deep Space", gradient: "from-indigo-900 via-blue-700 to-violet-600" },
    { name: "Neon Rush", gradient: "from-pink-700 via-fuchsia-500 to-cyan-400" },
    { name: "Solar Flare", gradient: "from-red-800 via-orange-600 to-yellow-400" }
  ];

const MessageSkeleton = () => {
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    const storedThemeIndex = parseInt(localStorage.getItem("themeIndex"), 10);
    if (!isNaN(storedThemeIndex)) {
      setThemeIndex(storedThemeIndex);
    }
  }, []);

  const skeletonMessages = Array(6).fill(null);

  return (
    <div className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-r ${gradientThemes[themeIndex]} transition-all`}>
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="skeleton w-full h-full rounded-full" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-16 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
