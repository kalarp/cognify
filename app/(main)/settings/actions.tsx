// actions.tsx for SettingsPage
// Contains logic for updating user profile, uploading avatar, and related actions

// Type definitions for actions
export interface HandleSaveParams {
  profilePicture: File | null;
  displayName: string;
  bio: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setMessageType: React.Dispatch<
    React.SetStateAction<"success" | "error" | "info">
  >;
  setProfilePicture: React.Dispatch<React.SetStateAction<File | null>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface HandleFileSelectParams {
  file: File | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<File | null>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

import { useUserProfile } from "@/hooks/useUserProfile";

export function useSettingsActions() {
  const {
    userProfile,
    isLoading: profileLoading,
    updateUserProfile,
    uploadAvatar,
  } = useUserProfile();

  // Handles updating the user profile (display name, bio, avatar)
  const handleSave = async ({
    profilePicture,
    displayName,
    bio,
    setIsLoading,
    setMessage,
    setMessageType,
    setProfilePicture,
    setPreviewUrl,
  }: HandleSaveParams) => {
    setIsLoading(true);
    setMessage("");
    // Validation
    if (displayName.length > 32) {
      setMessage("Display name must be 32 characters or less.");
      setMessageType("error");
      setIsLoading(false);
      return;
    }
    if (/\s/.test(displayName)) {
      setMessage("Display name cannot contain whitespace.");
      setMessageType("error");
      setIsLoading(false);
      return;
    }
    if (bio.length > 500) {
      setMessage("Bio must be 500 characters or less.");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    // Rate limiting: allow 3 changes per hour
    const rateLimitKey = `profile-edit-${userProfile?.id}`;
    const now = Date.now();
    let edits: number[] = [];
    try {
      const stored = localStorage.getItem(rateLimitKey);
      if (stored) {
        edits = JSON.parse(stored);
        // Remove edits older than 1 hour
        edits = edits.filter((t) => now - t < 3600_000);
      }
    } catch {}
    if (edits.length >= 3) {
      const nextAllowed = new Date(edits[0] + 3600_000);
      setMessage(`Profile can only be updated 3 times per hour. Next update: ${nextAllowed.toLocaleTimeString()}`);
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    try {
      let avatarUrl = userProfile?.avatar_url || "";
      if (profilePicture) {
        avatarUrl = await uploadAvatar(profilePicture);
        await updateUserProfile({ avatar_url: avatarUrl });
      }
      await updateUserProfile({ display_name: displayName, bio });
      edits.push(now);
      localStorage.setItem(rateLimitKey, JSON.stringify(edits));
      setMessage("Profile updated successfully!");
      setMessageType("success");
      setProfilePicture(null);
      setPreviewUrl(null);
    } catch {
      setMessage("Error updating profile");
      setMessageType("error");
    }
    setIsLoading(false);
  };

  // Handles file selection and preview
  const handleFileSelect = ({
    file,
    setProfilePicture,
    setPreviewUrl,
  }: HandleFileSelectParams) => {
    setProfilePicture(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return {
    userProfile,
    profileLoading,
    handleSave,
    handleFileSelect,
  };
}
