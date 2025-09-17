import { useRef, Suspense, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, useTransition, animated } from "@react-spring/three";
import { Environment } from "@react-three/drei";
import type { Group } from "three";
import type { Product, ProductsData, AssetCache } from "../../types";
import ProductBox from "./ProductBox";
import { usePointerRotation } from "./usePointerRotation";

interface SceneContentProps {
  product: Product;
  onAnimationComplete: () => void;
  productsData: ProductsData;
  assetCache: AssetCache;
}

const SceneContent: React.FC<SceneContentProps> = ({ product, onAnimationComplete, productsData, assetCache }) => {
  const groupRef = useRef<Group>(null!);
  const xGroupRef = useRef<Group>(null!);
  const yGroupRef = useRef<Group>(null!);
  const baseRotationGroupRef = useRef<Group>(null!);

  // For HDR files, drei Environment component needs the original URL with .hdr extension
  // Blob URLs don't have file extensions, so we'll use the original URL
  // The HDR is still preloaded for other purposes, but Environment uses the original URL
  const hdrEnvironmentUrl = useMemo(() => {
    return productsData.common.environment;
  }, [productsData.common.environment]);

  // Base rotation ref (autorotation)
  const baseRotationY = useRef(0);

  // Spring for base rotation "activeness" - smoothly transitions between 0 and 1
  const [{ rotationSpeed }, rotationSpeedApi] = useSpring(() => ({
    rotationSpeed: 1,
    config: { tension: 120, friction: 20 },
  }));

  const onControlStart = useCallback(() => {
    rotationSpeedApi.start({ rotationSpeed: 0 });
  }, [rotationSpeedApi]);
  const onControlEnd = useCallback(() => {
    rotationSpeedApi.start({ rotationSpeed: 1 });
  }, [rotationSpeedApi]);

  const { rotationX, rotationY } = usePointerRotation({
    initialX: 0,
    initialY: 0,
    minX: -Math.PI / 4,
    maxX: Math.PI / 4,
    speedX: 0.005,
    speedY: 0.005,
    onControlStart,
    onControlEnd,
  });

  // Pointer-driven rotation spring
  const [{ pointerRotX, pointerRotY }, pointerRotApi] = useSpring(() => ({
    pointerRotX: rotationX.current,
    pointerRotY: rotationY.current,
    config: { tension: 170, friction: 26 },
  }));

  // Drive base rotation with smooth pausing
  useFrame((_state, delta) => {
    const baseSpeed = (2 * Math.PI) / 24;
    const autoSpeed = rotationSpeed.get();
    baseRotationY.current += delta * baseSpeed * autoSpeed;
    
    // Apply rotation directly to the group
    if (baseRotationGroupRef.current) {
      baseRotationGroupRef.current.rotation.y = baseRotationY.current;
    }
  });

  // Drive pointer rotation spring
  useFrame(() => {
    pointerRotApi.start({ pointerRotX: rotationX.current, pointerRotY: rotationY.current });
  });

  const transitions = useTransition(product, {
    key: (item: Product) => item.id,
    from: {
      scale: 0 ,
      rotation: -Math.PI,
    },
    enter: {
      scale: 1,
      rotation:  0,
    },
    leave: {
      scale: 0,
      rotation: Math.PI,
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
        <Environment files={hdrEnvironmentUrl} environmentIntensity={1} environmentRotation={[-Math.PI / 3, 0, 0]} />
        <animated.group ref={xGroupRef} rotation-x={pointerRotX}>
          <animated.group ref={yGroupRef} rotation-y={pointerRotY}>
            <group ref={baseRotationGroupRef}>
              <group ref={groupRef}>
                {transitions((style, item) => (
                  <animated.group scale={style.scale} rotation-y={style.rotation}>
                    <ProductBox product={item} assetCache={assetCache} />
                  </animated.group>
                ))}
              </group>
            </group>
          </animated.group>
        </animated.group>
      </Suspense>
    </>
  );
};

export default SceneContent;
