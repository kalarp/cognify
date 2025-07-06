import { Card, CardContent } from "@/components/ui/card";
import { Box, Container, Flex, Text, Heading } from "@radix-ui/themes";
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
    <Box
      id="features"
      style={{
        padding: "5rem 0",
        backgroundColor: "var(--color-background)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <Box
        style={{
          position: "absolute",
          inset: "0",
          opacity: "0.05",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: "2.5rem",
            left: "5rem",
            width: "16rem",
            height: "16rem",
            borderRadius: "50%",
            backgroundColor: "var(--accent-9)",
            filter: "blur(48px)",
          }}
        />
        <Box
          style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "5rem",
            width: "12rem",
            height: "12rem",
            borderRadius: "50%",
            backgroundColor: "var(--accent-9)",
            filter: "blur(32px)",
          }}
        />
      </Box>

      <Container size="4">
        <Flex
          direction="column"
          align="center"
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <Flex
            align="center"
            gap="2"
            style={{
              backgroundColor: "var(--accent-3)",
              backdropFilter: "blur(8px)",
              padding: "0.75rem 1.5rem",
              borderRadius: "var(--radius-full)",
              marginBottom: "2rem",
              border: "1px solid var(--accent-6)",
              transition: "background-color 0.3s ease",
            }}
            className="hover:bg-accent-4"
          >
            <Leaf size={16} style={{ color: "var(--accent-9)" }} />
            <Text size="2" weight="medium" style={{ color: "var(--accent-9)" }}>
              Grow Your Knowledge
            </Text>
            <Sparkles
              size={16}
              style={{ color: "var(--accent-9)" }}
              className="animate-pulse"
            />
          </Flex>

          <Heading size="8" style={{ marginBottom: "1.5rem" }}>
            <Text style={{ color: "var(--gray-12)" }}>
              Powerful Features for
            </Text>
            <br />
            <Text style={{ color: "var(--accent-9)" }}>Smarter Learning</Text>
          </Heading>

          <Text
            size="5"
            style={{
              color: "var(--gray-11)",
              maxWidth: "32rem",
              lineHeight: "1.6",
            }}
          >
            Everything you need to transform your study materials into effective
            learning tools that flourish with time
          </Text>
        </Flex>

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "2rem",
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              style={{
                position: "relative",
                border: "1px solid var(--gray-6)",
                backgroundColor: "var(--color-panel-solid)",
                backdropFilter: "blur(8px)",
                borderRadius: "var(--radius-4)",
                padding: "2rem",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              className="hover:scale-105 hover:shadow-lg group"
            >
              <Box
                style={{
                  position: "relative",
                  width: "4rem",
                  height: "4rem",
                  backgroundColor: "var(--accent-3)",
                  borderRadius: "var(--radius-3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  transition: "all 0.3s ease",
                }}
                className="group-hover:bg-accent-4 group-hover:scale-110"
              >
                <feature.icon
                  size={28}
                  style={{ color: "var(--accent-9)" }}
                  className="group-hover:scale-110 transition-transform"
                />
              </Box>

              <Heading
                size="4"
                style={{
                  color: "var(--gray-12)",
                  marginBottom: "1rem",
                  transition: "color 0.3s ease",
                }}
                className="group-hover:text-accent-11"
              >
                {feature.title}
              </Heading>

              <Text
                size="3"
                style={{
                  color: "var(--gray-11)",
                  lineHeight: "1.6",
                }}
              >
                {feature.description}
              </Text>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
