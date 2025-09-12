import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../components/style";
import { useContext } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
const LevelScreen = () => {
  const { completeOnboarding, updateLevel, userProfile } = useWorkout();
  const handleSelectLevel = async (level) => {
    console.log("Selected level:", level, userProfile);
    updateLevel(level);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await completeOnboarding();
    router.replace("/(tabs)");
  };

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
