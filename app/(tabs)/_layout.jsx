import { Redirect, Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Svg, { Path } from "react-native-svg";
import { useWorkout } from "../contexts/WorkoutContext";
import LottieView from "lottie-react-native/src";
import { Image } from "expo-image";
import { useState, useRef, useEffect } from "react";

const HomeIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FitnessIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 14h2v-4H4v4zm14 0h2v-4h-2v4zM8 8h2v8H8V8zm6 0h2v8h-2V8z"
      fill={color}
    />
  </Svg>
);

const InfoIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.75 5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM11 10h2v7h-2v-7z"
      fill={color}
    />
  </Svg>
);

const SearchIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0-2a9 9 0 1 0 5.64 15.93l3.36 3.36 1.41-1.41-3.36-3.36A9 9 0 0 0 11 2z"
      fill={color}
    />
  </Svg>
);

const HistoryIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 3a9 9 0 1 0 8.94 8H20a7 7 0 1 1-7-7V3zM12 7v6l4 2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TabIconWithAnimation = ({ focused, animationSource, Icon }) => {
  const animationEndedRef = useRef(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!focused) {
      animationEndedRef.current = false;
    }
  }, [focused]);
  return (
    <>
      {focused && !animationRef.current ? (
        <LottieView
          source={animationSource}
          // autoPlay={focused}
          // ref={animationRef}
          key={focused ? "focus" : "blur"}
          loop={true}
          autoPlay
          onAnimationFinish={() => {
            animationEndedRef.current = true;
            console.log("Animation finished");
          }}
          style={{ width: 56, height: 56 }}
        />
      ) : (
        <Icon color={focused ? "#47b977" : "gray"} size={24} />
      )}
    </>
  );
};
export default function TabLayout() {
  const { isOnboardingCompleted } = useWorkout();
  const animationEndedRef = useRef(false);
  const [, forceUpdate] = useState({});
  console.log("Onboarding status in layout:", isOnboardingCompleted);
  if (!isOnboardingCompleted) {
    return <Redirect href="/(onboarding)/ScreenOne" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#47b977",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#101326ff",

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
            // <Ionicons name="home" size={size} color={color} />
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Programs"
        options={{
          title: "Programs",
          tabBarIcon: ({ focused }) => (
            <TabIconWithAnimation
              focused={focused}
              animationSource={require("../assets/TabsRunAnim.json")}
              Icon={FitnessIcon}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons
            //   name="information-outline"
            //   size={size}
            //   color={color}
            // />
            <InfoIcon color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="search" size={size} color={color} />
            <SearchIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="WorkoutsHistory"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="history" size={size} color={color} />
            <HistoryIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
