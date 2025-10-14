import "react-native-reanimated";
import { Slot, useRouter } from "expo-router";
import { WorkoutProvider, useWorkout } from "./contexts/WorkoutContext";
import { useEffect, useState } from "react";

import { View, ActivityIndicator } from "react-native";

export default function AppLayout() {
  return (
    <WorkoutProvider>
      <Slot />
    </WorkoutProvider>
  );
}
