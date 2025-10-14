import { Image } from "expo-image";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProgramWorkoutCard({ workout }) {
  console.log("workout in ProgramWorkoutCard:", workout);
  return (
    <View
      style={{
        margin: 10,
        padding: 20,
        backgroundColor: "#1E1E1E",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#47b977",
      }}>
      <TouchableOpacity style={{ gap: 5 }}>
        <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>
          {workout?.name}
        </Text>
        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
          {workout?.description}
        </Text>
        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
          Duration: {workout?.duration} weeks
        </Text>
        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
          Intensity: {workout?.intensity}
        </Text>
        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
          Focus: {workout?.focus}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
