import React, { useState } from "react";
import {
  Menu,
  Star,
  Sun,
  Moon,
  Clock,
  Bell,
  Layout,
  Search,
} from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Functionality still works, but no dark styling applied
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 bg-white">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Menu className="w-5 h-5 text-gray-800" />
        </button>

        <div className="flex items-center space-x-2 text-gray-800">
          <Star className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Dashboards</span>
          <span className="text-gray-400">/</span>
          <span className="text-sm font-medium text-gray-800">Default</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-gray-100 px-3 py-1.5 rounded-md focus-within:ring-2 ring-gray-300 transition-all duration-200">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-sm text-gray-700 px-2 w-32 sm:w-40"
          />
          <kbd className="text-xs text-gray-400">⌘/</kbd>
        </div>

        {/* Icons */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-gray-800" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        <button className="p-2 rounded-md hover:bg-gray-100">
          <Clock className="w-5 h-5 text-gray-800" />
        </button>

        <button className="p-2 rounded-md hover:bg-gray-100 relative">
          <Bell className="w-5 h-5 text-gray-800" />
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        <button className="p-2 rounded-md hover:bg-gray-100">
          <Layout className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
