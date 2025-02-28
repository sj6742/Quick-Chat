import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

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

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-gray-900 via-purple-800 to-fuchsia-700 text-gray-100">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-gray-900 via-purple-800 to-fuchsia-700 text-gray-100">
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
