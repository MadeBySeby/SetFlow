import React from "react";
import { View } from "react-native";
import Body from "react-native-body-highlighter";

export default function AutoBody({ focus }) {
  const allMuscles = [
    "chest",
    "biceps",
    "triceps",
    "abs",
    "quads",
    "hamstrings",
    "glutes",
    "calves",
    "forearms",
    "deltoids",
    "traps",
    "upper-back",
    "lower-back",
    "lats",
    "obliques",
    "hip-flexors",
  ];

  const highlight = allMuscles.map((slug) => ({ slug, intensity: 2 }));

  const showBack =
    focus?.toLowerCase().includes("glute") ||
    focus?.toLowerCase().includes("back");

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Body
        data={highlight}
        gender="male"
        side="front"
        scale={0.7}
        border="black"
      />
      {showBack && (
        <Body
          data={highlight}
          gender="male"
          side="back"
          scale={0.7}
          border="black"
        />
      )}
    </View>
  );
}
