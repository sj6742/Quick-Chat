import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-900/80 bg-gradient-to-br from-blue-900 via-purple-700 to-fuchsia-500 text-gray-100 p-6">
      <div className="w-full mt-20 max-w-lg bg-gray-900/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-700">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full  bg-fuchsia-500 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Join Us</h1>
            <p className="text-gray-300">Sign up and be part of something amazing!</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: "fullName", label: "Full Name", icon: <User className="h-5 w-5 text-fuchsia-300" /> },
            { name: "email", label: "Email", icon: <Mail className="h-5 w-5 text-fuchsia-300" /> },
            { name: "password", label: "Password", icon: <Lock className="h-5 w-5 text-fuchsia-300" /> },
          ].map(({ name, label, icon }, idx) => (
            <div key={idx} className="space-y-2">
              <label className="block text-gray-200 font-medium">{label}</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>
                <input
                  type={name === "password" && !showPassword ? "password" : "text"}
                  className="w-full pl-10 p-3 rounded-lg bg-gray-800 text-fuchsia-300 border border-gray-600 focus:ring-2 focus:ring-fuchsia-500 outline-none placeholder-gray-500"
                  placeholder={name === "fullName" ? "John Doe" : name === "email" ? "you@example.com" : "••••••••"}
                  value={formData[name]}
                  onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                />
                {name === "password" && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fuchsia-300 hover:text-white transition-all"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 transition-all duration-300 text-white font-bold py-3 rounded-lg flex justify-center items-center shadow-lg hover:shadow-fuchsia-500/50 transform hover:scale-105"
            disabled={isSigningUp}
          >
            {isSigningUp ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-300">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-fuchsia-400 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
