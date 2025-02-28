import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, User } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const themes = {
  light: { name: "Light", color: "bg-white text-gray-900" },
  dark: { name: "Dark", color: "bg-gray-900 text-gray-100" },
  cupcake: { name: "Cupcake", color: "bg-pink-100 text-gray-900" },
  valentine: { name: "Valentine", color: "bg-red-100 text-gray-900" },
  lofi: { name: "Lofi", color: "bg-gray-300 text-gray-900" },
  dracula: { name: "Dracula", color: "bg-purple-900 text-gray-100" },
};

const SettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [previewTheme, setPreviewTheme] = useState(theme);
  const navigate = useNavigate(); // For navigation after deletion
  const { authUser, deleteAccount } = useAuthStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = themes[theme]?.color || themes.dark.color;
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (isConfirmed) {
      try {
        deleteAccount({authUser});
        navigate("/login");
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error(
          error.response?.data?.message || "Failed to delete account"
        );
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        themes[theme]?.color || themes.dark.color
      }`}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-gray-900/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-700"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl font-extrabold text-white text-center mb-6"
        >
          Settings
        </motion.h2>

        {/* Theme Selector */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold flex items-center gap-2 text-fuchsia-300">
            <Palette className="w-5 h-5" /> Appearance & Themes
          </h3>

          {/* Theme Preview */}
          <motion.div
            key={previewTheme}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full h-24 mt-4 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold transition-all duration-300 ${
              themes[previewTheme]?.color || themes.dark.color
            }`}
          >
            {themes[previewTheme]?.name || "Dark"} Theme Preview
          </motion.div>

          {/* Theme Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {Object.entries(themes).map(([key, { name, color }]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-md border transition-all duration-300 transform shadow-md ${color} ${
                  theme === key ? "ring-2 ring-fuchsia-500" : "border-gray-600"
                }`}
                onClick={() => setTheme(key)}
                onMouseEnter={() => setPreviewTheme(key)}
                onMouseLeave={() => setPreviewTheme(theme)}
              >
                {name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold flex items-center gap-2 text-fuchsia-300">
            <User className="w-5 h-5" /> Account Settings
          </h3>
          <ul className="list-disc ml-6 mt-2 text-gray-300">
            <li>
              <Link
                to="/profile"
                className="text-fuchsia-400 font-bold hover:underline"
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                to="/change-password"
                className="text-fuchsia-400 font-bold hover:underline"
              >
                Change Password
              </Link>
            </li>
            <li>
              <button
                className="text-red-500 font-bold hover:underline"
                onClick={handleDeleteAccount} // Add click handler for account deletion
              >
                Delete Account
              </button>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
