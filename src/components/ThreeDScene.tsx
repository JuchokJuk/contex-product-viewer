
import { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import type { Product, ProductsData, AssetCache } from '../types';
import SceneContent from './scene/SceneContent';

interface ThreeDSceneProps {
    product: Product;
    onAnimationComplete: () => void;
    productsData: ProductsData;
    assetCache: AssetCache;
}

const ThreeDScene: React.FC<ThreeDSceneProps> = ({ product, onAnimationComplete, productsData, assetCache }) => {
    const [isInteracting, setIsInteracting] = useState(false);

    const handleControlStart = useCallback(() => setIsInteracting(true), []);
    const handleControlEnd = useCallback(() => setIsInteracting(false), []);

    return (
        <div className="relative w-full h-full cursor-grab active:cursor-grabbing">
            <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 0.4], fov: 30 }}>
                    <SceneContent 
                        product={product}
                        isInteracting={isInteracting}
                        onControlStart={handleControlStart}
                        onControlEnd={handleControlEnd}
                        onAnimationComplete={onAnimationComplete}
                        productsData={productsData}
                        assetCache={assetCache}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
};

export default ThreeDScene;
