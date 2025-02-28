import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Bell } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, newMessage } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [popupUser, setPopupUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (newMessage && newMessage.senderId !== selectedUser?._id) {
      const sender = users.find(user => user._id === newMessage.senderId);
      if (sender) {
        setPopupUser(sender);
        setTimeout(() => setPopupUser(null), 3000);
      }
    }
  }, [newMessage, selectedUser, users]);

  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-700 bg-gradient-to-br from-gray-900 via-purple-800 to-fuchsia-700 shadow-lg backdrop-blur-md p-4 flex flex-col transition-all duration-200 relative">
      
      {/* Sidebar Header */}
      <div className="border-b border-gray-700 pb-4 w-full">
        <div className="flex items-center gap-2 text-gray-200">
          <Users className="size-6 text-fuchsia-400" />
          <span className="font-semibold hidden lg:block">Contacts</span>
        </div>

        {/* Show Online Only Toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm accent-fuchsia-500"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-gray-400">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map(user => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 rounded-lg transition-all 
            ${
              selectedUser?._id === user._id
                ? "bg-fuchsia-600/40 ring-2 ring-fuchsia-400 shadow-lg"
                : "hover:bg-fuchsia-600/20"
            }`}
          >
            {/* Avatar with Online Indicator */}
            <div className="relative mx-auto lg:mx-0">
              <img src={user.profilePic || "/avatar.png"} alt={user.name} className="size-12 object-cover rounded-full border-2 border-fuchsia-500 shadow-md" />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-gray-900" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0 text-gray-200">
              <div className={`font-medium truncate ${newMessage?.senderId === user._id ? "font-bold text-blue-400" : ""}`}>
                {user.fullName}
              </div>
              <div className="text-sm text-gray-400">
                {newMessage?.senderId === user._id ? "Sent a message!" : onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && <div className="text-center text-gray-400 py-4">No online users</div>}
      </div>

      {/* New Message Notification Popup */}
      {popupUser && (
        <div className="absolute bottom-5 left-5 bg-gray-900/90 shadow-lg rounded-lg p-3 flex items-center gap-3 animate-fade-in border border-gray-700">
          <Bell className="text-blue-400" />
          <div className="text-sm text-gray-200">
            <strong>{popupUser.fullName}</strong> sent a message!
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
