import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { use } from "react";
import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";
import styles from "../style";
import SafeScreen from "../components/SafeScreen";
import { Image } from "expo-image";
const WorkoutsHistory = () => {
  const { workoutHistory, clearWorkoutData } = useContext(WorkoutContext);
  console.log("workoutHistory", workoutHistory);
  return (
    <SafeScreen style={styles.Background}>
      <View style={styles.Background}>
        <Text style={styles.defaultText}>WorkoutHistory</Text>
        {workoutHistory.length === 0 ? (
          <Text style={styles.defaultText}>No workouts logged yet.</Text>
        ) : (
          workoutHistory.map((workout, index) => (
            <View key={index} style={{ margin: 10, alignItems: "center" }}>
              <Text style={styles.defaultText}>{workout.name}</Text>
              <Image
                source={{ uri: workout.gifUrl }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  alignContent: "center",
                  marginTop: 10,
                }}
                contentFit="cover"
                transition={1000}
              />
            </View>
          ))
        )}
        {workoutHistory.length > 0 && (
          <Pressable
            style={{
              ...styles.workoutGoalButton,
              alignSelf: "center",
            }}
            onPress={() => {
              clearWorkoutData();
              console.log("Cleared workout history");
              console.log("workoutHistory after clear", workoutHistory);
            }}>
            <Text style={styles.defaultText}>Clear Workout History</Text>
          </Pressable>
        )}
      </View>
    </SafeScreen>
  );
};

export default WorkoutsHistory;
