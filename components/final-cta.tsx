import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Star } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Revolutionize Your Study Routine?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join students worldwide who are already using Cognify to create
          smarter study materials. It&apos;s free, open-source, and ready to use
          with your AI API token.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 px-8 py-3"
          >
            <Github className="mr-2 h-5 w-5" />
            <Link href="https://github.com/chaosweasl/cognify">
              Star on GitHub
            </Link>
            <Star className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
            <div className="text-gray-300">Free & Open Source</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">∞</div>
            <div className="text-gray-300">Unlimited Flashcards</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">🔒</div>
            <div className="text-gray-300">Your Data, Your Control</div>
          </div>
        </div>
      </div>
    </section>
  );
}
