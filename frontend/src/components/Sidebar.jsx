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
        // Hide notification after 3 seconds
        setTimeout(() => setPopupUser(null), 3000);
    }
    }
}, [newMessage, selectedUser, users]);

const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

if (isUsersLoading) return <SidebarSkeleton />;

return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 relative">
    <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
        <Users className="size-6" />
        <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
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

    <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
        <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
            selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
            }`}
        >
            <div className="relative mx-auto lg:mx-0">
            <img src={user.profilePic || "/avatar.png"} alt={user.name} className="size-12 object-cover rounded-full" />
            {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
            )}
            </div>

            {/* User info */}
            <div className="hidden lg:block text-left min-w-0">
<div className={`font-medium truncate ${newMessage?.senderId === user._id ? "font-bold text-blue-500" : ""}`}>
    {user.fullName}
</div>
<div className="text-sm text-zinc-400">
    {newMessage?.senderId === user._id ? "Sent a message!" : onlineUsers.includes(user._id) ? "Online" : "Offline"}
</div>
</div>

        </button>
        ))}

        {filteredUsers.length === 0 && <div className="text-center text-zinc-500 py-4">No online users</div>}
    </div>

    {popupUser && (
        <div className="absolute bottom-5 left-5 bg-white shadow-lg rounded-lg p-3 flex items-center gap-3 animate-fade-in">
        <Bell className="text-blue-500" />
        <div className="text-sm">
            <strong>{popupUser.fullName}</strong> sent a message!
        </div>
        </div>
    )}
    </aside>
);
};

export default Sidebar;
