import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../style";
import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";
import * as Haptics from "expo-haptics";
const LevelScreen = () => {
  const { completeOnboarding, updateLevel, userProfile } =
    useContext(WorkoutContext);
  const handleSelectLevel = (level) => {
    console.log("Selected level:", level, userProfile);
    updateLevel(level);
    completeOnboarding();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
