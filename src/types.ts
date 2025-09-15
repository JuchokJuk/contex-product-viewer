export interface CommonAssets {
  environment: string; // HDR file URL
}

export interface AssetCache {
  models: Map<string, ArrayBuffer>; // GLB models as ArrayBuffer
  hdrEnvironment: ArrayBuffer; // Preloaded HDR data
}

export interface Product {
  id: string;
  name: string;
  description: string;
  model: string;
  specs?: string[];
}

export interface ProductsData {
  common: CommonAssets;
  entries: Product[];
}
