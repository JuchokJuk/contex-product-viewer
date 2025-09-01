
import type { ProductsData, AssetCache } from '../types';
import { loadImages, type ImageLoadProgress } from './imageLoader';

/**
 * Preloads all images (textures and common assets) and HDR environment with progress tracking.
 * @param productsData - The products data structure containing products and common assets.
 * @param onProgress - A callback function that receives the loading progress percentage.
 * @returns A promise that resolves to an AssetCache with images and preloaded HDR environment.
 */
export const preloadAssets = async (
    productsData: ProductsData,
    onProgress: (progress: number) => void
): Promise<AssetCache> => {
    // Collect all unique image asset URLs
    const imageUrls = new Set<string>();
    
    // Add common image assets
    imageUrls.add(productsData.common.clearcoatNormal);
    
    // Add product textures
    productsData.entries.forEach(product => {
        Object.values(product.textures).forEach(url => imageUrls.add(url));
    });

    const urls = Array.from(imageUrls);
    const totalAssets = urls.length + 1; // +1 for HDR file

    // Load images with progress tracking
    const imageCache = await loadImages(urls, (imageProgress: ImageLoadProgress) => {
        const progressPercentage = (imageProgress.loaded / totalAssets) * 100;
        onProgress(progressPercentage);
    });

    // Load HDR environment file
    try {
        const hdrResponse = await fetch(productsData.common.environment);
        if (!hdrResponse.ok) {
            throw new Error(`Failed to load HDR: ${hdrResponse.statusText}`);
        }
        const hdrBuffer = await hdrResponse.arrayBuffer();
        onProgress(100);
        
        return {
            images: imageCache,
            hdrEnvironment: hdrBuffer
        };
    } catch (error) {
        console.error('Failed to load HDR environment:', error);
        // Return with empty HDR buffer if loading fails
        return {
            images: imageCache,
            hdrEnvironment: new ArrayBuffer(0)
        };
    }
};
