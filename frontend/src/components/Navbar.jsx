import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";


const Navbar = () => {
  const { logout, authUser } = useAuthStore();

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