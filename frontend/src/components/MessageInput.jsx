import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    };

    const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
        await sendMessage({
        text: text.trim(),
        image: imagePreview,
        });

      // Clear form
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
        console.error("Failed to send message:", error);
    }
    };

    return (
    <div className="p-4 w-full">
        {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
            <div className="relative">
            <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                onClick={removeImage}
            />
            <button
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                flex items-center justify-center"
                type="button"
            >
                <X className="size-3" />
            </button>
            </div>
        </div>
        )}

<form onSubmit={handleSendMessage} className="flex items-center gap-3 p-3">
  <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition focus-within:ring-2 focus-within:ring-blue-400 bg-white">
    <input
      type="text"
      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
      placeholder="Type a message..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <input
      type="file"
      accept="image/*"
      className="hidden"
      ref={fileInputRef}
      onChange={handleImageChange}
    />
    <button
      type="button"
      className={`flex items-center justify-center w-9 h-9 rounded-full transition duration-300 ${
        imagePreview ? "text-emerald-500 bg-emerald-100 hover:bg-emerald-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
      }`}
      onClick={() => fileInputRef.current?.click()}
      title="Attach Image"
    >
      <Image size={22} />
    </button>
  </div>
  <button
    type="submit"
    className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
      text.trim() || imagePreview
        ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
    disabled={!text.trim() && !imagePreview}
  >
    <Send size={24} />
  </button>
</form>

    </div>
    );
};
export default MessageInput;