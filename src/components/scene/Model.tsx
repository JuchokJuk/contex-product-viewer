import { useGLTF } from "@react-three/drei";

export function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);

  return <primitive object={scene} />;
}
