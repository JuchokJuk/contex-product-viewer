import { Canvas } from "@react-three/fiber";
import { SceneContent } from "./scene/SceneContent";
import type { Product } from "../assets/products";

export function Scene({ product }: { product: Product }) {
  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing touch-none select-none">
      <Canvas camera={{ position: [0, 0, 0.4], fov: 30 }}>
        <SceneContent product={product} />
      </Canvas>
    </div>
  );
}
