import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import clsx from "clsx";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 border-b border-base-300 bg-base-200 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left Section - Profile */}
        <div className="flex items-center gap-3">
          {/* Avatar with Online Indicator */}
          <div className="relative w-12 h-12">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-full rounded-full object-cover border-2 border-primary shadow-md"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-semibold text-lg text-base-content">
              {selectedUser.fullName}
            </h3>
            <p
              className={clsx(
                "text-sm",
                isOnline ? "text-green-500" : "text-gray-400"
              )}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button with Hover Effect */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-red-500/10 transition"
        >
          <X className="text-red-500 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
