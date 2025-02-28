import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

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

const NoChatSelected = () => {
  const [theme, setTheme] = useState(
    gradientThemes[parseInt(localStorage.getItem("themeIndex")) || 0]
  );

  useEffect(() => {
    const storedThemeIndex = parseInt(localStorage.getItem("themeIndex")) || 0;
    setTheme(gradientThemes[storedThemeIndex]);
  }, []);

  return (
    <div className={`w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br ${theme} text-gray-200`}>
      <div className="max-w-md text-center space-y-6 bg-gray-900/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-700">
        
        {/* Icon Display */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center animate-bounce shadow-lg transition-transform transform hover:scale-110">
              <MessageSquare className="w-8 h-8 text-fuchsia-400" />
            </div>
          </div>
        </div>

        

        {/* Welcome Text */}
        <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">Welcome to Chatty!</h2>
        <p className="text-gray-300 text-lg">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
