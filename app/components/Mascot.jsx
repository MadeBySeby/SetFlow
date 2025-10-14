import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Svg, {
  Rect,
  Circle,
  Ellipse,
  Line,
  Text as SvgText,
  G,
} from "react-native-svg";

// Import your mascot SVG component
// import MascotSVG from './MascotSVG'; // Your mascot component

// Placeholder Mascot component (replace with your actual mascot)
const MascotSVG = ({ width, height }) => (
  <View
    style={{ width, height, justifyContent: "center", alignItems: "center" }}>
    <Svg width={width} height={height} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="40" fill="#3498db" />
      <SvgText x="50" y="60" fontSize="40" fill="white" textAnchor="middle">
        🐻
      </SvgText>
    </Svg>
  </View>
);

const WeightScale = ({ weight = 0 }) => {
  // Format weight to show decimal (e.g., 65.5 kg)
  const displayWeight = weight > 0 ? weight.toFixed(1) : "-- . --";

  return (
    <Svg width={200} height={80} viewBox="0 0 200 80">
      {/* Shadow */}
      <Ellipse cx={100} cy={75} rx={85} ry={8} fill="rgba(0,0,0,0.1)" />

      {/* Scale base (bottom part) */}
      <Rect x={20} y={50} width={160} height={25} fill="#34495e" rx={8} />

      {/* Scale platform (top part) */}
      <Rect
        x={15}
        y={35}
        width={170}
        height={20}
        fill="#ecf0f1"
        rx={6}
        stroke="#bdc3c7"
        strokeWidth={2}
      />

      {/* Non-slip texture pattern */}
      <G opacity={0.3}>
        <Circle cx={50} cy={45} r={2} fill="#95a5a6" />
        <Circle cx={70} cy={45} r={2} fill="#95a5a6" />
        <Circle cx={90} cy={45} r={2} fill="#95a5a6" />
        <Circle cx={110} cy={45} r={2} fill="#95a5a6" />
        <Circle cx={130} cy={45} r={2} fill="#95a5a6" />
        <Circle cx={150} cy={45} r={2} fill="#95a5a6" />
      </G>

      {/* Digital display screen */}
      <Rect x={70} y={55} width={60} height={15} fill="#2c3e50" rx={3} />
      <Rect x={72} y={57} width={56} height={11} fill="#1a252f" rx={2} />

      {/* Display numbers - NOW SHOWS ACTUAL WEIGHT */}
      <SvgText
        x={100}
        y={66}
        fontFamily="'Courier New', monospace"
        fontSize={10}
        fontWeight="bold"
        fill="#00ff88"
        textAnchor="middle">
        {displayWeight}
      </SvgText>

      {/* Brand label */}
      <SvgText
        x={100}
        y={72}
        fontFamily="Arial, sans-serif"
        fontSize={6}
        fill="#95a5a6"
        textAnchor="middle">
        DIGITAL
      </SvgText>

      {/* Feet (rubber pads) */}
      <Rect x={25} y={73} width={12} height={4} fill="#2c3e50" rx={2} />
      <Rect x={163} y={73} width={12} height={4} fill="#2c3e50" rx={2} />

      {/* Decorative details */}
      <Line
        x1={30}
        y1={45}
        x2={170}
        y2={45}
        stroke="#bdc3c7"
        strokeWidth={1}
        opacity={0.5}
      />

      {/* Corner screws */}
      <Circle cx={25} cy={40} r={1.5} fill="#95a5a6" />
      <Circle cx={175} cy={40} r={1.5} fill="#95a5a6" />
      <Circle cx={25} cy={50} r={1.5} fill="#95a5a6" />
      <Circle cx={175} cy={50} r={1.5} fill="#95a5a6" />
    </Svg>
  );
};

export default function MascotOnScale({ userHeight = 170, userWeight = 65 }) {
  const { width, height } = useMemo(() => {
    const scaleFactor = 1.1;
    const baseHeight = 150;
    const size = baseHeight * (userHeight / 170) * scaleFactor;
    return { width: size, height: size };
  }, [userHeight]);

  return (
    <View style={styles.container}>
      {/* Mascot positioned above the scale */}
      <View style={styles.mascotContainer}>
        <MascotSVG width={width} height={height} />
      </View>

      {/* Weight Scale - NOW RECEIVES WEIGHT PROP */}
      <View style={styles.scaleContainer}>
        <WeightScale weight={userWeight} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  mascotContainer: {
    marginBottom: -20, // Overlap mascot slightly with scale for "standing on" effect
    zIndex: 2,
  },
  scaleContainer: {
    zIndex: 1,
  },
});

// EXPORT both components for use in other files

export { WeightScale };
