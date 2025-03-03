import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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
  "from-blue-900 via-cyan-700 to-teal-500"
];

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [theme, setTheme] = useState(
    gradientThemes[parseInt(localStorage.getItem("themeIndex")) || 0]
  );

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (location.pathname === "/contacts") {
      setIsSidebarOpen(true);
    }
  }, [location]);

  // Preserve scroll position when switching chats
  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollPosition");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
    }

    return () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };
  }, [selectedUser]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (isMobileView) {
      setIsSidebarOpen(false);
      navigate(`/chat`);
    }
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={`
        h-full w-full lg:w-72 border-r border-base-300 flex flex-col transition-transform duration-300 
        ${isMobileView && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
        fixed lg:static top-0 left-0 bg-gradient-to-br ${theme} z-50
      `}
    >
      {/* Sidebar Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2 text-white">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Search Bar */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-2 text-gray-500 size-5" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-3 py-2 border rounded-md bg-base-100 text-sm 
              text-white transition-all duration-300 ease-in-out
              hover:bg-gray-800 hover:border-gray-500 
              focus:outline-none focus:ring-2 focus:ring-primary 
              focus:border-primary focus:bg-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Online Users Toggle */}
        <div className="mt-3 flex items-center gap-2 text-white">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {users.length > 0 ? (
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className={`
                w-full md:w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
            >
              <div className="flex items-center w-full">
                {/* User Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
                </div>

                {/* User Info */}
                <div className="text-left min-w-0 ml-3 md:ml-0 flex-grow text-white">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No matching users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
