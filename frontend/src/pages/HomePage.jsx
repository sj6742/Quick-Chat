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

  useEffect(() => {
    document.body.className = `bg-gradient-to-r ${gradientThemes[themeIndex]}`;
  }, [themeIndex]);

  return (
    <div className={`h-screen bg-gradient-to-br ${gradientThemes[themeIndex]}`}>
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
