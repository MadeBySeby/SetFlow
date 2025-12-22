import { Redirect, Stack } from "expo-router";
import styles from "../components/style";
import { useWorkout } from "../contexts/WorkoutContext";

export default function OnboardingLayout() {
  const { isOnboardingCompleted } = useWorkout();
  console.log("Onboarding status in layout2:", isOnboardingCompleted);
  if (isOnboardingCompleted) return <Redirect href="/(tabs)" />;
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#47b977",
        headerShown: true,
        headerTitle: "SetFlow",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: styles.Background.backgroundColor,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTitleStyle: { color: "white" },
        headerShadowVisible: false,
      }}>
      <Stack.Screen name="ScreenOne" />
      <Stack.Screen name="ScreenTwo" />
      <Stack.Screen
        // options={{ headerBackVisible: false, gestureEnabled: false }}
        name="PlanDurationScreen"
      />
      <Stack.Screen name="PersonalDetailsScreen" />
      <Stack.Screen name="LevelScreen" />
    </Stack>
  );
}
