"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { uploadFile, generateUniqueFilename } from "@/lib/firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase-config";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  folder: string;
  onUploadComplete?: (url: string, filename: string) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
}

export function FileUpload({
  folder,
  onUploadComplete,
  acceptedFileTypes = "image/*",
  maxFileSizeMB = 5,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > maxFileSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File size must be less than ${maxFileSizeMB}MB`,
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Generate a unique filename
      const uniqueFilename = generateUniqueFilename(file.name);
      const fullPath = `${folder}/${uniqueFilename}`;

      // Create a reference with the unique path
      const storageRef = ref(storage, fullPath);

      // Start the upload with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percent);
        },
        (error) => {
          // Handle errors
          console.error("Upload error:", error);
          toast({
            title: "Upload failed",
            description: "An error occurred during upload",
            variant: "destructive",
          });
          setUploading(false);
        },
        async () => {
          // Upload completed successfully
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          toast({
            title: "Upload complete",
            description: "File uploaded successfully",
            variant: "default",
          });

          // Call the callback with the download URL
          if (onUploadComplete) {
            onUploadComplete(downloadURL, uniqueFilename);
          }

          setFile(null);
          setUploading(false);
        }
      );
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "An error occurred during upload",
        variant: "destructive",
      });
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          disabled={uploading}
          className="flex-1"
        />
        <Button onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {uploading && (
        <div className="w-full space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-center">{progress}% complete</p>
        </div>
      )}

      {file && !uploading && (
        <p className="text-sm">
          Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
        </p>
      )}
    </div>
  );
}
