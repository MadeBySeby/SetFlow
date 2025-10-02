import React from "react";
import Svg, { Rect, Path, Circle, G } from "react-native-svg";

export default function NoEquipmentIcon({
  size = 24,
  color = "#00a877",
  isActive = false,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Base Icon: a simple gym item (barbell/kettlebell abstract) */}
      <Rect
        x="6"
        y="8"
        width="12"
        height="8"
        rx="2"
        ry="2"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 8V6A3 3 0 0 1 18 6V8"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="12"
        cy="7"
        r="2"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Slash for "No Equipment" */}
      <Path
        d="M5 19L19 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* MARKED State: Checkmark Badge */}
      <G>
        <Circle
          cx="20"
          cy="20"
          r="4"
          fill={color}
          stroke="#ffffff"
          strokeWidth="1.2"
        />
        <Path
          d="M18.5 20L19.5 21L21.5 18.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
