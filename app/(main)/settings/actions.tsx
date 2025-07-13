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
    try {
      let avatarUrl = userProfile?.avatar_url || "";
      if (profilePicture) {
        avatarUrl = await uploadAvatar(profilePicture);
        await updateUserProfile({ avatar_url: avatarUrl });
      }
      await updateUserProfile({ display_name: displayName, bio });
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
