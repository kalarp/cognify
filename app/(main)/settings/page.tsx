"use client";

import React, { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import Image from "next/image";
import { User, FileText, Save, X, Eye } from "lucide-react";
import { useSettingsActions } from "./actions";

const SettingsPage = () => {
  const { userProfile, isLoading: profileLoading } = useUserProfile();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [displayName, setDisplayName] = useState<string>(userProfile?.display_name || "");
  const [bio, setBio] = useState<string>(userProfile?.bio || "");
  const [validationError, setValidationError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { handleSave, handleFileSelect } = useSettingsActions();

  // Update local state when profile loads
  React.useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.display_name || "");
      setBio(userProfile.bio || "");
    }
  }, [userProfile]);

  React.useEffect(() => {
    // Real-time validation
    if (displayName.length > 32) {
      setValidationError("Display name must be 32 characters or less.");
    } else if (/\s/.test(displayName)) {
      setValidationError("Display name cannot contain whitespace.");
    } else if (bio.length > 500) {
      setValidationError("Bio must be 500 characters or less.");
    } else {
      setValidationError("");
    }
  }, [displayName, bio]);

  const onSave = () => {
    if (validationError) return;
    handleSave({
      profilePicture,
      displayName,
      bio,
      setIsLoading,
      setMessage,
      setMessageType,
      setProfilePicture,
      setPreviewUrl,
    });
  };

  const onFileSelect = (file: File | null) =>
    handleFileSelect({ file, setProfilePicture, setPreviewUrl });

  const getAlertClass = () => {
    switch (messageType) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      default:
        return "alert-info";
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-base-200 p-4">
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
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Profile Settings
          </h1>
          <p className="text-base-content/70">
            Customize your profile and preferences
          </p>
        </div>

        {/* Toast Message */}
        {message && (
          <div className={`alert ${getAlertClass()} mb-6`}>
            <div className="flex items-center justify-between w-full">
              <span>{message}</span>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setMessage("")}
                title="Close message"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        {validationError && (
          <div className="alert alert-error mb-6">
            <span>{validationError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Avatar Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="avatar mx-auto">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {userProfile?.avatar_url ? (
                      <Image
                        src={userProfile.avatar_url}
                        alt="Current avatar"
                        width={128}
                        height={128}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary text-primary-content font-bold text-3xl rounded-full">
                        {userProfile?.display_name?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-base-content mt-4">
                  {userProfile?.display_name || "No name set"}
                </h3>
                <p className="text-base-content/70 text-sm mt-1">
                  {userProfile?.bio || "No bio yet"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Settings Card */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
                  <User className="text-primary" size={24} />
                  Profile Information
                </h2>

                {/* File Upload Section */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium">
                      Profile Picture
                    </span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
                    className="file-input file-input-bordered file-input-primary w-full"
                  />
                  {profilePicture && (
                    <div className="mt-4 p-3 bg-base-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-success">✓</span>
                          <span className="text-sm font-medium">
                            {profilePicture.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {previewUrl && (
                            <>
                              <button
                                onClick={() => setShowPreview(true)}
                                className="btn btn-sm btn-outline btn-primary"
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
                                <div className="modal-box">
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
                            onClick={() => onFileSelect(null)}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            <X size={14} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="divider"></div>

                {/* Display Name Input */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium">Display Name</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                      className="input input-bordered w-full pl-10"
                    />
                    <User
                      className="absolute left-3 top-3.5 text-base-content/40"
                      size={18}
                    />
                  </div>
                </div>

                {/* Bio Textarea */}
                <div className="form-control mb-8">
                  <label className="label">
                    <span className="label-text font-medium">Bio</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="textarea textarea-bordered w-full pl-10"
                    />
                    <FileText
                      className="absolute left-3 top-3.5 text-base-content/40"
                      size={18}
                    />
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      {bio.length}/500 characters
                    </span>
                  </label>
                </div>

                {/* Save Button */}
                <button
                  onClick={onSave}
                  disabled={isLoading || !!validationError}
                  className={`btn btn-primary btn-lg w-full ${
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
