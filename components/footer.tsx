import { Github, Mail, Heart, Leaf, Sparkles, TreePine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border relative overflow-hidden">
      {/* Decorative plant elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-10 w-32 h-32 rounded-full bg-primary blur-xl"></div>
        <div className="absolute top-0 right-20 w-24 h-24 rounded-full bg-accent blur-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="relative">
                <Leaf className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
                <Sparkles className="w-3 h-3 text-accent absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold text-plant-gradient">
                Cognify
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
              Transform your study materials into intelligent flashcards with
              AI. Free, open-source, and designed for students who want to learn
              smarter and grow their knowledge like a garden.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/chaosweasl/cognify"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-organic hover:bg-primary/10"
              >
                <Github className="h-6 w-6" />
              </Link>

              <Link
                href="mailto:17daniel.dev@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-organic hover:bg-primary/10"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <TreePine className="w-4 h-4 text-primary" />
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-accent/20"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify#readme"
                  className="text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-accent/20"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify#readme"
                  className="text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-accent/20"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify/wiki"
                  className="text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-accent/20"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-accent" />
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify/issues"
                  className="text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-accent/20"
                >
                  Report Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/chaosweasl/cognify/discussions"
                  className="text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-accent/20"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              © 2025 Cognify. Open source and made with{" "}
              <Heart className="inline h-4 w-4 text-destructive animate-pulse" />{" "}
              for students everywhere to help their knowledge bloom.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="https://github.com/chaosweasl/cognify/blob/main/LICENSE"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors py-1 px-2 rounded-md hover:bg-accent/20"
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
