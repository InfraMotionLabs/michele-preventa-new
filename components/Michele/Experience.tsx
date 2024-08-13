'use client';
import { useAvatar } from '@/hooks/useAvatar';
import {
  Backdrop,
  Environment,
  PerspectiveCamera,
  useVideoTexture,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { Avatar } from './Avatar';

export const Experience = ({
  visemes,
  audioUrl,
  isGenerating,
  setIsGenerating,
  isVideoVisible,
  isPlaying,
  setIsPlaying,
}: {
  visemes: number[][];
  audioUrl: string;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  isVideoVisible: boolean;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const avatarRef = useRef<THREE.Group>(null);
  const { cameraZoomed } = useAvatar((state) => ({
    cameraZoomed: state.cameraZoomed,
  }));

  useEffect(() => {
    console.log(isVideoVisible);
  }, [isVideoVisible]);

  const CameraLerp = () => {
    useFrame(() => {
      if (cameraRef.current) {
        const targetPosition = !isVideoVisible
          ? new THREE.Vector3(0, 1.6, 1)
          : new THREE.Vector3(-0.3, 1.8, 2.5);

        cameraRef.current.position.lerp(targetPosition, 0.03);

        const lookAtTarget = isVideoVisible
          ? new Vector3(0.4, 1.55, 0)
          : new Vector3(0.0, 1.55, 0);

        cameraRef.current.lookAt(lookAtTarget);
      }
    });
    return null;
  };

  return (
    <div className="h-screen w-screen">
      <Canvas shadows>
        {/* <color attach="background" args={['#ffffff']} /> */}
        <fog attach="fog" args={['#8E8E8E', 2, 6.5]} />
        <PerspectiveCamera
          fov={30}
          makeDefault
          position={[0, 1.2, 3]}
          ref={cameraRef as any}
        />
        {/* <OrbitControls /> */}
        <CameraLerp />
        <Backdrop
          receiveShadow
          scale={[10, 5, 5]}
          floor={1}
          position={[0, 3, -1]}
          rotation={[0, 0, Math.PI]}
          segments={20}
        >
          <meshStandardMaterial color="#ffffff" />
        </Backdrop>

        <Avatar
          rotation-x={-4.7}
          visemes={visemes}
          audioUrl={audioUrl}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />

        {/* <ContactShadows opacity={0.7} /> */}

        {/* <AccumulativeShadows
          receiveShadow
          temporal
          frames={100}
          opacity={0.8}
          alphaTest={0.9}
          scale={12}
          position={[0, 0.5, 0]}
        >
          <RandomizedLight
            radius={4}
            ambient={2}
            position={[5, 3, 5]}
            bias={0.001}
          />
        </AccumulativeShadows>{' '} */}
        <Cookie
          distance={10}
          intensity={10}
          angle={7}
          penumbra={1}
          position={[0, 0, 3]}
        />
        {/* <mesh rotation={[0, 0, 0]} position={[0, 0, -4]} scale={10}>
          <planeGeometry />
          <meshLambertMaterial color="#ffffff" />
        </mesh> */}
        {/* <Environment
          frames={degraded ? 1 : Infinity}
          resolution={256}
          background
          blur={1}
        >
          <Lightformers />
        </Environment> */}
        <Environment preset="warehouse" />
        {/* <PerformanceMonitor onDecline={() => degrade(true)} /> */}
        {/* <Postpro /> */}
      </Canvas>
    </div>
  );
};

// function Postpro() {
//   return (
//     <EffectComposer>
//       <BrightnessContrast brightness={0} contrast={0.2} />
//       <Bloom mipmapBlur luminanceThreshold={0} intensity={0.2} />
//       <ToneMapping />
//     </EffectComposer>
//   );
// }

function Cookie(props: any) {
  const texture = useVideoTexture('/caustics.mp4');
  return <spotLight decay={0} map={texture} castShadow {...props} />;
}
