import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SafeScreen from "../components/SafeScreen";
import styles from "../style";
import { useWorkout } from "../contexts/WorkoutContext";

const About = () => {
  const { UserProfile, clearAllData } = useWorkout();
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

  const footerComponent = () => {
    return (
      <Pressable onPress={() => clearAllData()}>
        <Text
          style={{
            ...styles.workoutGoalButton,
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
            borderColor: "red",
          }}>
          Clear all data
        </Text>
      </Pressable>
    );
  };
  return (
    <SafeScreen style={{ ...styles.Background, flex: 1 }}>
      <Text style={styles.defaultText}>About</Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "100%",
        }}>
        <FlatList
          data={info || []}
          style={{ width: "100%", paddingBottom: 0 }}
          keyExtractor={(item) => item.label}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={footerComponent}
          renderItem={({ item }) => (
            <View
              key={item.label}
              style={{
                ...styles.workoutGoalButton,
                margin: 10,
                alignSelf: "center",
                // width: "90%",
                // justifyContent: "center",
                // alignItems: "center",
              }}>
              <Text style={styles.defaultText}>
                {item.label}: {item.value}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeScreen>
  );
};

export default About;
