import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeScreen from "../components/SafeScreen";
import styles from "../style";
import { useWorkout } from "../contexts/WorkoutContext";

const About = () => {
  const { UserProfile } = useWorkout();
  const info = [
    { label: "Workout Goal", value: UserProfile.workoutGoal },
    { label: "Age", value: UserProfile.age },
    { label: "Height", value: UserProfile.height },
    { label: "Weight", value: UserProfile.weight },
    { label: "Fitness Level", value: UserProfile.fitnessLevel },
    { label: "Daily Workout Time", value: UserProfile.DailyWorkoutTime },
    { label: "Plan Duration", value: UserProfile.PlanDuration },
    { label: "Equipment", value: UserProfile.equipment },
  ];
  return (
    <SafeScreen style={{ ...styles.Background, flex: 1 }}>
      <ScrollView>
        <Text style={styles.defaultText}>About</Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            justifyContent: "space-evenly",
            height: "100%",
          }}>
          {info.map((item) => (
            <View key={item.label} style={{ ...styles.workoutGoalButton }}>
              <Text style={styles.defaultText}>
                {item.label}: {item.value}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default About;
