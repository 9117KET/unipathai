import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase-config";

/**
 * Upload a file to Firebase Storage
 * @param file - File to upload
 * @param path - Storage path including filename
 * @returns Download URL of the uploaded file
 */
export async function uploadFile(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/**
 * Get a download URL for a file
 * @param path - Path to the file in storage
 * @returns Download URL
 */
export async function getFileURL(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error getting download URL:", error);
    throw error;
  }
}

/**
 * Delete a file from Firebase Storage
 * @param path - Path to the file in storage
 */
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

/**
 * Generate a unique filename with timestamp
 * @param originalFilename - Original filename
 * @returns Unique filename with timestamp
 */
export function generateUniqueFilename(originalFilename: string): string {
  const timestamp = new Date().getTime();
  const extension = originalFilename.split(".").pop();
  const baseName = originalFilename.split(".").slice(0, -1).join(".");
  return `${baseName}-${timestamp}.${extension}`;
}
