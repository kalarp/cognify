import { Button, Box, Container, Flex, Text, Heading } from "@radix-ui/themes";
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
    <Box
      style={{
        background:
          "linear-gradient(135deg, var(--accent-9), var(--accent-10))",
        padding: "5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        style={{
          position: "absolute",
          inset: "0",
          opacity: "0.1",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: "2.5rem",
            left: "2.5rem",
            width: "10rem",
            height: "10rem",
            borderRadius: "50%",
            backgroundColor: "var(--color-background)",
            filter: "blur(32px)",
          }}
        />
        <Box
          style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "2.5rem",
            width: "8rem",
            height: "8rem",
            borderRadius: "50%",
            backgroundColor: "var(--color-background)",
            filter: "blur(24px)",
          }}
        />
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "16rem",
            height: "16rem",
            borderRadius: "50%",
            backgroundColor: "var(--color-background)",
            filter: "blur(48px)",
          }}
        />
      </Box>

      <Container size="4">
        <Flex
          direction="column"
          align="center"
          style={{ textAlign: "center", position: "relative" }}
        >
          <Heading
            size="8"
            style={{
              color: "var(--color-background)",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
            }}
          >
            Ready to Cultivate Your
            <br />
            <Text style={{ color: "var(--gray-1)" }}>Study Garden?</Text>
          </Heading>

          <Text
            size="5"
            style={{
              color: "var(--gray-1)",
              marginBottom: "3rem",
              maxWidth: "32rem",
              lineHeight: "1.6",
              opacity: "0.9",
            }}
          >
            Join students worldwide who are already using Cognify to create
            smarter study materials. It's free, open-source, and ready to bloom
            with your AI API token.
          </Text>

          <Flex direction="column" gap="4" style={{ marginBottom: "4rem" }}>
            <Button
              asChild
              size="4"
              style={{
                backgroundColor: "var(--color-background)",
                color: "var(--accent-9)",
                padding: "1rem 2.5rem",
                borderRadius: "var(--radius-4)",
                border: "1px solid var(--gray-3)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                minWidth: "20rem",
              }}
              className="hover:scale-105 hover:shadow-lg"
            >
              <Link href="/dashboard">
                <Flex align="center" gap="3">
                  <Leaf size={20} />
                  <Text size="3" weight="medium">
                    Start creating your flashcards
                  </Text>
                  <ArrowRight size={20} />
                </Flex>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "var(--gray-1)",
                border: "1px solid var(--gray-1)",
                padding: "1rem 2rem",
                borderRadius: "var(--radius-4)",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                opacity: "0.9",
              }}
              className="hover:scale-105 hover:opacity-100"
            >
              <Link href="https://github.com/chaosweasl/cognify">
                <Flex align="center" gap="2">
                  <Github size={20} style={{ color: "var(--gray-1)" }} />
                  <Text
                    size="3"
                    weight="medium"
                    style={{ color: "var(--gray-1)" }}
                  >
                    Star on GitHub
                  </Text>
                  <Star size={16} style={{ color: "var(--gray-1)" }} />
                </Flex>
              </Link>
            </Button>
          </Flex>

          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            <Box
              style={{
                position: "relative",
                backgroundColor: "var(--color-background)",
                borderRadius: "var(--radius-4)",
                padding: "2rem",
                border: "1px solid var(--gray-6)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                opacity: "0.95",
              }}
              className="hover:opacity-100 hover:scale-105 hover:shadow-lg group"
            >
              {/* Decorative corner */}
              <Box
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  width: "0.75rem",
                  height: "0.75rem",
                  backgroundColor: "var(--accent-6)",
                  borderRadius: "50%",
                  opacity: "0",
                  transition: "opacity 0.3s ease",
                }}
                className="group-hover:opacity-100"
              />

              <Flex direction="column" align="center" gap="4">
                <Box
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--accent-3)",
                    borderRadius: "var(--radius-3)",
                    transition: "all 0.3s ease",
                  }}
                  className="group-hover:bg-accent-4"
                >
                  <TreePine
                    size={32}
                    style={{ color: "var(--accent-9)" }}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Box>
                <Heading
                  size="7"
                  style={{
                    color: "var(--accent-9)",
                    marginBottom: "0.5rem",
                    transition: "transform 0.3s ease",
                  }}
                  className="group-hover:scale-105"
                >
                  100%
                </Heading>
                <Text
                  size="3"
                  weight="medium"
                  style={{ color: "var(--gray-11)" }}
                >
                  Free & Open Source
                </Text>
              </Flex>
            </Box>

            <Box
              style={{
                position: "relative",
                backgroundColor: "var(--color-background)",
                borderRadius: "var(--radius-4)",
                padding: "2rem",
                border: "1px solid var(--gray-6)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                opacity: "0.95",
              }}
              className="hover:opacity-100 hover:scale-105 hover:shadow-lg group"
            >
              {/* Decorative dots */}
              <Box
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  width: "0.5rem",
                  height: "0.5rem",
                  backgroundColor: "var(--accent-5)",
                  borderRadius: "50%",
                }}
              />

              <Flex direction="column" align="center" gap="4">
                <Box
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--accent-3)",
                    borderRadius: "var(--radius-3)",
                    transition: "all 0.3s ease",
                  }}
                  className="group-hover:bg-accent-4 group-hover:rotate-12"
                >
                  <Flower size={32} style={{ color: "var(--accent-9)" }} />
                </Box>
                <Heading
                  size="7"
                  style={{
                    color: "var(--accent-9)",
                    marginBottom: "0.5rem",
                    transition: "transform 0.3s ease",
                  }}
                  className="group-hover:scale-105"
                >
                  ∞
                </Heading>
                <Text
                  size="3"
                  weight="medium"
                  style={{ color: "var(--gray-11)" }}
                >
                  Unlimited Flashcards
                </Text>
              </Flex>
            </Box>

            <Box
              style={{
                position: "relative",
                backgroundColor: "var(--color-background)",
                borderRadius: "var(--radius-4)",
                padding: "2rem",
                border: "1px solid var(--gray-6)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                opacity: "0.95",
              }}
              className="hover:opacity-100 hover:scale-105 hover:shadow-lg group"
            >
              {/* Decorative line */}
              <Box
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  width: "1.5rem",
                  height: "0.125rem",
                  backgroundColor: "var(--accent-6)",
                  borderRadius: "9999px",
                  opacity: "0",
                  transition: "opacity 0.3s ease",
                }}
                className="group-hover:opacity-100"
              />

              <Flex direction="column" align="center" gap="4">
                <Box
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--accent-3)",
                    borderRadius: "var(--radius-3)",
                    transition: "all 0.3s ease",
                  }}
                  className="group-hover:bg-accent-4"
                >
                  <Shield
                    size={32}
                    style={{ color: "var(--accent-9)" }}
                    className="group-hover:scale-105 group-hover:rotate-3 transition-transform"
                  />
                </Box>
                <Heading
                  size="7"
                  style={{
                    color: "var(--accent-9)",
                    marginBottom: "0.5rem",
                    transition: "transform 0.3s ease",
                  }}
                  className="group-hover:scale-105"
                >
                  Privacy
                </Heading>
                <Text
                  size="3"
                  weight="medium"
                  style={{ color: "var(--gray-11)" }}
                >
                  Your Data, Your Control
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
