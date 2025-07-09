"use client";

import { Menu, User, LogOut, Plus, Sun, Moon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";

export function Header() {
  const { userProfile } = useUserProfile();
  // For theme toggle (simple example, you may want to use context or next-themes)
  const [theme, setTheme] = useState("dim");
  const toggleTheme = () => setTheme(theme === "dim" ? "light" : "dim");

  // Use real user data if available
  const user = {
    name: userProfile?.display_name || "User",
    avatar: userProfile?.avatar_url || "/favicon.svg",
  };

  return (
    <header className="navbar bg-base-100 shadow-sm sticky top-0 z-50 border-b border-base-200">
      <div className="navbar-start">
        {/* Mobile View: Hamburger menu and dropdown for small screens */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow"
          >
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/docs">Docs</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <button className="btn btn-ghost w-full justify-start">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </li>
            <li>
              <button className="btn btn-primary w-full mt-2">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </button>
            </li>
          </ul>
        </div>
        {/* End Mobile View */}
        <Link href="/dashboard" className="btn btn-ghost text-xl font-bold">
          <Image
            src="/favicon.svg"
            alt="Cognify Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          Cognify
        </Link>
      </div>

      {/* Desktop view */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/docs">Docs</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        {/* Quick Create Button */}
        <button className="btn btn-primary hidden md:inline-flex shadow-md hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </button>
        {/* Theme Toggle */}
        <button
          className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dim" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        {/* User Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar border-2 border-primary hover:scale-105 transition-transform"
          >
            <div className="w-10 rounded-full overflow-hidden bg-base-200">
              <Image
                src={user.avatar}
                alt="User avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/favicon.svg";
                }}
              />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-box w-56 border border-base-200">
            <li className="font-bold text-base-content/80 px-2 py-1 mb-1 border-b border-base-200">
              {user.name}
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-primary hover:text-primary-content transition-colors"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-primary hover:text-primary-content transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </li>
            <li>
              <button className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-error hover:text-error-content transition-colors w-full justify-start">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
