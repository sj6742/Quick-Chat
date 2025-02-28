import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-700 to-fuchsia-500 text-gray-100 p-6">
      <div className="w-full mt-20 max-w-lg bg-gray-900/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-700">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-fuchsia-500 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Welcome Back</h1>
            <p className="text-gray-300">Log in to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-200 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fuchsia-300" />
              <input
                type="email"
                className="w-full pl-10 p-3 rounded-lg bg-gray-800 text-fuchsia-300 border border-gray-600 focus:ring-2 focus:ring-fuchsia-500 outline-none placeholder-gray-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-200 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fuchsia-300" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 p-3 rounded-lg bg-gray-800 text-fuchsia-300 border border-gray-600 focus:ring-2 focus:ring-fuchsia-500 outline-none placeholder-gray-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fuchsia-300 hover:text-white transition-all"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 transition-all duration-300 text-white font-bold py-3 rounded-lg flex justify-center items-center shadow-lg hover:shadow-fuchsia-500/50 transform hover:scale-105"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-300">
          <p>
            Don't have an account? <Link to="/signup" className="text-fuchsia-400 font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;