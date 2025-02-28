import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-gray-900 via-purple-800 to-fuchsia-700 text-gray-200">
      <div className="max-w-md text-center space-y-6 bg-gray-900/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-700">
        
        {/* Icon Display */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center animate-bounce shadow-lg transition-transform transform hover:scale-110">
              <MessageSquare className="w-8 h-8 text-fuchsia-400" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">Welcome to Chatty!</h2>
        <p className="text-gray-300 text-lg">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
