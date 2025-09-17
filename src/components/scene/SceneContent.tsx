import { useRef, Suspense, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, useTransition, animated } from "@react-spring/three";
import { Environment } from "@react-three/drei";
import type { Group } from "three";
import type { Product, ProductsData, AssetCache } from "../../types";
import ProductBox from "./ProductBox";
import Controls from "./Controls";

interface SceneContentProps {
  product: Product;
  isInteracting: boolean;
  onControlStart: () => void;
  onControlEnd: () => void;
  onAnimationComplete: () => void;
  productsData: ProductsData;
  assetCache: AssetCache;
}

const SceneContent: React.FC<SceneContentProps> = ({ product, isInteracting, onControlStart, onControlEnd, onAnimationComplete, productsData, assetCache }) => {
  const groupRef = useRef<Group>(null!);

  // For HDR files, drei Environment component needs the original URL with .hdr extension
  // Blob URLs don't have file extensions, so we'll use the original URL
  // The HDR is still preloaded for other purposes, but Environment uses the original URL
  const hdrEnvironmentUrl = useMemo(() => {
    return productsData.common.environment;
  }, [productsData.common.environment]);

  const { rotationSpeed } = useSpring({
    rotationSpeed: isInteracting ? 0 : 1,
    config: { tension: 120, friction: 20 },
  });

  useFrame((_state, delta) => {
    if (groupRef.current) {
      const baseSpeed = (2 * Math.PI) / 24;
      const currentSpeed = rotationSpeed.get();
      groupRef.current.rotation.y += delta * baseSpeed * currentSpeed;
    }
  });

  const transitions = useTransition(product, {
    key: (item: Product) => item.id,
    from: {
      scale: [0, 0, 0] as [number, number, number],
      rotation: [0, -Math.PI, 0] as [number, number, number],
    },
    enter: {
      scale: [1, 1, 1] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
    },
    leave: {
      scale: [0, 0, 0] as [number, number, number],
      rotation: [0, Math.PI, 0] as [number, number, number],
    },
    config: { tension: 170, friction: 26 },
    exitBeforeEnter: true,
    onRest: () => {
      onAnimationComplete();
    },
  });

  return (
    <>
      <Suspense fallback={null}>
        {/* <Environment files={hdrEnvironmentUrl} environmentIntensity={1} /> */}
        <ambientLight intensity={2.5} />
        <pointLight position={[1, 1, 1]} intensity={10} />
        <group ref={groupRef} rotation-y={-0.5}>
          {transitions((style, item) => (
            <animated.group scale={style.scale} rotation={style.rotation as unknown as [number, number, number]}>
              <ProductBox product={item} assetCache={assetCache} />
            </animated.group>
          ))}
        </group>
      </Suspense>
      <Controls onStart={onControlStart} onEnd={onControlEnd} />
    </>
  );
};

export default SceneContent;
