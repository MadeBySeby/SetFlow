import React from "react";
import Svg, { Rect, Path, Circle, G } from "react-native-svg";

export default function GymMembershipIcon({
  size = 24,
  color = "#00a877",
  isActive = false,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Base Icon Elements */}
      <Rect
        x="3"
        y="9"
        width="18"
        height="10"
        rx="2"
        ry="2"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 9V6A4 4 0 0 1 18 6V9H6Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="12"
        cy="7.5"
        r="2.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 10C15 9.5 13.5 9 12 9C10.5 9 9 9.5 9 10"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M6 13 L18 13"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 16 L14 16"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {isActive && (
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
      )}
    </Svg>
  );
}
