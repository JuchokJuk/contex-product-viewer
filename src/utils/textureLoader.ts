
import type { ProductsData, AssetCache } from '../types';

/**
 * Preloads all GLB models and HDR environment with progress tracking.
 * @param productsData - The products data structure containing products and common assets.
 * @param onProgress - A callback function that receives the loading progress percentage.
 * @returns A promise that resolves to an AssetCache with models and preloaded HDR environment.
 */
export const preloadAssets = async (
    productsData: ProductsData,
    onProgress: (progress: number) => void
): Promise<AssetCache> => {
    // Collect all unique model URLs
    const modelUrls = new Set<string>();
    
    // Add product models
    productsData.entries.forEach(product => {
        modelUrls.add(product.model);
    });

    const urls = Array.from(modelUrls);
    const totalAssets = urls.length + 1; // +1 for HDR file

    // Load GLB models with progress tracking
    const modelCache = new Map<string, ArrayBuffer>();
    let loadedModels = 0;

    const loadModel = async (url: string): Promise<void> => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load model: ${response.statusText}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            
            // Parse GLB data (simplified - in real implementation you'd use GLTFLoader)
            // For now, we'll store the arrayBuffer and let useGLTF handle the parsing
            modelCache.set(url, arrayBuffer);
            
            loadedModels++;
            const progressPercentage = (loadedModels / totalAssets) * 100;
            onProgress(progressPercentage);
        } catch (error) {
            console.error(`Failed to load model: ${url}`, error);
            loadedModels++;
            const progressPercentage = (loadedModels / totalAssets) * 100;
            onProgress(progressPercentage);
        }
    };

    // Load all models in parallel
    await Promise.all(urls.map(loadModel));

    // Load HDR environment file
    try {
        const hdrResponse = await fetch(productsData.common.environment);
        if (!hdrResponse.ok) {
            throw new Error(`Failed to load HDR: ${hdrResponse.statusText}`);
        }
        const hdrBuffer = await hdrResponse.arrayBuffer();
        onProgress(100);
        
        return {
            models: modelCache,
            hdrEnvironment: hdrBuffer
        };
    } catch (error) {
        console.error('Failed to load HDR environment:', error);
        // Return with empty HDR buffer if loading fails
        return {
            models: modelCache,
            hdrEnvironment: new ArrayBuffer(0)
        };
    }
};
