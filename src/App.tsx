import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { preloadAssets } from "./utils/textureLoader";
import { PRODUCTS } from "./constants";
import Loader from "./components/Loader";
import MainContent from "./components/MainContent";
import type { AssetCache } from "./types";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [assetCache, setAssetCache] = useState<AssetCache>({
    images: new Map(),
    hdrEnvironment: new ArrayBuffer(0)
  });

  useEffect(() => {
    const loadApp = async () => {
      const cache = await preloadAssets(PRODUCTS, setProgress);
      setAssetCache(cache);
      // A small delay to ensure the progress bar hits 100% visually
      setTimeout(() => setIsLoading(false), 200);
    };
    loadApp();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="loader" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
          <Loader progress={progress} />
        </motion.div>
      ) : (
        <MainContent key="main-content" productsData={PRODUCTS} assetCache={assetCache} />
      )}
    </AnimatePresence>
  );
};

export default App;
