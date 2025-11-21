import React from "react";
import Svg, { Rect, Circle, Path, G } from "react-native-svg";

export default function NoEquipmentIcon({
  size = 24,
  color = "#00a877",
  isActive = false,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="9"
        width="3"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />

      <Rect
        x="18"
        y="9"
        width="3"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />

      <Path
        d="M6 12H18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <Circle
        cx="9"
        cy="12"
        r="1.5"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Circle
        cx="15"
        cy="12"
        r="1.5"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />

      <Path
        d="M4 4L20 20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M20 4L4 20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
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
