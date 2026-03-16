"use client";

import React, { useState, useEffect } from "react";

interface LoginProps {
  onLogin: (email: string, password: string) => void
  onShowSignup: () => void
}

const Login = ({ onLogin, onShowSignup }: LoginProps) => {
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = () => {
    if (userCaptcha === captcha) {
      onLogin(email, password);
    } else {
      alert("Invalid captcha. Please try again.");
      generateCaptcha();
      setUserCaptcha("");
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
      <div className="relative w-[800px] h-[450px] grid grid-cols-2 rounded-2xl 
      backdrop-blur-lg bg-[#171717]/80 border border-white/10 shadow-2xl">

        {/* Left Section */}
        <div className="flex items-center justify-center p-10 border-r border-white/10">
          <div className="w-full max-w-sm space-y-4 text-white">

            <h2 className="text-2xl font-bold">Login Credentials</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-[#171717]/60 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-[#171717]/60 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
            />

            {/* Captcha */}
            <div className="flex justify-between items-center bg-[#171717]/60 p-2 rounded border border-white/10">
              <span className="font-mono tracking-widest text-white">{captcha}</span>
              <button onClick={generateCaptcha} className="text-blue-400 hover:text-blue-300 transition-colors">↻</button>
            </div>

            <input
              type="text"
              placeholder="Enter Captcha"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              className="w-full p-3 rounded bg-[#171717]/60 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
            />

            <button 
              onClick={handleLogin}
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <button 
                  onClick={onShowSignup}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>

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
