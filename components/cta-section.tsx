import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-32 bg-emerald-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Study Habits?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already studying smarter with
            AI-generated flashcards. Start your learning journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-3"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center sm:justify-start text-emerald-100">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start text-emerald-100">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start text-emerald-100">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
