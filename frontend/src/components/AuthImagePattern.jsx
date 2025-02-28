import { useState, useEffect } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("themeIndex") || "from-blue-900 via-purple-700 to-fuchsia-500"
  );

  useEffect(() => {
    const storedThemeIndex = parseInt(localStorage.getItem("themeIndex"));
    const gradientThemes = [
      "from-gray-900 via-purple-800 to-fuchsia-700",
      "from-blue-900 via-indigo-700 to-purple-600",
      "from-green-900 via-teal-700 to-blue-500",
      "from-red-900 via-pink-700 to-yellow-500",
      "from-black via-gray-800 to-gray-600",
      "from-green-900 via-lime-700 to-emerald-500",
      "from-orange-900 via-red-700 to-yellow-500",
      "from-pink-700 via-purple-600 to-blue-500",
      "from-yellow-700 via-amber-600 to-orange-500",
      "from-blue-900 via-cyan-700 to-teal-500",
      "from-sky-700 via-blue-500 to-cyan-300",
      "from-red-900 via-orange-700 to-yellow-400",
      "from-gray-900 via-gray-700 to-gray-500",
      "from-green-800 via-teal-600 to-cyan-500",
      "from-rose-800 via-red-600 to-orange-400",
      "from-indigo-900 via-blue-700 to-violet-600",
      "from-pink-700 via-fuchsia-500 to-cyan-400",
      "from-red-800 via-orange-600 to-yellow-400"
  
    ];
    setTheme(gradientThemes[storedThemeIndex] || theme);
  }, []);

  return (
    <div className={`hidden lg:flex items-center justify-center bg-gradient-to-r ${theme} p-12 text-gray-100`}>
      <div className="max-w-md text-center transform transition duration-500 hover:scale-105">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg transition-all duration-500 ${
                i % 2 === 0 ? "animate-bounce" : "animate-pulse"
              }`}
            />
          ))}
        </div>
        <h2 className="text-3xl font-extrabold mb-4 drop-shadow-md">{title}</h2>
        <p className="text-gray-300 text-lg font-light drop-shadow-sm">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
