// MascotExact.js
// React Native SVG exact-style mascot (clean, optimized SVG paths)
// Requires: react-native-svg
import React, { useMemo } from "react";
import { View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
  G,
  Path,
  Circle,
  Ellipse,
  Rect,
} from "react-native-svg";

// import inWeightOlderMascot from "../assets/inWeightOlderMascot.svg";
// import normalShapeYoungerMascot from "../assets/normalShapeYoungerMascot.svg";
// import wellBuiledYoungerMascot from "../assets/wellBuiledYoungerMascot.svg";
// import normalShapeThinYoungerMascot from "../assets/normalShapeThinYoungerMascot.svg";
import { WeightScale } from "./Mascot";

export default function MascotExact({ age, weight, userHeight = 170 }) {
  const NormalShapeThinOlderMascot =
    require("../assets/normalShapeThinOlderMascot.svg").default;
  const WellBuiledOlderMascot =
    require("../assets/wellBuiledOlderMascot.svg").default;

  const { width, height } = useMemo(() => {
    const scaleFactor = 3; // tweak this number to your liking
    const baseHeight = 150; // the visual base size for 170cm
    const size = baseHeight * (userHeight / 170) * scaleFactor;
    return { width: size, height: size };
  }, [userHeight]);

  // UBti global size chart logic
  // Reference: For 170cm, 65-75kg is "good" (normal/well built)
  // We'll interpolate for other heights using BMI-like logic

  // Calculate BMI
  const heightM = userHeight / 100;
  const bmi = weight / (heightM * heightM);

  // Define ranges (approximate, adjust as needed)
  // Underweight: BMI < 18.5
  // Normal: 18.5 <= BMI < 25
  // Well built: 25 <= BMI < 28
  // Overweight: BMI >= 28 (not handled here)

  let MascotComponent;
  if (bmi < 18.5) {
    MascotComponent = NormalShapeThinOlderMascot;
  } else if (bmi < 25) {
    MascotComponent = NormalShapeThinOlderMascot;
  } else {
    MascotComponent = WellBuiledOlderMascot;
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}>
      <MascotComponent width={width} height={height} />
      <WeightScale weight={weight} />
    </View>
  );
}
