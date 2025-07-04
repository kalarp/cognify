"use client";

import React, { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import * as Avatar from "@radix-ui/react-avatar";
import * as Toast from "@radix-ui/react-toast";
import * as Label from "@radix-ui/react-label";
import * as Dialog from "@radix-ui/react-dialog";
import * as Separator from "@radix-ui/react-separator";
import { Slot } from "@radix-ui/react-slot";
import Image from "next/image";

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
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
      setPreviewUrl(null);
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

  const handleFileSelect = (file: File | null) => {
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

  const typeClasses = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  if (profileLoading) {
    return (
      <Toast.Provider>
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <div className="text-center">Loading...</div>
        </div>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
      </Toast.Provider>
    );
  }

  return (
    <Toast.Provider>
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Settings</h1>

        {message && (
          <Toast.Root
            className={`${typeClasses[messageType]} rounded-lg p-4 border shadow-lg mb-4`}
            open={!!message}
            onOpenChange={(open) => !open && handleClearMessage()}
            duration={3000}
          >
            <Toast.Title className="font-semibold text-sm">
              {message}
            </Toast.Title>
            <Toast.Action altText="Close" asChild>
              <button
                className="ml-2 text-current opacity-60 hover:opacity-100"
                onClick={handleClearMessage}
              >
                ×
              </button>
            </Toast.Action>
          </Toast.Root>
        )}

        {/* Current Avatar Display */}
        <div className="mb-6 text-center">
          <div className="inline-block">
            <Avatar.Root className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
              {userProfile?.avatar_url && (
                <Avatar.Image
                  src={userProfile.avatar_url}
                  alt="Current avatar"
                  className="w-full h-full object-cover"
                />
              )}
              <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-medium">
                {userProfile?.display_name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
          <p className="text-sm text-gray-600 mt-2">Current Avatar</p>
        </div>

        <Separator.Root className="w-full h-px bg-gray-200 my-6" />

        {/* File Upload */}
        <div className="mb-4">
          <Label.Root className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture:
          </Label.Root>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {profilePicture && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-600">
                ✓ {profilePicture.name}
              </span>
              {previewUrl && (
                <Dialog.Root open={showPreview} onOpenChange={setShowPreview}>
                  <Dialog.Trigger asChild>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Preview
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md w-full z-50">
                      <Dialog.Title className="text-lg font-semibold mb-4">
                        File Preview
                      </Dialog.Title>
                      <div className="relative w-full h-96">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <Dialog.Close asChild>
                        <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition-colors">
                          Close
                        </button>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              )}
              <button
                onClick={() => handleFileSelect(null)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Display Name Input */}
        <div className="mb-4">
          <Label.Root
            htmlFor="display-name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Display Name
          </Label.Root>
          <input
            id="display-name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your display name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Bio Textarea */}
        <div className="mb-6">
          <Label.Root
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Bio
          </Label.Root>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Save Button */}
        <Slot>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </Slot>
      </div>
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
    </Toast.Provider>
  );
};

export default SettingsPage;
