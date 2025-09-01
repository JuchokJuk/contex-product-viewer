
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ProductsData, AssetCache } from '../types';
import ThreeDScene from './ThreeDScene';
import Header from './Header';
import ProductInfo from './ProductInfo';
import Navigation from './Navigation';

interface MainContentProps {
    productsData: ProductsData;
    assetCache: AssetCache;
}

const MainContent: React.FC<MainContentProps> = ({ productsData, assetCache }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating3D, setIsAnimating3D] = useState(false);

    const changeSlide = (direction: 'next' | 'prev') => {
        if (isAnimating3D) return;
        setIsAnimating3D(true);
        if (direction === 'next') {
            setCurrentIndex((prevIndex) => (prevIndex === productsData.entries.length - 1 ? 0 : prevIndex + 1));
        } else {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? productsData.entries.length - 1 : prevIndex - 1));
        }
    };

    const handlePrevious = () => changeSlide('prev');
    const handleNext = () => changeSlide('next');
    
    const handleAnimationComplete = () => setIsAnimating3D(false);

    const currentProduct = useMemo(() => productsData.entries[currentIndex], [currentIndex, productsData.entries]);

    return (
        <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <div className="min-h-screen text-gray-900 flex flex-col items-center justify-center p-12">
                <Header />
                <main className="container mx-auto h-[600px] grid grid-cols-[3fr_2fr] w-[1060px] pl-[260px] place-items-center">
                    {/* 3D Viewer */}
                    <div className="w-[480px] h-[600px] relative">
                        <div className="absolute aspect-square w-[500px] bg-[#303F9F] rounded-xl right-[240px] top-[50px]"/>
                        <ThreeDScene 
                            product={currentProduct} 
                            onAnimationComplete={handleAnimationComplete}
                            productsData={productsData}
                            assetCache={assetCache}
                        />
                    </div>

                    {/* Product Info and Controls */}
                    <div className="flex flex-col justify-between h-[500px] w-[460px] text-left">
                        <ProductInfo product={currentProduct} />
                        <Navigation 
                            onPrevious={handlePrevious} 
                            onNext={handleNext} 
                            isAnimating={isAnimating3D} 
                        />
                    </div>
                </main>
            </div>
        </motion.div>
    );
};

export default MainContent;
