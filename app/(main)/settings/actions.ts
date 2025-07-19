// actions.ts for SettingsPage
// Contains logic for updating user profile, uploading avatar, and related actions

// Type definitions for actions
export interface HandleSaveParams {
  profilePicture: File | null;
  displayName: string;
  bio: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showToast?: (
    message: string,
    type?: "success" | "error" | "info" | "warning"
  ) => void;
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
  console.log("useSettingsActions: hook initialized");
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
    showToast,
    setProfilePicture,
    setPreviewUrl,
  }: HandleSaveParams) => {
    console.log("useSettingsActions: handleSave called", {
      profilePicture,
      displayName,
      bio,
    });
    setIsLoading(true);
    if (showToast) showToast("", "info");
    // Validation
    if (displayName.length > 32) {
      if (showToast)
        showToast("Display name must be 32 characters or less.", "error");
      setIsLoading(false);
      return;
    }
    if (/\s/.test(displayName)) {
      if (showToast)
        showToast("Display name cannot contain whitespace.", "error");
      setIsLoading(false);
      return;
    }
    if (bio.length > 500) {
      if (showToast) showToast("Bio must be 500 characters or less.", "error");
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
      if (showToast) showToast("Profile updated successfully!", "success");
      setProfilePicture(null);
      setPreviewUrl(null);
    } catch {
      if (showToast) showToast("Error updating profile", "error");
    }
    setIsLoading(false);
  };

  // Handles file selection and preview
  const handleFileSelect = ({
    file,
    setProfilePicture,
    setPreviewUrl,
  }: HandleFileSelectParams) => {
    console.log("useSettingsActions: handleFileSelect called", file);
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
