import {
  Button,
  Flex,
  Text,
  Box,
  Heading,
  Container,
  Badge,
} from "@radix-ui/themes";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Hero() {
  return (
    <Box
      style={{
        background: "linear-gradient(135deg, var(--accent-2), var(--accent-3))",
        padding: "5rem 0 8rem",
      }}
    >
      <Container size="4">
        <Flex direction="column" align="center" style={{ textAlign: "center" }}>
          <Badge color="green" size="2" style={{ marginBottom: "1.5rem" }}>
            🤖 AI-Powered Learning
          </Badge>

          <Heading
            size="9"
            style={{ marginBottom: "1.5rem", lineHeight: "1.1" }}
          >
            Transform Your Notes Into
            <br />
            <Text style={{ color: "var(--accent-9)" }}>Smart Flashcards</Text>
          </Heading>

          <Text
            size="5"
            style={{
              color: "var(--gray-11)",
              marginBottom: "2rem",
              maxWidth: "48rem",
              lineHeight: "1.6",
            }}
          >
            Cognify uses AI to automatically convert your classwork, notes, and
            PDFs into interactive flashcards. Study smarter, not harder with
            personalized learning tools that grow with you.
          </Text>

          <Flex
            gap="4"
            style={{ marginBottom: "3rem" }}
            className="flex-col sm:flex-row"
          >
            <Button size="4" style={{ minWidth: "12rem" }}>
              Start Creating Flashcards
              <ArrowRightIcon />
            </Button>
            <Button variant="outline" size="4" asChild>
              <Link href="https://github.com/chaosweasl/cognify">
                <GitHubLogoIcon />
                View on GitHub
              </Link>
            </Button>
          </Flex>

          <Box
            style={{
              backgroundColor: "var(--color-panel-solid)",
              borderRadius: "var(--radius-4)",
              padding: "0.5rem",
              maxWidth: "64rem",
              width: "100%",
              border: "1px solid var(--gray-6)",
              boxShadow: "var(--shadow-4)",
            }}
          >
            <Box
              style={{
                backgroundColor: "var(--gray-3)",
                borderRadius: "var(--radius-3)",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <Flex
                align="center"
                justify="center"
                gap="2"
                style={{ marginBottom: "1rem" }}
              >
                <Text size="1" style={{ color: "var(--gray-9)" }}>
                  🧠 Live Demo Preview ✨
                </Text>
              </Flex>
              <Box
                style={{
                  backgroundColor: "var(--color-panel-solid)",
                  borderRadius: "var(--radius-3)",
                  padding: "1.5rem",
                  boxShadow: "var(--shadow-2)",
                }}
              >
                <Flex direction="column" gap="4" style={{ textAlign: "left" }}>
                  <Flex align="center" gap="2">
                    <Box
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "var(--red-9)",
                        borderRadius: "50%",
                      }}
                    ></Box>
                    <Box
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "var(--yellow-9)",
                        borderRadius: "50%",
                      }}
                    ></Box>
                    <Box
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "var(--green-9)",
                        borderRadius: "50%",
                      }}
                    ></Box>
                  </Flex>
                  <Box>
                    <Flex
                      align="center"
                      gap="2"
                      style={{ marginBottom: "0.75rem" }}
                    >
                      <Text size="1" weight="bold">
                        🌱 📝 Your Notes:
                      </Text>
                    </Flex>
                    <Box
                      style={{
                        backgroundColor: "var(--gray-3)",
                        padding: "1rem",
                        borderRadius: "var(--radius-2)",
                        border: "1px solid var(--gray-6)",
                      }}
                    >
                      <Text size="1" style={{ color: "var(--gray-11)" }}>
                        "Photosynthesis is the process by which plants convert
                        sunlight into energy using chlorophyll in their
                        leaves..."
                      </Text>
                    </Box>
                  </Box>
                  <Box>
                    <Flex
                      align="center"
                      gap="2"
                      style={{ marginBottom: "0.75rem" }}
                    >
                      <Text size="1" weight="bold">
                        🤖 AI Generated Flashcard:
                      </Text>
                    </Flex>
                    <Box
                      style={{
                        backgroundColor: "var(--accent-3)",
                        padding: "1rem",
                        borderRadius: "var(--radius-2)",
                        border: "1px solid var(--accent-6)",
                      }}
                    >
                      <Text
                        size="1"
                        weight="bold"
                        style={{
                          color: "var(--accent-11)",
                          marginBottom: "0.25rem",
                          display: "block",
                        }}
                      >
                        Q: What is photosynthesis?
                      </Text>
                      <Text size="1" style={{ color: "var(--gray-11)" }}>
                        <strong>A:</strong> The process by which plants convert
                        sunlight into energy using chlorophyll
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
