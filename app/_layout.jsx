import "react-native-reanimated";
import { Slot, useRouter } from "expo-router";
import { WorkoutProvider, useWorkout } from "./contexts/WorkoutContext";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Caveat-Bold": require("./assets/fonts/Caveat-Bold.ttf"),
    "Caveat-Regular": require("./assets/fonts/Caveat-Regular.ttf"),
  });

  return (
    <WorkoutProvider>
      <Slot />
    </WorkoutProvider>
  );
}
