import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-400 to-purple-500 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-12 w-full max-w-lg">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        {/* Form */}
        {isLogin ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
            className="space-y-6"
          >
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 px-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
            className="space-y-6"
          >
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 px-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-lg"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-lg"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 px-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-green-500 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-green-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Toggle */}
        <p className="mt-8 text-center text-gray-500 text-lg">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
