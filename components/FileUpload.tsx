import React, { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
import Image from "next/image";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  label?: string;
  currentFile?: File | null;
  className?: string;
  maxSize?: number; // in MB
  showPreview?: boolean;
}

const FileUpload = ({
  onFileSelect,
  accept = "image/*",
  label = "Choose file",
  currentFile,
  className = "",
  maxSize = 5,
  showPreview = false,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    setError(null);

    if (!file) {
      onFileSelect(null);
      setPreviewUrl(null);
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    if (accept && !file.type.match(accept.replace(/\*/g, ".*"))) {
      setError(`File type not supported. Please select ${accept}`);
      return;
    }

    onFileSelect(file);

    // Create preview for images
    if (showPreview && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const inputId = `file-upload-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`mb-4 ${className}`}>
      <Label.Root
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </Label.Root>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {!currentFile ? (
          <div className="space-y-2">
            <div className="text-gray-500">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span>{" "}
              or drag and drop
            </div>
            <div className="text-xs text-gray-500">
              {accept} up to {maxSize}MB
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">✓ {currentFile.name}</div>
            <div className="text-xs text-gray-500">
              {formatFileSize(currentFile.size)}
            </div>
            {showPreview && previewUrl && (
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
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
              onClick={(e) => {
                e.stopPropagation();
                handleFileChange(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="mt-2 text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default FileUpload;
