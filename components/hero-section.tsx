import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                🚀 AI-Powered Learning
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your Notes Into
              <span className="text-emerald-600"> Smart Flashcards</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Upload your classwork, notes, or PDFs and let AI instantly convert
              them into interactive flashcards. Study smarter, retain more, and
              ace your exams with personalized learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3"
              >
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">10,000+</span>
                <span className="ml-1">students</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">50,000+</span>
                <span className="ml-1">flashcards created</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-8">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Paideia Dashboard Preview"
                width={600}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-2xl"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium">AI Processing</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📚</span>
                <div>
                  <div className="text-sm font-medium">25 Cards Generated</div>
                  <div className="text-xs text-gray-500">From your notes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
