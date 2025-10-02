import React from "react";
import { Svg, Line, Rect, Path, Circle } from "react-native-svg";

export default function AtHomeEquipmentIcon({
  size = 40,
  color = "#47b977",
  isActive = false,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Line
        x1="16"
        y1="32"
        x2="48"
        y2="32"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Rect x="12" y="26" width="6" height="12" fill={color} />
      <Rect x="46" y="26" width="6" height="12" fill={color} />

      {isActive && (
        <>
          <Circle cx="48" cy="16" r="10" fill={color} />

          <Path
            d="M44 16 L47 19 L52 12"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </Svg>
  );
}
