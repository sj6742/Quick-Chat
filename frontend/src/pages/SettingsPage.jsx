import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const gradientThemes = [
  { name: "Purple Dream", gradient: "from-gray-900 via-purple-800 to-fuchsia-700" },
  { name: "Oceanic", gradient: "from-blue-900 via-indigo-700 to-purple-600" },
  { name: "Teal Breeze", gradient: "from-green-900 via-teal-700 to-blue-500" },
  { name: "Sunset Glow", gradient: "from-red-900 via-pink-700 to-yellow-500" },
  { name: "Dark Knight", gradient: "from-black via-gray-800 to-gray-600" },
  { name: "Lush Forest", gradient: "from-green-900 via-lime-700 to-emerald-500" },
  { name: "Firestorm", gradient: "from-orange-900 via-red-700 to-yellow-500" },
  { name: "Cyberpunk", gradient: "from-pink-700 via-purple-600 to-blue-500" },
  { name: "Royal Gold", gradient: "from-yellow-700 via-amber-600 to-orange-500" },
  { name: "Mystic Blue", gradient: "from-blue-900 via-cyan-700 to-teal-500" },
  { name: "Frozen Lake", gradient: "from-sky-700 via-blue-500 to-cyan-300" },
  { name: "Blazing Heat", gradient: "from-red-900 via-orange-700 to-yellow-400" },
  { name: "Midnight", gradient: "from-gray-900 via-gray-700 to-gray-500" },
  { name: "Emerald Touch", gradient: "from-green-800 via-teal-600 to-cyan-500" },
  { name: "Rosewood", gradient: "from-rose-800 via-red-600 to-orange-400" },
  { name: "Deep Space", gradient: "from-indigo-900 via-blue-700 to-violet-600" },
  { name: "Neon Rush", gradient: "from-pink-700 via-fuchsia-500 to-cyan-400" },
  { name: "Solar Flare", gradient: "from-red-800 via-orange-600 to-yellow-400" }
];

const SettingsPage = () => {
  const [previewIndex, setPreviewIndex] = useState(
    parseInt(localStorage.getItem("themeIndex")) || 0
  );
  const [appliedIndex, setAppliedIndex] = useState(previewIndex);
  const navigate = useNavigate();
  const { authUser, deleteAccount } = useAuthStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", gradientThemes[appliedIndex].gradient);
    document.body.className = `bg-gradient-to-r ${gradientThemes[appliedIndex].gradient}`;
  }, [appliedIndex]);

  const applyTheme = () => {
    setAppliedIndex(previewIndex);
    localStorage.setItem("themeIndex", previewIndex);
    toast.success(`Theme applied: ${gradientThemes[previewIndex].name}`);
  };

  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (isConfirmed) {
      try {
        deleteAccount({ authUser });
        navigate("/login");
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error(error.response?.data?.message || "Failed to delete account");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center p-6 transition-all duration-300"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-gray-900/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-700"
      >
        <h2 className="text-4xl font-extrabold text-white text-center mb-6">Settings</h2>
        
        {/* Theme Selector */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-fuchsia-300 flex items-center justify-center gap-2">
            <Palette className="w-5 h-5" /> Theme Selection
          </h3>

          {/* Theme Preview */}
          <motion.div
            className={`w-full h-24 mt-4 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold transition-all duration-300 bg-gradient-to-r ${gradientThemes[previewIndex].gradient}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {gradientThemes[previewIndex].name} Preview
          </motion.div>

          {/* Individual Theme Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {gradientThemes.map((theme, index) => (
              <motion.button
                key={index}
                onClick={() => setPreviewIndex(index)}
                className={`px-4 py-2 text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-105 hover:ring-2 hover:ring-white bg-gradient-to-r ${theme.gradient} ${
                  previewIndex === index ? "ring-2 ring-fuchsia-500 scale-105" : ""
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {theme.name}
              </motion.button>
            ))}
          </div>

          {/* Apply Theme Button */}
          <motion.button
            onClick={applyTheme}
            className="mt-6 px-6 py-3 text-white font-bold rounded-lg shadow-lg bg-gradient-to-r from-fuchsia-700 via-purple-700 to-blue-700 hover:scale-105 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            Apply Theme
          </motion.button>
        </div>

        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-fuchsia-300 flex items-center gap-2">
            <User className="w-5 h-5" /> Account Settings
          </h3>
          <ul className="list-disc ml-6 mt-2 text-gray-300">
            <li>
              <Link to="/profile" className="text-fuchsia-400 font-bold hover:underline">Edit Profile</Link>
            </li>
            <li>
              <Link to="/change-password" className="text-fuchsia-400 font-bold hover:underline">Change Password</Link>
            </li>
            <li>
              <button className="text-red-500 font-bold hover:underline" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
