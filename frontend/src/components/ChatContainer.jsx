import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, Fragment } from "react";
import { motion } from "framer-motion";

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
  const messagesContainerRef = useRef(null);
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

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };
  
  const messageGroups = groupMessagesByDate();

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-fuchsia-800 text-gray-100">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-fuchsia-800 text-gray-100">
      <ChatHeader />

      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-fuchsia-400 scrollbar-track-gray-800"
      >
        {Object.entries(messageGroups).map(([date, dateMessages], groupIndex) => (
          <Fragment key={date}>
            {/* Date separator */}
            <div className="flex justify-center my-4">
              <div className="px-3 py-1 rounded-full bg-gray-800/70 backdrop-blur-sm text-xs font-medium text-gray-300 shadow-lg border border-gray-700">
                {formatDate(date)}
              </div>
            </div>
            
            {dateMessages.map((message, messageIndex) => {
              const isCurrentUser = message.senderId === authUser._id;
              const isLastMessage = messageIndex === dateMessages.length - 1 && groupIndex === Object.keys(messageGroups).length - 1;
              
              // Check if message is from the same sender as the previous one
              const prevMessage = messageIndex > 0 ? dateMessages[messageIndex - 1] : null;
              const isConsecutive = prevMessage && prevMessage.senderId === message.senderId;
              
              return (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end gap-2 ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  } ${isConsecutive ? "mt-1" : "mt-4"}`}
                  ref={isLastMessage ? messageEndRef : null}
                >
                  {/* Profile Picture - only show if it's not consecutive messages from same person */}
                  {!isConsecutive && !isCurrentUser && (
                    <div className="flex-shrink-0">
                      <div className="size-8 rounded-full border-2 border-fuchsia-400 shadow-md overflow-hidden transition-all duration-300 hover:scale-110">
                        <img
                          src={selectedUser.profilePic || "/avatar.png"}
                          alt={`${selectedUser.fullName || 'User'}'s profile`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="flex flex-col gap-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                    {/* Sender name (only for first message in a sequence) */}
                    {!isConsecutive && !isCurrentUser && (
                      <span className="text-xs text-gray-400 ml-1">{selectedUser.fullName || 'User'}</span>
                    )}
                    
                    <div 
                      className={`p-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
                        isCurrentUser 
                          ? "rounded-tr-sm bg-gradient-to-br from-fuchsia-600 to-purple-700 text-white border border-fuchsia-500/30 shadow-fuchsia-500/30" 
                          : "rounded-tl-sm bg-gray-800/90 text-gray-200 border border-gray-700/50 shadow-gray-700/30"
                      }`}
                    >
                      {/* Image Message */}
                      {message.image && (
                        <div className="relative mb-2">
                          <img
                            src={message.image}
                            alt="Attachment"
                            className="rounded-lg max-w-full object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
                            onClick={() => {
                              // Image preview functionality could be added here
                            }}
                          />
                        </div>
                      )}

                      {/* Text Message */}
                      {message.text && (
                        <p className="break-words leading-relaxed">{message.text}</p>
                      )}
                      
                      {/* Timestamp */}
                      <div className={`flex justify-end mt-1 ${isCurrentUser ? "text-gray-300/80" : "text-gray-400/80"}`}>
                        <time className="text-xs">
                          {formatMessageTime(message.createdAt)}
                        </time>
                      </div>
                    </div>
                  </div>

                  {/* Profile Picture (for current user) - only show if not consecutive */}
                  {!isConsecutive && isCurrentUser && (
                    <div className="flex-shrink-0">
                      <div className="size-8 rounded-full border-2 border-fuchsia-400 shadow-md overflow-hidden transition-all duration-300 hover:scale-110">
                        <img
                          src={authUser.profilePic || "/avatar.png"}
                          alt="Your profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </Fragment>
        ))}
        
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300">No messages yet</h3>
            <p className="text-sm text-gray-400 mt-1">Send a message to start the conversation with {selectedUser.fullName || 'this user'}</p>
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;