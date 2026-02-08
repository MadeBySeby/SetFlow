import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import styles from "../components/style";
import { useContext } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { usePushNotifications } from "../hooks/useNotification";
const LevelScreen = () => {
  const { completeOnboarding, updateLevel, userProfile } = useWorkout();
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  console.log(expoPushToken);
  const handleSelectLevel = async (level) => {
    updateLevel(level);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await completeOnboarding();
    router.replace("/(tabs)");
  };

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Permission to send notifications was denied");
  //     }
  //   })();
  // }, []);
  // Send notification after 5 seconds
  // Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: "Workout Reminder",
  //     body: "Time to start your workout!",
  //     data: { screen: "Workouts" },
  //   },

  //   trigger: { seconds: 5 },
  // });
  return (
    <View
      style={{
        ...styles.Background,
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
      }}>
      <Text style={[styles.defaultText, { fontSize: 24, marginBottom: 30 }]}>
        Select Your Level
      </Text>
      {/* <Text className="text-red-500">{expoPushToken?.data ?? ""} expo </Text>
      <Text className="text-red-500">{data}</Text> */}
      <Pressable
        style={styles.workoutGoalButton}
        onPress={() => handleSelectLevel("beginner")}>
        <Text style={styles.defaultText}>Beginner</Text>
      </Pressable>

      <Pressable
        style={styles.workoutGoalButton}
        onPress={() => handleSelectLevel("intermediate")}>
        <Text style={styles.defaultText}>Intermediate</Text>
      </Pressable>

      <Pressable
        style={styles.workoutGoalButton}
        onPress={() => handleSelectLevel("advanced")}>
        <Text style={styles.defaultText}>Advanced</Text>
      </Pressable>
    </View>
  );
};

export default LevelScreen;
