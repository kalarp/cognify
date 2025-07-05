"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Leaf } from "lucide-react";
import Link from "next/link";

export function DesktopHeader() {
  return (
    <Flex justify="between" align="center" className="h-16">
      {/* Logo */}
      <Flex align="center" gap="3">
        <Leaf
          size={28}
          style={{
            color: "var(--accent-9)",
            transition: "transform 0.3s ease",
          }}
          className="hover:scale-110"
        />
        <Text size="6" weight="bold" style={{ color: "var(--accent-9)" }}>
          Cognify
        </Text>
      </Flex>

      {/* Navigation */}
      <Flex align="center" gap="8">
        <Link href="#features">
          <Text
            size="2"
            style={{ color: "var(--gray-11)" }}
            className="hover:text-accent-11 transition-colors"
          >
            Features
          </Text>
        </Link>
        <Link href="https://github.com/chaosweasl/cognify#readme">
          <Text
            size="2"
            style={{ color: "var(--gray-11)" }}
            className="hover:text-accent-11 transition-colors"
          >
            How it Works
          </Text>
        </Link>
        <Link href="https://github.com/chaosweasl/cognify">
          <Flex align="center" gap="2">
            <GitHubLogoIcon />
            <Text
              size="2"
              style={{ color: "var(--gray-11)" }}
              className="hover:text-accent-11 transition-colors"
            >
              GitHub
            </Text>
          </Flex>
        </Link>
        <Button size="2">Get Started</Button>
        <ThemeToggle />
      </Flex>
    </Flex>
  );
}
