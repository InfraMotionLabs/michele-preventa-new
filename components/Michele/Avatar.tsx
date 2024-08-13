import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    EyeLeft: THREE.SkinnedMesh;
    EyeRight: THREE.SkinnedMesh;
    Wolf3D_Body: THREE.SkinnedMesh;
    Wolf3D_Hair: THREE.SkinnedMesh;
    Wolf3D_Head: THREE.SkinnedMesh;
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
    Wolf3D_Outfit_Top: THREE.SkinnedMesh;
    Wolf3D_Teeth: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    Wolf3D_Eye: THREE.MeshStandardMaterial;
    Wolf3D_Body: THREE.MeshStandardMaterial;
    HAIR: THREE.MeshStandardMaterial;
    Wolf3D_Skin: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
    Wolf3D_Teeth: THREE.MeshStandardMaterial;
  };
};

const ANIMATION_FADE_TIME = 0.7;

class MorphTargetManager {
  private skinnedMeshes: THREE.SkinnedMesh[] = [];
  private morphTargetIndices: Map<THREE.SkinnedMesh, Map<string, number>> =
    new Map();

  constructor(group: THREE.Group) {
    group.traverse((child) => {
      if ((child as THREE.SkinnedMesh).isSkinnedMesh) {
        const skinnedMesh = child as THREE.SkinnedMesh;
        this.skinnedMeshes.push(skinnedMesh);
        const indicesMap = new Map<string, number>();
        if (skinnedMesh.morphTargetDictionary) {
          for (const key of Object.keys(skinnedMesh.morphTargetDictionary)) {
            indicesMap.set(key, skinnedMesh.morphTargetDictionary[key]);
          }
        }
        this.morphTargetIndices.set(skinnedMesh, indicesMap);
      }
    });
  }

  lerpMorphTarget(target: string, value: number, speed = 0.1) {
    for (const skinnedMesh of this.skinnedMeshes) {
      const indicesMap = this.morphTargetIndices.get(skinnedMesh);
      if (indicesMap && indicesMap.has(target)) {
        const index = indicesMap.get(target);
        if (index !== undefined && skinnedMesh.morphTargetInfluences) {
          skinnedMesh.morphTargetInfluences[index] = THREE.MathUtils.lerp(
            skinnedMesh.morphTargetInfluences[index],
            value,
            speed
          );
        }
      }
    }
  }
}

const introAnimations = [{ name: 'greeting', occurrence: 10 }];
const idleAnimations = [
  { name: 'idle_1', occurrence: 10 },
  // { name: 'idle_2', occurrence: 3 },
  // { name: 'idle_3', occurrence: 2 },
];
const thinkingAnimations = [
  { name: 'thinking', occurrence: 7 },
  // { name: 'happy', occurrence: 3 },
  // { name: 'idle_3', occurrence: 10 },
];
const talkingAnimations = [
  { name: 'idle_1', occurrence: 10 },
  // { name: 'talk_short_1', occurrence: 5 },
  // { name: 'talk_long_2', occurrence: 8 },
  // { name: 'talk_short_2', occurrence: 4 },
];

const getRandomAnimation = (seq: { name: string; occurrence: number }[]) => {
  const totalOccurrence = seq.reduce((sum, anim) => sum + anim.occurrence, 0);
  let randomValue = Math.random() * totalOccurrence;
  for (const anim of seq) {
    if (randomValue < anim.occurrence) {
      return anim.name;
    }
    randomValue -= anim.occurrence;
  }
  return seq[0].name; //
};

