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
        <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <TreePine className="w-4 h-4 text-background" />
          <span className="text-sm font-medium text-background">
            Ready to Grow?
          </span>
          <Sparkles className="w-4 h-4 text-background animate-pulse" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4 leading-tight">
          Ready to Cultivate Your
          <span className="block text-background/90">Study Garden?</span>
        </h2>
        <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join students worldwide who are already using Cognify to create
          smarter study materials. It's free, open-source, and ready to bloom
          with your AI API token.
        </p>

        <div className="flex flex-col gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-background text-primary hover:bg-background/90 px-8 py-4 shadow-plant-lg hover-grow rounded-organic text-lg font-semibold"
          >
            <Leaf className="mr-2 h-5 w-5" />
            Start creating your flashcards
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-background/10 text-background border-background/30 hover:bg-background/20 px-8 py-4 backdrop-blur-sm rounded-organic"
          >
            <Github className="mr-2 h-5 w-5" />
            <Link href="https://github.com/chaosweasl/cognify">
              Star on GitHub
            </Link>
            <Star className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-background/10 backdrop-blur-sm rounded-organic p-6 border border-background/20">
            <div className="flex justify-center mb-3">
              <TreePine className="w-8 h-8 text-background" />
            </div>
            <div className="text-3xl font-bold text-background mb-2">100%</div>
            <div className="text-background/80">Free & Open Source</div>
          </div>
          <div className="bg-background/10 backdrop-blur-sm rounded-organic p-6 border border-background/20">
            <div className="flex justify-center mb-3">
              <Flower className="w-8 h-8 text-background" />
            </div>
            <div className="text-3xl font-bold text-background mb-2">∞</div>
            <div className="text-background/80">Unlimited Flashcards</div>
          </div>
          <div className="bg-background/10 backdrop-blur-sm rounded-organic p-6 border border-background/20">
            <div className="flex justify-center mb-3">
              <Shield className="w-8 h-8 text-background" />
            </div>
            <div className="text-3xl font-bold text-background mb-2">
              Privacy
            </div>
            <div className="text-background/80">Your Data, Your Control</div>
          </div>
        </div>
      </div>
    </section>
  );
}
