import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [themeIndex, setThemeIndex] = useState(
    parseInt(localStorage.getItem("themeIndex")) || 0
  );
  
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

  useEffect(() => {
    document.body.className = `bg-gradient-to-r ${gradientThemes[themeIndex]}`;
  }, [themeIndex]);

  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 via-purple-800 to-fuchsia-700">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
