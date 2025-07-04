"use client";

import React, { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import * as Toast from "@radix-ui/react-toast";
import * as Label from "@radix-ui/react-label";
import * as Separator from "@radix-ui/react-separator";
import { Slot } from "@radix-ui/react-slot";
import Image from "next/image";
import { Camera, User, FileText, Save, X, Eye } from "lucide-react";

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
    success:
      "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800",
    error:
      "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800",
    info: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800",
  };

  if (profileLoading) {
    return (
      <Toast.Provider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <span className="loading loading-dots loading-lg text-primary"></span>
                <div className="text-base-content mt-4">
                  Loading your settings...
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
      </Toast.Provider>
    );
  }

  return (
    <Toast.Provider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600">
              Customize your profile and preferences
            </p>
          </div>

          {/* Toast Message */}
          {message && (
            <Toast.Root
              className={`${typeClasses[messageType]} rounded-xl p-4 border shadow-lg mb-6 backdrop-blur-sm`}
              open={!!message}
              onOpenChange={(open) => !open && handleClearMessage()}
              duration={4000}
            >
              <div className="flex items-center justify-between">
                <Toast.Title className="font-semibold text-sm flex items-center gap-2">
                  {messageType === "success" && (
                    <span className="text-green-600">✓</span>
                  )}
                  {messageType === "error" && (
                    <span className="text-red-600">✕</span>
                  )}
                  {messageType === "info" && (
                    <span className="text-blue-600">ℹ</span>
                  )}
                  {message}
                </Toast.Title>
                <Toast.Action altText="Close" asChild>
                  <button
                    className="ml-2 text-current opacity-60 hover:opacity-100 transition-opacity"
                    onClick={handleClearMessage}
                  >
                    <X size={16} />
                  </button>
                </Toast.Action>
              </div>
            </Toast.Root>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Avatar Card */}
            <div className="lg:col-span-1">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="relative group">
                    <div className="avatar mx-auto">
                      <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {userProfile?.avatar_url ? (
                          <Image
                            src={userProfile.avatar_url}
                            alt="Current avatar"
                            width={128}
                            height={128}
                            className="object-cover transition-transform rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-primary-content font-bold text-3xl rounded-full">
                            {userProfile?.display_name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mt-4">
                    {userProfile?.display_name || "No name set"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {userProfile?.bio || "No bio yet"}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Settings Card */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <User className="text-blue-600" size={24} />
                    Profile Information
                  </h2>

                  {/* File Upload Section */}
                  <div className="mb-6">
                    <Label.Root className="block text-sm font-medium text-gray-700 mb-3">
                      Profile Picture
                    </Label.Root>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileSelect(e.target.files?.[0] || null)
                        }
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50"
                      >
                        <div className="text-center">
                          <Camera
                            className="mx-auto text-gray-400 mb-2"
                            size={32}
                          />
                          <p className="text-sm text-gray-600">
                            Click to upload a new photo
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </label>
                    </div>

                    {profilePicture && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            <span className="text-sm text-gray-700 font-medium">
                              {profilePicture.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {previewUrl && (
                              <>
                                <button
                                  onClick={() => setShowPreview(true)}
                                  className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                                >
                                  <Eye size={14} />
                                  Preview
                                </button>

                                {/* DaisyUI Modal for Image Preview */}
                                <div
                                  className={`modal ${
                                    showPreview ? "modal-open" : ""
                                  }`}
                                >
                                  <div className="modal-box max-w-sm">
                                    <div className="flex items-center justify-between mb-4">
                                      <h3 className="font-bold text-lg">
                                        Image Preview
                                      </h3>
                                      <button
                                        onClick={() => setShowPreview(false)}
                                        className="btn btn-sm btn-circle btn-ghost"
                                      >
                                        <X size={16} />
                                      </button>
                                    </div>

                                    {/* Preview Avatar using DaisyUI */}
                                    <div className="flex flex-col items-center space-y-4">
                                      <div className="avatar">
                                        <div className="w-48 h-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                                          <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            width={192}
                                            height={192}
                                            className="object-cover rounded-full"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="modal-action">
                                      <button
                                        onClick={() => setShowPreview(false)}
                                        className="btn btn-primary"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                  <div
                                    className="modal-backdrop"
                                    onClick={() => setShowPreview(false)}
                                  ></div>
                                </div>
                              </>
                            )}
                            <button
                              onClick={() => handleFileSelect(null)}
                              className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                            >
                              <X size={14} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator.Root className="w-full h-px bg-gray-200 my-6" />

                  {/* Display Name Input */}
                  <div className="mb-6">
                    <Label.Root
                      htmlFor="display-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Display Name
                    </Label.Root>
                    <div className="relative">
                      <input
                        id="display-name"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      />
                      <User
                        className="absolute left-3 top-3.5 text-gray-400"
                        size={18}
                      />
                    </div>
                  </div>

                  {/* Bio Textarea */}
                  <div className="mb-8">
                    <Label.Root
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Bio
                    </Label.Root>
                    <div className="relative">
                      <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                      />
                      <FileText
                        className="absolute left-3 top-3.5 text-gray-400"
                        size={18}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {bio.length}/500 characters
                    </p>
                  </div>

                  {/* Save Button */}
                  <Slot>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className={`btn btn-primary btn-lg w-full flex items-center justify-center gap-2 ${
                        isLoading ? "loading" : ""
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </Slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
    </Toast.Provider>
  );
};

export default SettingsPage;
