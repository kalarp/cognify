import { Github, Mail, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/favicon.svg"
                alt="Cognify Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900">Cognify</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Transform your study materials into intelligent flashcards with
              AI. Free, open-source, and designed for students who want to learn
              smarter.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/chaosweasl/cognify"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>

              <Link
                href="mailto:17daniel.dev@gmail.com"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify#readme"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify#readme"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify/wiki"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify/issues"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Report Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify/discussions"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 Cognify. Open source and made with{" "}
              <Heart className="inline h-4 w-4 text-red-500" /> for students
              everywhere.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="https://github.com/chaosweasl/cognify/blob/main/LICENSE"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                License
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
