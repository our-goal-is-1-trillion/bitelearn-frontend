/**
 * RoadmapDecoration — 로드맵 좌우 장식 캐릭터 컴포넌트
 *
 * 각 decoration은 그림자(multiply blend) + 캐릭터(normal) 두 레이어로 구성됩니다.
 * animation 프리셋을 지정하면 단일 useMotionValue로 캐릭터와 그림자를 동기화합니다.
 *
 * 새 애니메이션 추가: ANIM_PRESETS에 항목을 추가하고 캐릭터 config에서 animation 키로 지정.
 */

import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

import bulldogCharImage from '@/assets/roadmap/bulldog-char.png';
import houseCharImage from '@/assets/roadmap/house-char.png';
import houseShadowImage from '@/assets/roadmap/house-shadow.png';
import mungmungCharImage from '@/assets/roadmap/mungmung-char.png';
import mungmungShadowImage from '@/assets/roadmap/mungmung-shadow.png';
import treeCharImage from '@/assets/roadmap/tree-char.png';
import treeShadowImage from '@/assets/roadmap/tree-shadow.png';

// ─── 타입 ────────────────────────────────────────────────────────────────────

type ShadowConfig = {
  src: string;
  size: number;
  offsetX: number;
  offsetY: number;
};

type CharConfig = {
  src: string;
  size: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
  flip?: boolean;
  /** 애니메이션 프리셋 키 — 미지정 시 정적 렌더 */
  animation?: keyof typeof ANIM_PRESETS;
};

type DecorationConfig = {
  containerSize: number;
  shadow: ShadowConfig;
  char: CharConfig;
};

/** 애니메이션 프리셋 형태 */
type AnimPreset = {
  /** 기준 motion value의 키프레임 (deg) */
  keyframes: number[];
  /** 1사이클 길이 (s) */
  duration: number;
  /** 사이클 간 대기 시간 (s) */
  repeatDelay: number;
  /** 캐릭터 pivot Y 비율 — transformOrigin 및 발/뿌리 위치 계산에 사용 */
  charPivotFraction: number;
  /** 캐릭터 rotate 배율 (0이면 rotate 없음) */
  charRotateRatio: number;
  /** 캐릭터 skewX 배율 (0이면 skew 없음) */
  charSkewRatio: number;
  /** 그림자 pivot Y 비율 — 그림자 이미지 내 타원 중심 위치 */
  shadowPivotFraction: number;
  /** 그림자 skewX 배율 */
  shadowSkewRatio: number;
};

// ─── 애니메이션 프리셋 ────────────────────────────────────────────────────────

const ANIM_PRESETS = {
  /**
   * sway — 개 캐릭터용.
   * 발을 pivot으로 좌우로 느긋하게 흔들림.
   */
  sway: {
    keyframes: [0, 2.5, 0, -2.5, 0],
    duration: 4,
    repeatDelay: 0.8,
    charPivotFraction: 0.9,
    charRotateRatio: 1.0,
    charSkewRatio: 0,
    shadowPivotFraction: 0.5,
    shadowSkewRatio: 2.0,
  },

  /**
   * wind — 나무 캐릭터용.
   * rotate 없이 skewX만 사용하여 뿌리는 고정, 수관이 바람에 유연하게 휨.
   * 빈도 낮게 가끔 한 방향으로 휙 불었다가 천천히 제자리로.
   */
  wind: {
    keyframes: [0, 3, 3.5, 3, 0.5, 0],
    duration: 2.5,
    repeatDelay: 6,
    charPivotFraction: 0.95,
    charRotateRatio: 0,
    charSkewRatio: 1.2,
    shadowPivotFraction: 0.5,
    shadowSkewRatio: 1.5,
  },
} satisfies Record<string, AnimPreset>;

// ─── 캐릭터 설정 ─────────────────────────────────────────────────────────────

const DECORATION_CONFIGS: Record<string, DecorationConfig> = {
  house: {
    containerSize: 180,
    shadow: {
      src: houseShadowImage,
      size: 176,
      offsetX: 4,
      offsetY: 0,
    },
    char: {
      src: houseCharImage,
      size: 128,
      offsetX: 24,
      offsetY: 26,
      opacity: 1,
    },
  },
  mungmung: {
    containerSize: 180,
    shadow: {
      src: mungmungShadowImage,
      size: 200,
      offsetX: -15,
      offsetY: -9,
    },
    char: {
      src: mungmungCharImage,
      size: 168,
      offsetX: 12,
      offsetY: -5,
      opacity: 0.9,
      flip: true,
      animation: 'sway',
    },
  },
  bulldog: {
    containerSize: 180,
    shadow: {
      src: mungmungShadowImage,
      size: 200,
      offsetX: -11,
      offsetY: -12,
    },
    char: {
      src: bulldogCharImage,
      size: 168,
      offsetX: 8,
      offsetY: -10,
      opacity: 0.9,
      animation: 'sway',
    },
  },
  tree: {
    containerSize: 180,
    shadow: {
      src: treeShadowImage,
      size: 200,
      offsetX: -21,
      offsetY: -17,
    },
    char: {
      src: treeCharImage,
      size: 128,
      offsetX: 23,
      offsetY: -11,
      opacity: 0.8,
      animation: 'wind',
    },
  },
};