export function Avatar(
  props: JSX.IntrinsicElements['group'] & {
    visemes: number[][];
    audioUrl: string;
    isGenerating: boolean;
    setIsGenerating: (value: boolean) => void;
    isPlaying: boolean; // New prop to control audio and animation
    setIsPlaying: (value: boolean) => void; // New prop to update isPlaying state
  }
) {
  const {
    visemes,
    audioUrl,
    isGenerating,
    setIsGenerating,
    isPlaying,
    setIsPlaying,
  } = props;
  const group = useRef<THREE.Group>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [needReset, setNeedReset] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<
    THREE.AnimationAction | undefined
  >(undefined);
  const { nodes, materials, scene } = useGLTF(
    '/models/michele3.glb'
  ) as GLTFResult;
  const { animations } = useGLTF('/models/animations.glb');

  const morphTargetManagerRef = useRef<MorphTargetManager | null>(null);

  useEffect(() => {
    if (scene) {
      morphTargetManagerRef.current = new MorphTargetManager(scene);
    }
  }, [scene]);

  const { actions, mixer } = useAnimations(animations, group);

  const [animation, setAnimation] = useState(
    getRandomAnimation(introAnimations)
  );
  const [sequence, setSequence] = useState('intro');

  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const audioPlayer = new Audio();
    audioPlayerRef.current = audioPlayer;
  }, []);

  useEffect(() => {
    if (audioUrl && audioPlayerRef.current) {
      const audioPlayer = audioPlayerRef.current;
      audioPlayer.src = audioUrl;
      audioPlayer.load();
      audioPlayer.currentTime = 0;
      audioPlayer.play();
      audioPlayer.oncanplaythrough = () => {
        setIsGenerating(false);
      };
      audioPlayer.onplaying = () => {
        setIsPlaying(true);
      };
      audioPlayer.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [audioUrl, setIsGenerating, setIsPlaying]);

  useEffect(() => {
    let blinkTimeout: any;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 200);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  useEffect(() => {
    // console.log('setting new animation');
    if (isGenerating) {
      setSequence('thinking');
      setAnimation(getRandomAnimation(thinkingAnimations));
    } else if (isPlaying) {
      setSequence('talking');
      setAnimation(getRandomAnimation(talkingAnimations));
    } else {
      setSequence('idle');
      setAnimation(getRandomAnimation(idleAnimations));
    }
    setNeedReset(false);
  }, [isPlaying, isGenerating, needReset]);

  useFrame((state, delta) => {
    // Blinking
    morphTargetManagerRef.current?.lerpMorphTarget(
      'eyeBlinkRight',
      blink ? 1 : 0,
      1
    );
    morphTargetManagerRef.current?.lerpMorphTarget(
      'eyeBlinkLeft',
      blink ? 1 : 0,
      1
    );
    // Talking
    for (let i = 1; i <= 21; i++) {
      morphTargetManagerRef.current?.lerpMorphTarget(i.toString(), 0, 0.1);
    }

    if (isPlaying) {
      for (let i = visemes.length - 1; i >= 0; i--) {
        const viseme = visemes[i];
        if (
          audioPlayerRef.current &&
          audioPlayerRef.current.currentTime * 1000 >= viseme[0]
        ) {
          morphTargetManagerRef.current?.lerpMorphTarget(
            viseme[1].toString(),
            1.3,
            0.1
          );
          break;
        }
      }
    }
  });

  // useEffect(() => {
  //   if (currentAnimation) {
  //     console.log('currentAnimation', currentAnimation);
  //     const duration = currentAnimation.getClip().duration * 1000;
  //     console.log('duration', duration);
  //     const timeoutId = setTimeout(() => {
  //       console.log('Animation done');
  //       setNeedReset(true);
  //     }, duration);

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [currentAnimation]);

  useEffect(() => {
    const currentAnimationAction = actions[animation];
    if (currentAnimationAction) {
      currentAnimationAction
        .reset()
        .fadeIn(mixer.time > 0 ? ANIMATION_FADE_TIME : 0)
        .play();

      // setCurrentAnimation(currentAnimationAction);

      return () => {
        currentAnimationAction.fadeOut(ANIMATION_FADE_TIME);
      };
    }
  }, [animation, actions]);

  // New effect to handle stopping audio and animation
  useEffect(() => {
    if (!isPlaying && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  return (
    <group {...props} dispose={null} ref={group} rotation-x={-4.7}>
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.HAIR}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <primitive object={nodes.Hips} />
    </group>
  );
}

useGLTF.preload('/models/michele3.glb');
useGLTF.preload('/models/animations.glb');
