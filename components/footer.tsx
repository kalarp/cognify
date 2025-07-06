import { Github, Mail, Heart, Leaf, Sparkles, TreePine } from "lucide-react";
import { Box, Container, Flex, Text, Heading } from "@radix-ui/themes";
import Link from "next/link";

export function Footer() {
  return (
    <Box
      style={{
        backgroundColor: "var(--color-panel-solid)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid var(--gray-6)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative plant elements */}
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
            bottom: "0",
            left: "2.5rem",
            width: "8rem",
            height: "8rem",
            borderRadius: "50%",
            backgroundColor: "var(--accent-9)",
            filter: "blur(24px)",
          }}
        />
        <Box
          style={{
            position: "absolute",
            top: "0",
            right: "5rem",
            width: "6rem",
            height: "6rem",
            borderRadius: "50%",
            backgroundColor: "var(--accent-9)",
            filter: "blur(16px)",
          }}
        />
      </Box>

      <Container size="4" style={{ padding: "3rem 0", position: "relative" }}>
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Logo and Description */}
          <Box style={{ gridColumn: "1 / -1" }}>
            <Flex
              align="center"
              gap="3"
              style={{ marginBottom: "1rem" }}
              className="group"
            >
              <Box style={{ position: "relative" }}>
                <Leaf
                  size={32}
                  style={{
                    color: "var(--accent-9)",
                    transition: "transform 0.3s ease",
                  }}
                  className="group-hover:scale-110"
                />
                <Sparkles
                  size={12}
                  style={{
                    color: "var(--accent-9)",
                    position: "absolute",
                    top: "-0.25rem",
                    right: "-0.25rem",
                  }}
                  className="animate-pulse"
                />
              </Box>
              <Text size="5" weight="bold" style={{ color: "var(--accent-9)" }}>
                Cognify
              </Text>
            </Flex>
            <Text
              size="3"
              style={{
                color: "var(--gray-11)",
                marginBottom: "1rem",
                maxWidth: "28rem",
                lineHeight: "1.6",
              }}
            >
              Transform your study materials into intelligent flashcards with
              AI. Free, open-source, and designed for students who want to learn
              smarter and grow their knowledge like a garden.
            </Text>
            <Flex gap="2">
              <Box
                style={{
                  color: "var(--gray-11)",
                  padding: "0.5rem",
                  borderRadius: "var(--radius-3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover:bg-accent-3 hover:text-accent-11"
              >
                <Link href="https://github.com/chaosweasl/cognify">
                  <Github size={24} />
                </Link>
              </Box>
              <Box
                style={{
                  color: "var(--gray-11)",
                  padding: "0.5rem",
                  borderRadius: "var(--radius-3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover:bg-accent-3 hover:text-accent-11"
              >
                <Link href="mailto:17daniel.dev@gmail.com">
                  <Mail size={24} />
                </Link>
              </Box>
            </Flex>
          </Box>

          {/* Product Links */}
          <Box>
            <Heading
              size="3"
              style={{
                color: "var(--gray-12)",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <Flex align="center" gap="2">
                <TreePine size={16} style={{ color: "var(--accent-9)" }} />
                Product
              </Flex>
            </Heading>
            <Flex direction="column" gap="2">
              <Box
                style={{
                  color: "var(--gray-11)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover:bg-accent-3 hover:text-gray-12"
              >
                <Link href="#features">
                  <Text size="2">Features</Text>
                </Link>
              </Box>
              <Box
                style={{
                  color: "var(--gray-11)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover:bg-accent-3 hover:text-gray-12"
              >
                <Link href="https://github.com/chaosweasl/cognify#readme">
                  <Text size="2">How it Works</Text>
                </Link>
              </Box>
              <Box
                style={{
                  color: "var(--gray-11)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover:bg-accent-3 hover:text-gray-12"
              >
                <Link href="https://github.com/chaosweasl/cognify#readme">
                  <Text size="2">Documentation</Text>
                </Link>
              </Box>
              <Box
                style={{
                  color: "var(--gray-11)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover:bg-accent-3 hover:text-gray-12"
              >
                <Link href="https://github.com/chaosweasl/cognify/wiki">
                  <Text size="2">API Reference</Text>
                </Link>
              </Box>
            </Flex>
          </Box>

          {/* Support Links */}
          <Box>
            <Heading
              size="3"
              style={{
                color: "var(--gray-12)",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <Flex align="center" gap="2">
                <Leaf size={16} style={{ color: "var(--accent-9)" }} />
                Support
              </Flex>
            </Heading>
            <Flex direction="column" gap="2">
              <Box
                style={{
                  color: "var(--gray-11)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover:bg-accent-3 hover:text-gray-12"
              >
                <Link href="https://github.com/chaosweasl/cognify/issues">
                  <Text size="2">Report Issues</Text>
                </Link>
              </Box>
              <Box
                style={{
                  color: "var(--gray-11)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover:bg-accent-3 hover:text-gray-12"
              >
                <Link href="https://github.com/chaosweasl/cognify/discussions">
                  <Text size="2">Community</Text>
                </Link>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box
          style={{
            borderTop: "1px solid var(--gray-6)",
            paddingTop: "2rem",
            marginTop: "2rem",
          }}
        >
          <Flex
            direction="column"
            gap="4"
            align="center"
            style={{ textAlign: "center" }}
          >
            <Text size="2" style={{ color: "var(--gray-11)" }}>
              <Flex align="center" gap="2" wrap="wrap" justify="center">
                <span>© 2025 Cognify. Open source and made with</span>
                <Heart
                  size={16}
                  style={{ color: "var(--red-9)" }}
                  className="animate-pulse"
                />
                <span>
                  for students everywhere to help their knowledge bloom.
                </span>
              </Flex>
            </Text>
            <Box
              style={{
                color: "var(--gray-11)",
                padding: "0.25rem 0.5rem",
                borderRadius: "var(--radius-2)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              className="hover:bg-accent-3 hover:text-gray-12"
            >
              <Link href="https://github.com/chaosweasl/cognify/blob/main/LICENSE">
                <Text size="2">License</Text>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
