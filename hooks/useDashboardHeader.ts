import React, { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";

export function useDashboardHeader() {
  console.log("useDashboardHeader: render");
  const { userProfile } = useUserProfile();
  const [user, setUser] = useState({
    name: "User",
    avatar: "/assets/nopfp.png",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  React.useEffect(() => {
    if (userProfile) {
      setUser({
        name: userProfile.display_name || "User",
        avatar: userProfile.avatar_url || "/assets/nopfp.png",
      });
      console.log("useDashboardHeader: userProfile updated", userProfile);
    }
  }, [userProfile]);

  return { user, drawerOpen, setDrawerOpen };
}
