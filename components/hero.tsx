import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 to-teal-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Notes Into
            <span className="text-emerald-600 block">Smart Flashcards</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Paideia uses AI to automatically convert your classwork, notes, and
            PDFs into interactive flashcards. Study smarter, not harder with
            personalized learning tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
            >
              Start Creating Flashcards
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-gray-700 border-gray-300 px-8 py-3"
            >
              <Github className="mr-2 h-5 w-5" />
              <Link href="https://github.com/chaosweasl/paideia">
                View on GitHub
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-2 max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="text-gray-500 text-sm mb-4">Demo Preview</div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-left space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold mb-2">📝 Your Notes:</div>
                    <div className="bg-gray-50 p-3 rounded text-xs">
                      &quot;Photosynthesis is the process by which plants
                      convert sunlight into energy...&quot;
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold mb-2">
                      🤖 AI Generated Flashcard:
                    </div>
                    <div className="bg-teal-50 p-3 rounded text-xs">
                      <strong>Q:</strong> What is photosynthesis?
                      <br />
                      <strong>A:</strong> The process by which plants convert
                      sunlight into energy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
