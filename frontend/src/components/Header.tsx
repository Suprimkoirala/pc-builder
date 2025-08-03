"use client";

import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Header = () => {
  const { user, login, register, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      if (isLoginMode) {
        await login({ email: formData.email, password: formData.password });
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords don't match");
          return;
        }
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }
      setShowAuthModal(false);
      setFormData({ email: "", password: "", username: "", confirmPassword: "" });
    } catch (error: any) {
      setError(error.response?.data?.error || "Authentication failed");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
            <Settings className="w-5 h-5 text-emerald-900" />
          </div>
          <div className="text-white">
            <span className="text-sm font-light">THE</span>
            <div className="font-bold text-lg">DREAM</div>
            <div className="text-xs font-light -mt-1">BUILDERS</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("past-builds")}
            className="bg-emerald-400 hover:text-emerald-300 transition-colors"
          >
            PAST BUILDS
          </button>
          <button
            onClick={() => scrollToSection("diy-resources")}
            className="bg-emerald-400 hover:text-emerald-300 transition-colors"
          >
            DIY RESOURCES
          </button>
          <button
            onClick={() => scrollToSection("builder")}
            className="bg-emerald-400 hover:text-emerald-300 transition-colors"
          >
            BUILDER
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="bg-emerald-400 hover:text-emerald-300 transition-colors"
          >
            ABOUT US
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-emerald-300">{user.username}</span>
              <Button
                variant="ghost"
                className="bg-red-400 hover:bg-red-500 text-emerald-900"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                className="bg-emerald-400 hover:text-emerald-300"
                onClick={() => {
                  setIsLoginMode(true);
                  setShowAuthModal(true);
                }}
              >
                Login
              </Button>
              <Button
                className="bg-emerald-400 hover:bg-emerald-500 text-emerald-900 font-semibold"
                onClick={() => {
                  setIsLoginMode(false);
                  setShowAuthModal(true);
                }}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-emerald-600">
              {isLoginMode ? "Login" : "Create Account"}
            </h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required={!isLoginMode}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password" // for login
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {!isLoginMode && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password" // for login
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}
              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-emerald-600 hover:underline"
                >
                  {isLoginMode
                    ? "Need an account?"
                    : "Already have an account?"}
                </button>
                <Button
                  type="submit"
                  className="bg-emerald-400 hover:bg-emerald-500 text-emerald-900"
                >
                  {isLoginMode ? "Login" : "Sign Up"}
                </Button>
              </div>
            </form>
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
