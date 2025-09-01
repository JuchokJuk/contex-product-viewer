export interface ProductTextures {
  normal: string;
  map: string;
}

export interface CommonAssets {
  clearcoatNormal: string;
  environment: string; // HDR file URL
}

export interface AssetCache {
  images: Map<string, HTMLImageElement>;
  hdrEnvironment: ArrayBuffer; // Preloaded HDR data
}

export interface Product {
  id: string;
  name: string;
  description: string;
  textures: ProductTextures;
  color: string;
  specs?: string[];
}

export interface ProductsData {
  common: CommonAssets;
  entries: Product[];
}
