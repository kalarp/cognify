import { Github, Mail, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Row - Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image
              src="/favicon.svg"
              alt="Cognify Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">Cognify</span>
          </div>
          <p className="max-w-md text-base-content/70 text-sm md:text-right">
            Transform your study materials into intelligent flashcards with AI.
            Free, open-source, and designed for students who want to learn
            smarter.
          </p>
        </div>

        {/* Middle Row - Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-base-content mb-4">Product</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="#features" className="link link-hover">
                Features
              </Link>
              <Link
                href="https://github.com/chaosweasl/cognify#readme"
                className="link link-hover"
              >
                How it Works
              </Link>
              <Link
                href="https://github.com/chaosweasl/cognify#readme"
                className="link link-hover"
              >
                Documentation
              </Link>
              <Link
                href="https://github.com/chaosweasl/cognify/wiki"
                className="link link-hover"
              >
                API Reference
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base-content mb-4">Support</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://github.com/chaosweasl/cognify/issues"
                className="link link-hover"
              >
                Report Issues
              </Link>
              <Link
                href="https://github.com/chaosweasl/cognify/discussions"
                className="link link-hover"
              >
                Community
              </Link>
              <Link
                href="https://github.com/chaosweasl/cognify/blob/main/LICENSE"
                className="link link-hover"
              >
                License
              </Link>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        {/* Bottom Row - Copyright and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-base-content/70 text-sm">
            © 2025 Cognify. Open source and made with{" "}
            <Heart className="inline h-4 w-4 text-error" /> for students
            everywhere.
          </p>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Link
              href="https://github.com/chaosweasl/cognify"
              className="btn btn-ghost btn-circle btn-sm"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:17daniel.dev@gmail.com"
              className="btn btn-ghost btn-circle btn-sm"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
