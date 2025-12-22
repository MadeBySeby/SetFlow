// components/WeightLossIcon.jsx
import React, { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { SVGPathProperties } from "svg-path-properties";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function WeightLossIcon({
  progress,
  size = 80,
  color = "#22c55e",
  strokeWidth = 2,
}) {
  // the main outline path (single 'd' string). Replace with your own if you want.
  const d =
    "M24.93,4.76a25.75,25.75,0,0,0-5.62.46,14.43,14.43,0,0,0-4.55,1.71c-.49.45-.51,3.29,0,5.11a9.94,9.94,0,0,0,6.76,6.84,9.77,9.77,0,0,0,10.88-4.41A10.44,10.44,0,0,0,33.7,9c0-1.65,0-1.79-.57-2.21A18.9,18.9,0,0,0,28,5a16.62,16.62,0,0,0-3.08-.28Z";

  const [len, setLen] = useState(0);

  useEffect(() => {
    try {
      const props = new SVGPathProperties(d);
      const total = props.getTotalLength();
      setLen(total);
    } catch (err) {
      console.warn("SVG path length calc failed:", err);
      setLen(1000); // fallback
    }
  }, [d]);

  // Animated props: strokeDashoffset = len * (1 - progress)
  const animatedProps = useAnimatedProps(() => {
    // progress may be undefined if you didn't pass it — handle gracefully
    const p =
      progress && typeof progress.value === "number" ? progress.value : 0;
    const offset = len ? (1 - p) * len : 1000;
    return {
      strokeDashoffset: offset,
    };
  });

  return (
    <Svg viewBox="0 0 48 48" width={size} height={size}>
      <AnimatedPath
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={len || 1000}
        animatedProps={animatedProps}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
