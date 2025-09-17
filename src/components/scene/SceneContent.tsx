import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, useTransition, animated } from "@react-spring/three";
import { Environment } from "@react-three/drei";
import type { Group } from "three";
import { Model } from "./Model";
import { usePointerRotation } from "./usePointerRotation";

import hdrEnvironmentUrl from "../../assets/studio_small_03_1k.hdr?url";
import type { Product } from "../../assets/products";

export function SceneContent({ product }: { product: Product }) {
  const xGroupRef = useRef<Group>(null);
  const yGroupRef = useRef<Group>(null);
  const baseRotationGroupRef = useRef<Group>(null);

  const baseRotationY = useRef(0);

  // Custom spring state for pointer rotation (no react-spring to avoid re-init during transitions)
  const springRotX = useRef(0);
  const springRotY = useRef(0);
  const springVelX = useRef(0);
  const springVelY = useRef(0);
  const springStiffness = 120; // higher = snappier
  const springDamping = 24; // higher = more damping

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

  useFrame((_state, delta) => {
    const baseSpeed = (2 * Math.PI) / 24;
    const autoSpeed = rotationSpeed.get();
    baseRotationY.current += delta * baseSpeed * autoSpeed;

    if (baseRotationGroupRef.current) {
      baseRotationGroupRef.current.rotation.y = baseRotationY.current;
    }
    // Spring integrate pointer rotations toward targets
    // x axis
    {
      const target = rotationX.current;
      const displacement = target - springRotX.current;
      const acceleration = springStiffness * displacement - springDamping * springVelX.current;
      springVelX.current += acceleration * delta;
      springRotX.current += springVelX.current * delta;
      if (xGroupRef.current) xGroupRef.current.rotation.x = springRotX.current;
    }
    // y axis
    {
      const target = rotationY.current;
      const displacement = target - springRotY.current;
      const acceleration = springStiffness * displacement - springDamping * springVelY.current;
      springVelY.current += acceleration * delta;
      springRotY.current += springVelY.current * delta;
      if (yGroupRef.current) yGroupRef.current.rotation.y = springRotY.current;
    }
  });

  const transitions = useTransition(product, {
    key: (item: Product) => item.id,
    from: {
      scale: 0,
      rotation: -Math.PI/2,
    },
    enter: {
      scale: 1,
      delay: 500,
      rotation: 0,
    },
    leave: {
      scale: 0,
      rotation: Math.PI/2,
    },
    config: { tension: 170, friction: 26 },
  });

  return (
    <>
      <Environment files={hdrEnvironmentUrl} environmentIntensity={1} environmentRotation={[-Math.PI / 3, 0, 0]} />
      <group ref={xGroupRef}>
        <group ref={yGroupRef}>
          <group ref={baseRotationGroupRef}>
            {transitions((style, item) => (
              <animated.group scale={style.scale} rotation-y={style.rotation}>
                <Model src={item.model} />
              </animated.group>
            ))}
          </group>
        </group>
      </group>
    </>
  );
}
