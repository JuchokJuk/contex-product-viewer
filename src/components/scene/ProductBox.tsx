
import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import type { Product, AssetCache } from '../../types';

interface ProductBoxProps {
    product: Product;
    assetCache: AssetCache;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
    // Load the GLB model using useGLTF
    const { scene } = useGLTF(product.model);

    // Clone the scene to avoid issues with multiple instances
    const clonedScene = useMemo(() => {
        if (scene) {
            return scene.clone();
        }
        return null;
    }, [scene]);

    if (!clonedScene) {
        return null;
    }

    return <primitive object={clonedScene} />;
};

export default ProductBox;
