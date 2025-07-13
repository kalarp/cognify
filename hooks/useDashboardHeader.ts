import React, { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";

export function useDashboardHeader() {
  const { userProfile } = useUserProfile();
  const [user, setUser] = useState({ name: "User", avatar: "/favicon.svg" });
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Only update user info after mount to avoid hydration mismatch
  React.useEffect(() => {
    if (userProfile) {
      setUser({
        name: userProfile.display_name || "User",
        avatar: userProfile.avatar_url || "/favicon.svg",
      });
    }
  }, [userProfile]);

  return { user, drawerOpen, setDrawerOpen };
}
