"use client";

import React, { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import Avatar from "@/components/Avatar";
import Alert from "@/components/Alert";
import LoadingButton from "@/components/LoadingButton";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import FileUpload from "@/components/FileUpload";
import { ToastProvider } from "@/components/Toast";
import * as Toast from "@radix-ui/react-toast";

const SettingsPage = () => {
  const {
    userProfile,
    isLoading: profileLoading,
    updateUserProfile,
    uploadAvatar,
  } = useUserProfile();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [displayName, setDisplayName] = useState<string>(
    userProfile?.display_name || ""
  );
  const [bio, setBio] = useState<string>(userProfile?.bio || "");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );

  // Update local state when profile loads
  React.useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.display_name || "");
      setBio(userProfile.bio || "");
    }
  }, [userProfile]);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      let avatarUrl = userProfile?.avatar_url || "";

      // Upload new profile picture if selected
      if (profilePicture) {
        avatarUrl = await uploadAvatar(profilePicture);
      }

      // Update profile in database
      await updateUserProfile({
        display_name: displayName,
        avatar_url: avatarUrl,
        bio: bio,
      });

      setMessage("Profile updated successfully!");
      setMessageType("success");
      // Reset file input
      setProfilePicture(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile");
      setMessageType("error");
    }

    setIsLoading(false);
  };

  const handleClearMessage = () => {
    setMessage("");
  };

  if (profileLoading) {
    return (
      <ToastProvider>
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <div className="text-center">Loading...</div>
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Settings</h1>

        {message && (
          <Alert
            message={message}
            type={messageType}
            onClose={handleClearMessage}
          />
        )}

        {/* Current Avatar Display */}
        <div className="mb-6 text-center">
          <Avatar
            src={userProfile?.avatar_url || null}
            alt="Current avatar"
            size="lg"
          />
          <p className="text-sm text-gray-600 mt-2">Current Avatar</p>
        </div>

        <FileUpload
          label="Profile Picture:"
          onFileSelect={setProfilePicture}
          currentFile={profilePicture}
          accept="image/*"
          showPreview={true}
        />

        <FormInput
          label="Display Name"
          value={displayName}
          onChange={setDisplayName}
          placeholder="Enter your display name"
        />

        <FormTextarea
          label="Bio"
          value={bio}
          onChange={setBio}
          placeholder="Tell us about yourself"
          rows={3}
        />

        <LoadingButton
          isLoading={isLoading}
          onClick={handleSave}
          className="w-full"
        >
          Save Changes
        </LoadingButton>
      </div>
    </ToastProvider>
  );
};

export default SettingsPage;
