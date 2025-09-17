import { useRef, useCallback, useEffect } from "react";
import { useThree } from "@react-three/fiber";

export const usePointerRotation = ({
  initialX = 0,
  initialY = 0,
  minX = -Math.PI / 4,
  maxX = Math.PI / 4,
  speedX = 0.005,
  speedY = 0.005,
  onControlStart,
  onControlEnd,
}: {
  initialX?: number; // radians
  initialY?: number; // radians
  minX?: number; // radians
  maxX?: number; // radians
  speedX?: number; // radians per px drag
  speedY?: number; // radians per px drag
  onControlStart?: () => void;
  onControlEnd?: () => void;
} = {}) => {
  const { gl } = useThree();

  const pointerStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationX = useRef<number>(initialX);
  const rotationY = useRef<number>(initialY);
  const isPointerDown = useRef<boolean>(false);

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      isPointerDown.current = true;
      pointerStart.current = { x: e.clientX, y: e.clientY };
      const el = gl.domElement as HTMLCanvasElement & { setPointerCapture?: (id: number) => void };
      el?.setPointerCapture?.(e.pointerId);
      onControlStart?.();
    },
    [gl.domElement, onControlStart]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isPointerDown.current) return;
      const dx = e.clientX - pointerStart.current.x;
      const dy = e.clientY - pointerStart.current.y;

      rotationX.current = clamp(rotationX.current + dy * speedX, minX, maxX);
      rotationY.current = rotationY.current + dx * speedY;

      pointerStart.current = { x: e.clientX, y: e.clientY };
    },
    [maxX, minX, speedX, speedY]
  );

  const onPointerUp = useCallback(
    (e: PointerEvent) => {
      isPointerDown.current = false;
      const el = gl.domElement as HTMLCanvasElement & { releasePointerCapture?: (id: number) => void };
      el?.releasePointerCapture?.(e.pointerId);
      onControlEnd?.();
    },
    [gl.domElement, onControlEnd]
  );

  useEffect(() => {
    const el = gl.domElement as HTMLCanvasElement;
    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onPointerDown as EventListener);
      window.removeEventListener("pointermove", onPointerMove as EventListener);
      window.removeEventListener("pointerup", onPointerUp as EventListener);
    };
  }, [gl.domElement, onPointerDown, onPointerMove, onPointerUp]);

  return { rotationX, rotationY };
};
