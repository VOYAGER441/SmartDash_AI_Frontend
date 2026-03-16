"use client";

import React, { useState, useEffect } from "react";

interface LoginProps {
  onLogin: (userid: string, password: string) => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!userid || !password) {
      alert("Please enter both userid and password");
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(userid, password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
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
      <div className="relative w-[800px] h-[400px] grid grid-cols-2 rounded-2xl 
      backdrop-blur-lg bg-[#171717]/80 border border-white/10 shadow-2xl">

        {/* Left Section */}
        <div className="flex items-center justify-center p-10 border-r border-white/10">
          <div className="w-full max-w-sm space-y-6 text-white">

            <h2 className="text-3xl font-bold text-center">Login</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">User ID</label>
                <input
                  type="text"
                  placeholder="Enter your User ID"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-3 rounded bg-[#171717]/60 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-3 rounded bg-[#171717]/60 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center text-white text-xl font-semibold bg-contain"
          style={{
            backgroundImage:
              "url('https://codekeys.netlify.app/images/gif.gif')"
          }}
        >

        </div>

      </div>
    </div>
  );
};

export default Login;
