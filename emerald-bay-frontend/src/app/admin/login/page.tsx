"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      // Navigate to admin dashboard
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hotel-bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div 
          className="backdrop-blur-md rounded-3xl shadow-2xl p-8"
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Logo and Branding */}
          <div className="flex flex-col items-center mb-8">
            {/* Logo Image */}
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4 overflow-hidden"
              style={{ backgroundColor: "rgba(179, 153, 119, 0.2)" }}
            >
              <img 
                src="/logo.png" 
                alt="Emerald Bay Logo" 
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Hotel Name */}
            <h1 
              className="text-2xl font-bold mb-1 tracking-wide"
              style={{ color: "#FFFFFF" }}
            >
              Emerald Bay Resort
            </h1>
            <p 
              className="text-xs tracking-widest mb-6"
              style={{ color: "#B39977" }}
            >
              MIRISSA - SRI LANKA
            </p>

            {/* Admin Portal Title */}
            <h2 
              className="text-xl font-semibold mb-1"
              style={{ color: "#FFFFFF" }}
            >
              Admin Portal
            </h2>
            <p 
              className="text-xs"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              Authorized access only
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-medium mb-2 tracking-wide"
                style={{ color: "#FFFF" }}
              >
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#B39977"
                    strokeWidth="2"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  onBlur={() => validateEmail(email)}
                  placeholder="admin@emeraldbay.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-sm outline-none transition-all focus:ring-2 focus:ring-#B39977"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: emailError ? "1px solid #EF4444" : "1px solid #B39977",
                    color: "#EDE6D9"
                  }}
                />
              </div>
              {emailError && (
                <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-xs font-medium mb-2 tracking-wide"
                style={{ color: "#FFFF" }}
              >
                PASSWORD
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#B39977"
                    strokeWidth="2"
                  >
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M12 17v-2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  onBlur={() => validatePassword(password)}
                  placeholder="••••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg text-sm outline-none transition-all focus:ring-2 focus:ring-#B39977 "
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: passwordError ? "1px solid #EF4444" : "1px solid #B39977",
                    color: "#EDE6D9"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-opacity hover:opacity-70"
                >
                  {showPassword ? (
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>
                  {passwordError}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{
                    accentColor: "#B39977"
                  }}
                />
                <span 
                  className="ml-2 text-sm transition-opacity group-hover:opacity-70"
                  style={{ color: "#FFFF" }}
                >
                  Remember Me
                </span>
              </label>
              <a 
                href="#forgot-password" 
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "#B39977" }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "#B39977",
                color: "#FFFFFF"
              }}
            >
              Secure Login
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            {/* Encrypted Session Badge */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span 
                className="text-xs tracking-wider"
                style={{ color: "rgba(255, 255, 255, 0.3)" }}
              >
                END-TO-END ENCRYPTED SESSION
              </span>
            </div>
            {/* Footer Links */}
        <div className="flex items-center justify-center gap-8 mt-8">
          {["PRIVACY", "TERMS", "SUPPORT"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs tracking-widest transition-opacity hover:opacity-70"
              style={{ color: "#B39977" }}
            >
              {link}
            </a>
          ))}
        </div>
          </form>
        </div>

        
      </div>
    </div>
  );
}
