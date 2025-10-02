import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Svg, { Path, Rect, Text, G } from "react-native-svg";

export default function DuolingoLikeMascotOnScale({
  size = Dimensions.get("window").height * 0.9, // 90% screen height
  color = "#47b977",
  weight = 75, // Default weight in kg
  height = 170, // Default height in cm
  mascotScale = 1, // Base mascot scale
}) {
  const viewBoxWidth = 250;
  const viewBoxHeight = 250;
  const scale = size / viewBoxWidth;

  // Normalize height relative to 170cm
  const heightScale = height / 170;

  return (
    <View style={styles.background}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
        {/* Scale base */}
        <Rect
          x={90}
          y={200}
          width={70}
          height={25}
          rx={8}
          fill={color}
          opacity="0.9"
        />
        {/* Scale platform */}
        <Rect x={95} y={195} width={60} height={8} rx={3} fill={color} />
        {/* Weight display */}
        <Text
          x={125}
          y={215}
          fontSize={12}
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          fontFamily="System">
          {weight} kg
        </Text>

        {/* Mascot group */}
        <G
          transform={`translate(125, 150) scale(${mascotScale * scale} ${
            mascotScale * scale * heightScale
          })`}>
          {/* Body */}
          <Path
            d="M0 -10 Q5 -15, 10 -10 Q15 -5, 10 0 Q5 5, 0 5 Q-5 5, -10 0 Q-15 -5, -10 -10 Q-5 -15, 0 -10 Z"
            fill={color}
          />
          {/* Head */}
          <Path
            d="M0 -20 Q4 -24, 8 -20 Q12 -16, 8 -12 Q4 -8, 0 -12 Q-4 -8, -8 -12 Q-12 -16, -8 -20 Q-4 -24, 0 -20 Z"
            fill={color}
          />
          {/* Eyes */}
          <Rect x="-3" y="-18" width="2" height="2" rx="1" fill="white" />
          <Rect x="1" y="-18" width="2" height="2" rx="1" fill="white" />
          <Rect x="-3" y="-18" width="1" height="1" fill="black" />
          <Rect x="1" y="-18" width="1" height="1" fill="black" />
          {/* Beak */}
          <Path d="M0 -12 L2 -10 L0 -8 L-2 -10 Z" fill="#FFD700" />
          {/* Wings */}
          <Path
            d="M-10 0 Q-15 5, -12 10 Q-10 12, -8 10"
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
          <Path
            d="M10 0 Q15 5, 12 10 Q10 12, 8 10"
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
          {/* Legs */}
          <Path d="M-3 5 L-3 15" stroke={color} strokeWidth="2" />
          <Path d="M3 5 L3 15" stroke={color} strokeWidth="2" />
          {/* Feet */}
          <Path d="M-3 15 Q-4 16, -3 17" stroke={color} strokeWidth="2" />
          <Path d="M3 15 Q4 16, 3 17" stroke={color} strokeWidth="2" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute", // stays behind inputs
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1, // behind everything else
  },
});
