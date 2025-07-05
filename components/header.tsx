"use client";

import { Box } from "@radix-ui/themes";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { DesktopHeader } from "./desktop-header";
import { MobileHeader } from "./mobile-header";

export function Header() {
  const isMobile = useIsMobile();

  return (
    <Box asChild>
      <header className="sticky top-0 z-50 border-b border-gray-6 bg-color-panel-solid backdrop-blur-sm">
        <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isMobile ? <MobileHeader /> : <DesktopHeader />}
        </Box>
      </header>
    </Box>
  );
}
