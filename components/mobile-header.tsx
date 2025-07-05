"use client";

import { useState } from "react";
import { Button, Flex, Text, Box, IconButton } from "@radix-ui/themes";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { Leaf } from "lucide-react";
import Link from "next/link";

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Flex justify="between" align="center" className="h-16">
        {/* Logo */}
        <Flex align="center" gap="2">
          <Leaf
            size={24}
            style={{
              color: "var(--accent-9)",
              transition: "transform 0.3s ease",
            }}
            className="hover:scale-110"
          />
          <Text size="5" weight="bold" style={{ color: "var(--accent-9)" }}>
            Cognify
          </Text>
        </Flex>

        {/* Menu button */}
        <IconButton
          variant="ghost"
          size="2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer"
        >
          {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
        </IconButton>
      </Flex>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <Box
          className="absolute left-0 right-0 top-full z-40 mx-2 rounded-lg border p-4 shadow-lg"
          style={{
            borderColor: "var(--gray-6)",
            backgroundColor: "var(--color-panel-solid)",
          }}
        >
          <Flex direction="column" gap="3">
            <Button
              asChild
              variant="ghost"
              size="2"
              className="cursor-pointer justify-start"
            >
              <Link href="#features" onClick={() => setIsMenuOpen(false)}>
                <Text
                  size="2"
                  style={{ color: "var(--gray-11)" }}
                  className="block py-2 hover:text-accent-11 transition-colors"
                >
                  Features
                </Text>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="2"
              className="cursor-pointer justify-start"
            >
              <Link
                href="https://github.com/chaosweasl/cognify#readme"
                onClick={() => setIsMenuOpen(false)}
              >
                <Text
                  size="2"
                  style={{ color: "var(--gray-11)" }}
                  className="block py-2 hover:text-accent-11 transition-colors"
                >
                  How it Works
                </Text>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="2"
              className="cursor-pointer justify-start"
            >
              <Link
                href="https://github.com/chaosweasl/cognify"
                onClick={() => setIsMenuOpen(false)}
              >
                <Flex align="center" gap="2" className="py-2">
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
            </Button>
            <Button asChild size="2" className="w-full mt-2 cursor-pointer">
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
            <Flex justify="center" className="mt-4">
              <ThemeToggle />
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
}
