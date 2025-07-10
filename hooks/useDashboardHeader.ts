import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";

export function useDashboardHeader() {
  const { userProfile } = useUserProfile();
  const user = {
    name: userProfile?.display_name || "User",
    avatar: userProfile?.avatar_url || "/favicon.svg",
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  return { user, drawerOpen, setDrawerOpen };
}
