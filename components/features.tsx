import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  FileText,
  Database,
  Key,
  Leaf,
  Sparkles,
  TreePine,
  Flower,
} from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Generation",
      description:
        "Advanced AI automatically extracts key concepts from your notes and creates targeted flashcards for optimal learning and growth.",
    },
    {
      icon: FileText,
      title: "Multiple Input Formats",
      description:
        "Upload text, paste content directly, or upload PDF files. Cognify handles various content types seamlessly like nature's diversity.",
    },
    {
      icon: Database,
      title: "Personal Study Forest",
      description:
        "All your flashcards grow in your personal study forest, accessible anytime for review and nurturing your knowledge.",
    },
    {
      icon: Key,
      title: "Bring Your Own API",
      description:
        "Use your own AI API token for complete control and privacy. No subscription fees, just bring your preferred AI service to bloom.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-accent blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-2xl mb-8 border border-primary/20 hover:bg-primary/15 transition-colors">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Grow Your Knowledge
            </span>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Powerful Features for
            <span className="text-plant-gradient block sm:inline">
              {" "}
              Smarter Learning
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to transform your study materials into effective
            learning tools that flourish with time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-2xl group overflow-hidden"
            >
              {/* Decorative elements for each card */}
              {index === 0 && (
                <div className="absolute top-3 right-3 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}
              {index === 1 && (
                <>
                  <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-primary/20 rounded-full"></div>
                  <div className="absolute top-6 left-7 w-1 h-1 bg-primary/30 rounded-full"></div>
                </>
              )}
              {index === 2 && (
                <div className="absolute bottom-4 right-4 w-6 h-0.5 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}
              {index === 3 && (
                <div className="absolute top-4 right-4 w-3 h-3 border border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}

              <CardContent className="p-8 text-center relative">
                <div className="relative w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-105 duration-300">
                  <feature.icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                {/* Decorative underline */}
                <div className="h-1 w-12 bg-gradient-to-r from-primary/40 to-transparent mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
