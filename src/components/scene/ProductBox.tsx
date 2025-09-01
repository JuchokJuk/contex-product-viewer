
import { useMemo, useEffect } from 'react';
import { RoundedBox } from '@react-three/drei';
import { Matrix3, RepeatWrapping, Texture } from 'three';

import type { Product, ProductsData } from '../../types';

interface ProductBoxProps {
    product: Product;
    textureCache: Map<string, Texture>;
    productsData: ProductsData;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product, textureCache, productsData }) => {
    // Get the main texture (map) and normal map from the product
    const mainTexture = useMemo(() => textureCache.get(product.textures.map), [product.textures.map, textureCache]);
    const normalTexture = useMemo(() => textureCache.get(product.textures.normal), [product.textures.normal, textureCache]);
    
    // Get the clearcoat normal map from common assets
    const clearcoatNormalMap = useMemo(() => textureCache.get(productsData.common.clearcoatNormal), [productsData.common.clearcoatNormal, textureCache]);

    useEffect(() => {
        const uvTransform = new Matrix3().set(
            1, 0, 0,
            0, 0.5, 0,
            0, 0, 1
        );

        // Apply UV transform to main texture
        if (mainTexture) {
            mainTexture.matrixAutoUpdate = false;
            mainTexture.matrix.copy(uvTransform);
            mainTexture.needsUpdate = true;
        }
        
        // Apply UV transform to normal texture
        if (normalTexture) {
            normalTexture.matrixAutoUpdate = false;
            normalTexture.matrix.copy(uvTransform);
            normalTexture.needsUpdate = true;
        }
    }, [mainTexture, normalTexture]);

    useEffect(() => {
        if (clearcoatNormalMap) {
            clearcoatNormalMap.wrapS = clearcoatNormalMap.wrapT = RepeatWrapping;
            clearcoatNormalMap.repeat.set(1, 1);
            clearcoatNormalMap.needsUpdate = true;
        }
    }, [clearcoatNormalMap]);

    return (
        <RoundedBox args={[1.125, 2, 0.75]} radius={0.02} smoothness={8}>
            <meshPhysicalMaterial
                map={mainTexture}
                normalMap={normalTexture}
                roughness={1.0}
                metalness={0.0}
                clearcoat={1.0}
                clearcoatRoughness={0.2}
                clearcoatNormalMap={clearcoatNormalMap}
                clearcoatNormalScale={[0.125, 0.125]}
            />
        </RoundedBox>
    );
};

export default ProductBox;
