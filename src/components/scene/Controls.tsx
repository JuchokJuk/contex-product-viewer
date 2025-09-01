import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE });

interface ControlsProps {
    onStart: () => void;
    onEnd: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onStart, onEnd }) => {
    const camera = useThree((state) => state.camera);
    const gl = useThree((state) => state.gl);
    const controlsRef = useRef<CameraControls | null>(null);

    useEffect(() => {
        const controls = new CameraControls(camera, gl.domElement);

        controls.minPolarAngle = Math.PI / 4;
        controls.maxPolarAngle = (3 * Math.PI) / 4;

        controls.mouseButtons.right = CameraControls.ACTION.NONE;
        controls.mouseButtons.wheel = CameraControls.ACTION.NONE;
        controls.mouseButtons.middle = CameraControls.ACTION.NONE;
        controls.touches.two = CameraControls.ACTION.NONE;
        controls.touches.three = CameraControls.ACTION.NONE;

        controls.addEventListener('controlstart', onStart);
        controls.addEventListener('controlend', onEnd);
        
        controlsRef.current = controls;

        return () => {
            controls.removeEventListener('controlstart', onStart);
            controls.removeEventListener('controlend', onEnd);
            controls.dispose();
        };
    }, [camera, gl.domElement, onStart, onEnd]);

    useFrame((_state, delta) => {
        controlsRef.current?.update(delta);
    });

    return null;
};

export default Controls;
