import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
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
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", gradientThemes[themeIndex]);
    document.body.className = `bg-gradient-to-r ${gradientThemes[themeIndex]}`;
  }, [themeIndex]);

  if (isMessagesLoading) {
    return (
      <div className={`flex-1 flex flex-col overflow-auto bg-gradient-to-br ${gradientThemes[themeIndex]} text-gray-100`}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col overflow-auto bg-gradient-to-br ${gradientThemes[themeIndex]} text-gray-100`}>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-end ${
              message.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
            ref={messageEndRef}
          >
            {/* Profile Picture */}
            <div className="flex items-center">
              <div className="size-10 rounded-full border-2 border-fuchsia-400 shadow-md overflow-hidden transition-transform transform hover:scale-110">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Message Content */}
            <div
              className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-xl shadow-lg backdrop-blur-md border border-gray-700 transition-all duration-300 ${
                message.senderId === authUser._id
                  ? "ml-2 bg-fuchsia-600 text-gray-100 shadow-fuchsia-500/50"
                  : "mr-2 bg-gray-800 text-gray-300 shadow-gray-700/50"
              }`}
            >
              {/* Image Message */}
              {message.image && (
                <div className="relative">
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="rounded-lg mb-2 max-w-[200px] object-cover shadow-lg"
                  />
                  {/* Timestamp in the bottom-right of the image */}
                  <time className="absolute bottom-1 right-1 text-xs text-white opacity-75 bg-black px-1 py-0.5 rounded-tl-md">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              )}

              {/* Text Message */}
              {message.text && <p className="break-words">{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
