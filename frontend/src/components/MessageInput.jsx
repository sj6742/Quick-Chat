import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

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

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [themeIndex, setThemeIndex] = useState(0);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    useEffect(() => {
        const storedThemeIndex = parseInt(localStorage.getItem("themeIndex")) || 0;
        setThemeIndex(storedThemeIndex);
    }, []);

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
            await sendMessage({ text: text.trim(), image: imagePreview });
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
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-3 p-3">
                <div className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition focus-within:ring-2 focus-within:ring-blue-400 bg-gradient-to-br ${gradientThemes[themeIndex]}`}>
                    <input
                        type="text"
                        className="w-full bg-transparent outline-none text-white placeholder-gray-300"
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
