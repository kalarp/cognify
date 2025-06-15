import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, FileText, Database, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description:
      "Advanced AI analyzes your content and creates intelligent flashcards that focus on key concepts and important information.",
  },
  {
    icon: FileText,
    title: "Multiple Input Formats",
    description:
      "Upload PDFs, paste text, or type directly. Our system handles various document formats and extracts the most relevant content.",
  },
  {
    icon: Database,
    title: "Personal Study Database",
    description:
      "All your flashcards are securely stored in your personal database, accessible anytime, anywhere for continuous learning.",
  },
  {
    icon: Zap,
    title: "Custom AI Integration",
    description:
      "Use your own AI API token for personalized processing. Maintain control over your data and AI preferences.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Study Smarter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Paideia combines cutting-edge AI with intuitive design to transform
            how you create and study flashcards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">99%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {"<5s"}
            </div>
            <div className="text-gray-600">Processing Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
            <div className="text-gray-600">Availability</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">∞</div>
            <div className="text-gray-600">Storage Limit</div>
          </div>
        </div>
      </div>
    </section>
  );
}
