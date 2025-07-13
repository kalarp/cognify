"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("userProfile");
      if (cached) return JSON.parse(cached);
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: userResponse } = await supabase.auth.getUser();
      const user = userResponse?.user;

      if (user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);

          // If profile doesn't exist, create one
          if (error.code === "PGRST116") {
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert([
                {
                  id: user.id,
                  display_name:
                    user.user_metadata?.name || user.email?.split("@")[0] || "",
                  avatar_url: user.user_metadata?.avatar_url || null,
                  bio: "",
                },
              ])
              .select()
              .single();

            if (createError) {
              console.error("Error creating profile:", createError);
              setError("Error creating profile");
              return;
            }

            if (newProfile) {
              setUserProfile(newProfile);
              if (typeof window !== "undefined") {
                localStorage.setItem("userProfile", JSON.stringify(newProfile));
              }
            }
          } else {
            setError("Error fetching profile");
          }
          return;
        }

        if (profile) {
          setUserProfile(profile);
          if (typeof window !== "undefined") {
            localStorage.setItem("userProfile", JSON.stringify(profile));
          }
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      const { data: userResponse } = await supabase.auth.getUser();
      const user = userResponse?.user;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      // Refresh profile data
      await fetchUserProfile();
      // Also update cache
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("userProfile");
        let merged = cached ? { ...JSON.parse(cached), ...updates } : updates;
        localStorage.setItem("userProfile", JSON.stringify(merged));
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    try {
      const { data: userResponse } = await supabase.auth.getUser();
      const user = userResponse?.user;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (err) {
      console.error("Error uploading avatar:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    userProfile,
    isLoading,
    error,
    fetchUserProfile,
    updateUserProfile,
    uploadAvatar,
    setUserProfile
  };
};
