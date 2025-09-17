import { useState } from "react";
import { Scene } from "./ThreeDScene";
import { ProductInfo } from "./ProductInfo";
import { Navigation } from "./Navigation";

import { products } from "../assets/products";
import { useGLTF, useProgress } from "@react-three/drei";
import { useEnvironment } from "@react-three/drei";
import hdrEnvironmentUrl from "../assets/studio_small_03_1k.hdr?url";

// Preload into R3F's cache

products.forEach((product) => {
  useGLTF.preload(product.model);
});
useEnvironment.preload({ files: hdrEnvironmentUrl });

export function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = products[currentIndex];

  const handlePrevious = () => setCurrentIndex((currentIndex + 1 + products.length) % products.length);
  const handleNext = () => setCurrentIndex((currentIndex - 1 + products.length) % products.length);

  const { progress } = useProgress();

  return (
    <>
      <div className="w-full h-full opacity-0 transition-opacity duration-400 delay-400" style={{ opacity: progress === 100 ? 1 : 0 }}>
        <div className="min-h-screen text-gray-900 flex flex-col items-center justify-center p-12">
          <h1 className="text-6xl font-bold text-[#3A2F2F] leading-tight w-[1060px]">Наши бестселлеры</h1>
          <main className="container mx-auto h-[600px] grid grid-cols-[3fr_2fr] w-[1060px] pl-[260px] place-items-center">
            <div className="w-[480px] h-[600px] relative">
              <div className="absolute aspect-square w-[500px] bg-[#303F9F] rounded-xl right-[240px] top-[50px]" />
              <Scene product={currentProduct} />
            </div>
            <div className="flex flex-col justify-between h-[500px] w-[460px] text-left">
              <ProductInfo product={currentProduct} />
              <Navigation onPrevious={handlePrevious} onNext={handleNext} />
            </div>
          </main>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center fixed inset-0 transition-opacity duration-400" style={{ opacity: progress === 100 ? 0 : 1, pointerEvents: progress === 100 ? "none" : "auto" }}>
        Loading... {progress.toFixed()}%
      </div>
    </>
  );
}
