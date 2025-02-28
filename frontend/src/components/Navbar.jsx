import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
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
    document.documentElement.setAttribute("data-theme", gradientThemes[themeIndex]);
    document.body.className = `bg-gradient-to-r ${gradientThemes[themeIndex]}`;
  }, [themeIndex]);

  return (
    <header className="fixed top-0 w-full z-40 bg-white/30 backdrop-blur-lg shadow-md border-b border-white/20">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Chatty</h1>
        </Link>

        {/* Right - Buttons */}
        <div className="flex items-center gap-6">
          <Link
            to="/settings"
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-all duration-300"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 transition-all duration-300"
                onClick={logout}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
