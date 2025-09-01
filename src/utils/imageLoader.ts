/**
 * Image loading utilities that handle the first phase of texture loading.
 * This module loads images with progress tracking before Three.js texture creation.
 */

export interface ImageLoadProgress {
  loaded: number;
  total: number;
  percentage: number;
  currentUrl?: string;
}

/**
 * Loads a single image and returns a promise with the loaded image.
 * @param url - The URL of the image to load
 * @returns Promise that resolves to HTMLImageElement
 */
export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Enable CORS for external images
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    
    img.src = url;
  });
};

/**
 * Loads multiple images with progress tracking.
 * @param urls - Array of image URLs to load
 * @param onProgress - Callback function that receives loading progress
 * @returns Promise that resolves to a Map of URL to HTMLImageElement
 */
export const loadImages = async (
  urls: string[],
  onProgress?: (progress: ImageLoadProgress) => void
): Promise<Map<string, HTMLImageElement>> => {
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
  const imageCache = new Map<string, HTMLImageElement>();
  let loadedCount = 0;
  const totalCount = uniqueUrls.length;

  // Report initial progress
  onProgress?.({
    loaded: 0,
    total: totalCount,
    percentage: 0
  });

  if (totalCount === 0) {
    onProgress?.({
      loaded: 0,
      total: 0,
      percentage: 100
    });
    return imageCache;
  }

  // Load all images in parallel
  const loadPromises = uniqueUrls.map(async (url) => {
    try {
      const image = await loadImage(url);
      imageCache.set(url, image);
      loadedCount++;
      
      // Report progress after each image loads
      onProgress?.({
        loaded: loadedCount,
        total: totalCount,
        percentage: (loadedCount / totalCount) * 100,
        currentUrl: url
      });
      
      return { url, image, success: true };
    } catch (error) {
      console.error(`Failed to load image: ${url}`, error);
      loadedCount++;
      
      // Still report progress even on error
      onProgress?.({
        loaded: loadedCount,
        total: totalCount,
        percentage: (loadedCount / totalCount) * 100,
        currentUrl: url
      });
      
      return { url, image: null, success: false };
    }
  });

  await Promise.all(loadPromises);

  return imageCache;
};
