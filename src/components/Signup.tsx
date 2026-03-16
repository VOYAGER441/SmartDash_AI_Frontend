"use client";

import React, { useState, useEffect } from "react";

interface SignupProps {
  onSignup: (name: string, email: string, password: string) => void;
  onBackToLogin: () => void;
}

const Signup = ({ onSignup, onBackToLogin }: SignupProps) => {
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSignup = () => {
    if (userCaptcha !== captcha) {
      alert("Invalid captcha. Please try again.");
      generateCaptcha();
      setUserCaptcha("");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    onSignup(name, email, password);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://hellofuture.orange.com/wwp-content/uploads/sites/56/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glass Container */}
      <div className="relative w-[900px] h-[550px] backdrop-blur-2xl bg-[#171717]/90 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-2 h-full">
          {/* Left Section - Signup Form */}
          <div className="flex items-center justify-center p-10 border-r border-white/20">
            <div className="w-full max-w-sm space-y-6 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-gray-400">Join Quibits BI Dashboard</p>
              </div>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#171717]/60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-[#171717]/80 transition-all duration-200"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#171717]/60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-[#171717]/80 transition-all duration-200"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#171717]/60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-[#171717]/80 transition-all duration-200"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#171717]/60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-[#171717]/80 transition-all duration-200"
              />

              {/* Captcha */}
              <div className="flex justify-between items-center bg-[#171717]/60 p-3 rounded-xl border border-white/20">
                <span className="font-mono tracking-widest text-white text-lg">{captcha}</span>
                <button 
                  onClick={generateCaptcha}
                  className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                placeholder="Enter Captcha"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#171717]/60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-[#171717]/80 transition-all duration-200"
              />

              <button 
                onClick={handleSignup}
                className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                Create Account
              </button>

              <div className="text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <button 
                    onClick={onBackToLogin}
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Branding */}
          <div className="flex items-center justify-center text-white p-10 bg-contain bg-center"
            style={{
              backgroundImage: "url('https://codekeys.netlify.app/images/gif.gif')"
            }}
          >
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-3xl">Q</span>
              </div>
              <h3 className="text-2xl font-bold">Welcome to Quibits</h3>
              <p className="text-gray-300">
                Your intelligent business intelligence dashboard with advanced analytics and real-time insights.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Real-time Analytics</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">AI-Powered Insights</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">Interactive Dashboards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
