/**
 * Utility functions for handling images in the application
 */

/**
 * Transforms a Google Drive URL to a format more likely to load successfully
 * by trying different approaches for Google Drive images
 */
export const getOptimizedGoogleDriveUrl = (url: string): string => {
  if (!url || !url.includes("drive.google.com")) {
    return url;
  }

  // Extract the file ID from various Google Drive URL formats
  let fileId: string | null = null;

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const filePathMatch = url.match(/\/file\/d\/([^/]+)/);
  if (filePathMatch && filePathMatch[1]) {
    fileId = filePathMatch[1];
  }

  // Format: https://drive.google.com/uc?export=view&id=FILE_ID
  const exportViewMatch = url.match(/[?&]id=([^&]+)/);
  if (!fileId && exportViewMatch && exportViewMatch[1]) {
    fileId = exportViewMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  const openIdMatch = url.match(/open\?id=([^&]+)/);
  if (!fileId && openIdMatch && openIdMatch[1]) {
    fileId = openIdMatch[1];
  }

  if (!fileId) {
    console.warn("Could not extract file ID from Google Drive URL:", url);
    return url;
  }

  // Return using lh3.googleusercontent.com format which often works better with CORS
  return `https://lh3.googleusercontent.com/d/${fileId}`;
};

/**
 * Gets a thumbnail URL for Google Drive image which is more reliable for display
 */
export const getThumbnailUrl = (
  fileId: string,
  size: number = 1000,
): string => {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
};

/**
 * Creates a blob URL for an image to bypass CORS restrictions
 * This function fetches the image and creates a local blob URL
 */
export const createLocalBlobUrl = async (
  url: string,
): Promise<string | null> => {
  try {
    // Use a CORS proxy if needed
    // const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;

    const response = await fetch(url, {
      method: "GET",
      mode: "cors", // Try with no-cors if this fails
      cache: "no-cache",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch image: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error creating blob URL:", error);
    return null;
  }
};

/**
 * Get a placeholder image URL with specified dimensions and text
 */
export const getPlaceholderImage = (
  width: number = 800,
  height: number = 600,
  text: string = "Image not available",
): string => {
  // Using a placeholder service or a local placeholder
  return `/placeholder.svg`;

  // Alternative with dynamic text (if the placeholder service supports it)
  // return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
};

/**
 * Determine if an image URL is likely a Google Drive URL
 */
export const isGoogleDriveUrl = (url: string): boolean => {
  return (
    url?.includes("drive.google.com") ||
    url?.includes("lh3.googleusercontent.com")
  );
};

/**
 * Extract file ID from various Google Drive URL formats
 */
export const extractGoogleDriveFileId = (url: string): string | null => {
  if (!url) return null;

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const filePathMatch = url.match(/\/file\/d\/([^/]+)/);
  if (filePathMatch && filePathMatch[1]) {
    return filePathMatch[1];
  }

  // Format: https://drive.google.com/uc?export=view&id=FILE_ID
  const exportViewMatch = url.match(/[?&]id=([^&]+)/);
  if (exportViewMatch && exportViewMatch[1]) {
    return exportViewMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  const openIdMatch = url.match(/open\?id=([^&]+)/);
  if (openIdMatch && openIdMatch[1]) {
    return openIdMatch[1];
  }

  return null;
};
