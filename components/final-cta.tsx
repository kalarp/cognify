import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Github,
  Star,
  Leaf,
  Sparkles,
  TreePine,
  Flower,
  Shield,
} from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-sage-gradient py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-background/30 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-background/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-background/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm px-6 py-3 rounded-2xl mb-8 border border-background/30 hover:bg-background/25 transition-colors">
          <TreePine className="w-4 h-4 text-background" />
          <span className="text-sm font-medium text-background">
            Ready to Grow?
          </span>
          <Sparkles className="w-4 h-4 text-background animate-pulse" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-background mb-6 leading-tight">
          Ready to Cultivate Your
          <span className="block text-background/90">Study Garden?</span>
        </h2>
        <p className="text-xl text-background/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join students worldwide who are already using Cognify to create
          smarter study materials. It's free, open-source, and ready to bloom
          with your AI API token.
        </p>

        <div className="flex flex-col gap-6 justify-center items-center mb-16">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90 px-10 py-4 shadow-2xl hover:shadow-background/30 rounded-2xl text-lg font-semibold border border-background/20 hover:scale-105 transition-all duration-300"
            >
              <Leaf className="mr-3 h-5 w-5" />
              Start creating your flashcards
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://github.com/chaosweasl/cognify">
            <Button
              variant="outline"
              size="lg"
              className="bg-background/10 text-background border-background/30 hover:bg-background/20 px-8 py-4 backdrop-blur-sm rounded-2xl hover:border-background/50 transition-all duration-300 hover:scale-105"
            >
              <Github className="mr-2 h-5 w-5" />
              Star on GitHub
              <Star className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="relative bg-gradient-to-br from-background/15 to-background/5 backdrop-blur-sm rounded-2xl p-8 border border-background/30 hover:border-background/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-background/20 hover:-translate-y-2">
            {/* Decorative corner */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-background/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-background/10 rounded-2xl group-hover:bg-background/20 transition-colors">
                <TreePine className="w-8 h-8 text-background group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="text-3xl font-bold text-background mb-2 group-hover:scale-105 transition-transform">
              100%
            </div>
            <div className="text-background/90 font-medium">
              Free & Open Source
            </div>
            <div className="h-1 w-12 bg-gradient-to-r from-background/40 to-transparent mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="relative bg-gradient-to-br from-background/15 to-background/5 backdrop-blur-sm rounded-2xl p-8 border border-background/30 hover:border-background/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-background/20 hover:-translate-y-2">
            {/* Decorative dots */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-background/20 rounded-full"></div>
            <div className="absolute top-6 left-7 w-1 h-1 bg-background/30 rounded-full"></div>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-background/10 rounded-2xl group-hover:bg-background/20 transition-colors group-hover:rotate-12 duration-300">
                <Flower className="w-8 h-8 text-background" />
              </div>
            </div>
            <div className="text-3xl font-bold text-background mb-2 group-hover:scale-105 transition-transform">
              ∞
            </div>
            <div className="text-background/90 font-medium">
              Unlimited Flashcards
            </div>
            <div className="h-1 w-16 bg-gradient-to-r from-background/40 via-background/60 to-background/40 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="relative bg-gradient-to-br from-background/15 to-background/5 backdrop-blur-sm rounded-2xl p-8 border border-background/30 hover:border-background/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-background/20 hover:-translate-y-2">
            {/* Decorative line */}
            <div className="absolute bottom-4 right-4 w-6 h-0.5 bg-background/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-background/10 rounded-2xl group-hover:bg-background/20 transition-colors">
                <Shield className="w-8 h-8 text-background group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300" />
              </div>
            </div>
            <div className="text-3xl font-bold text-background mb-2 group-hover:scale-105 transition-transform">
              Privacy
            </div>
            <div className="text-background/90 font-medium">
              Your Data, Your Control
            </div>
            <div className="h-1 w-8 bg-gradient-to-r from-transparent via-background/50 to-transparent mx-auto mt-4 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
