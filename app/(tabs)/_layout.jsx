import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWorkout } from "../contexts/WorkoutContext";
export default function TabLayout() {
  const { isOnboardingCompleted } = useWorkout();
  console.log("Onboarding status in layout:", isOnboardingCompleted);
  if (!isOnboardingCompleted)
    return <Redirect href="/(onboarding)/ScreenOne" />;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#47b977",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#1a202c",
          borderTopColor: "#334155",
        },
        headerShown: false,

        tabBarLabelStyle: { fontSize: 12 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="WorkoutsHistory"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
