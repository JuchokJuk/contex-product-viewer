
import { Suspense } from 'react';
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
    return (
        <div className="relative w-full h-full cursor-grab active:cursor-grabbing touch-none select-none">
            <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 0.4], fov: 30 }}>
                    <SceneContent 
                        product={product}
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