// ─── 공통 이미지 레이어 ───────────────────────────────────────────────────────

function FillImage({ src }: { src: string }) {
  return (
    <img
      alt=""
      src={src}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ objectFit: 'fill' }}
    />
  );
}

// ─── 애니메이션 레이어 ────────────────────────────────────────────────────────

function AnimatedDecorationLayers({
  shadow,
  char,
  preset,
  animationDelay = 0,
}: {
  shadow: ShadowConfig;
  char: CharConfig;
  preset: AnimPreset;
  animationDelay?: number;
}) {
  const {
    keyframes,
    duration,
    repeatDelay,
    charPivotFraction,
    charRotateRatio,
    charSkewRatio,
    shadowPivotFraction,
    shadowSkewRatio,
  } = preset;

  const rotateVal = useMotionValue(0);
  const charRotateVal = useTransform(rotateVal, (v) => v * charRotateRatio);
  const charSkewVal = useTransform(rotateVal, (v) => v * charSkewRatio);
  const shadowSkewVal = useTransform(rotateVal, (v) => v * shadowSkewRatio);

  useEffect(() => {
    const controls = animate(rotateVal, keyframes, {
      delay: animationDelay,
      duration,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay,
    });
    return controls.stop;
  }, [rotateVal, keyframes, duration, repeatDelay, animationDelay]);

  const shadowStyle = {
    width: shadow.size,
    height: shadow.size,
    left: shadow.offsetX,
    top: shadow.offsetY,
    skewX: shadowSkewVal,
    transformOrigin: `50% ${shadowPivotFraction * 100}%`,
  };

  const charStyle = {
    width: char.size,
    height: char.size,
    left: char.offsetX,
    top: char.offsetY,
    rotate: charRotateVal,
    skewX: charSkewVal,
    transformOrigin: `50% ${charPivotFraction * 100}%`,
  };

  const charInnerStyle = {
    opacity: char.opacity,
    ...(char.flip && { transform: 'rotate(180deg) scaleY(-1)' }),
  };

  return (
    <>
      <motion.div
        className="pointer-events-none absolute mix-blend-multiply"
        style={shadowStyle}
      >
        <FillImage src={shadow.src} />
      </motion.div>

      <motion.div className="pointer-events-none absolute" style={charStyle}>
        <div className="h-full w-full" style={charInnerStyle}>
          <FillImage src={char.src} />
        </div>
      </motion.div>
    </>
  );
}

// ─── 정적 레이어 ─────────────────────────────────────────────────────────────

function StaticDecorationLayers({
  shadow,
  char,
}: {
  shadow: ShadowConfig;
  char: CharConfig;
}) {
  const shadowStyle = {
    width: shadow.size,
    height: shadow.size,
    left: shadow.offsetX,
    top: shadow.offsetY,
  };

  const charStyle = {
    width: char.size,
    height: char.size,
    left: char.offsetX,
    top: char.offsetY,
    opacity: char.opacity,
    ...(char.flip && { transform: 'rotate(180deg) scaleY(-1)' }),
  };

  return (
    <>
      <div
        className="pointer-events-none absolute mix-blend-multiply"
        style={shadowStyle}
      >
        <FillImage src={shadow.src} />
      </div>

      <div className="pointer-events-none absolute" style={charStyle}>
        <FillImage src={char.src} />
      </div>
    </>
  );
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────

type Props = {
  type: keyof typeof DECORATION_CONFIGS;
  /** 스크롤 가능한 로드맵 캔버스 내부 기준 top (px) */
  anchorY: number;
  /** 컨테이너의 어느 쪽 가장자리에 붙일지 */
  side: 'left' | 'right';
  /** side 기준 픽셀 오프셋 (양수=안쪽, 음수=바깥쪽) */
  sideOffset?: number;
  /** 애니메이션 최초 시작 지연 (s) */
  animationDelay?: number;
};

export default function RoadmapDecoration({
  type,
  anchorY,
  side,
  sideOffset = -20,
  animationDelay = 0,
}: Props) {
  const cfg = DECORATION_CONFIGS[type];
  if (!cfg) return null;

  const { containerSize, shadow, char } = cfg;

  // transform은 새로운 stacking context를 만들어 mix-blend-mode를 깨뜨립니다.
  // translateY(-50%) 대신 marginTop으로 수직 중앙 정렬합니다.
  const containerStyle = {
    top: anchorY,
    marginTop: -containerSize / 2,
    width: containerSize,
    height: containerSize,
    ...(side === 'right' ? { right: sideOffset } : { left: sideOffset }),
  };

  const preset = char.animation ? ANIM_PRESETS[char.animation] : null;

  return (
    <div className="pointer-events-none absolute" style={containerStyle}>
      {preset ? (
        <AnimatedDecorationLayers
          shadow={shadow}
          char={char}
          preset={preset}
          animationDelay={animationDelay}
        />
      ) : (
        <StaticDecorationLayers shadow={shadow} char={char} />
      )}
    </div>
  );
}
