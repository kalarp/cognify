"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="navbar bg-base-100 shadow-sm sticky top-0 z-50 border-b border-base-200">
      <div className="navbar-start">
        {/* Mobile View: Hamburger menu and dropdown for small screens */}
        <div className="dropdown">
          {/* Hamburger icon button for mobile */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="h-6 w-6" />
          </div>
          {/* Dropdown menu for mobile navigation */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="#features">Features</Link>
            </li>
            <li>
              <Link href="https://github.com/chaosweasl/cognify#readme">
                How it Works
              </Link>
            </li>
            <li>
              <Link href="https://github.com/chaosweasl/cognify">GitHub</Link>
            </li>
            <li>
              <Link href="/login" className="btn btn-primary btn-sm">
                Get Started
              </Link>
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
            <Link href="#features">Features</Link>
          </li>
          <li>
            <Link href="https://github.com/chaosweasl/cognify#readme">
              How it Works
            </Link>
          </li>
          <li>
            <Link href="https://github.com/chaosweasl/cognify">GitHub</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <Link href="/login" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </header>
  );
}
