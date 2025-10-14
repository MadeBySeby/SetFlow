import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useContext } from "react";
import { useWorkout, WorkoutContext } from "../contexts/WorkoutContext";
import styles from "../components/style";
import SafeScreen from "../components/SafeScreen";
import { Image } from "expo-image";
import DuolingoLikeMascotOnScale from "../components/Mascot";
import NoWorkoutsLoggedYetDefaultMascot from "../assets/noWorkoutsLoggedYetDefault.svg";
const WorkoutsHistory = () => {
  const { workoutHistory, clearWorkoutData } = useWorkout();
  console.log("workoutHistory", workoutHistory);
  return (
    <SafeScreen style={styles.Background}>
      <View
        style={{
          ...styles.Background,
          display: "flex",
        }}>
        <Text style={styles.defaultText}>Workout History</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}>
          {workoutHistory.length === 0 ? (
            <View
              style={{
                marginTop: 50,
                alignItems: "center",
                alignContent: "center",
                display: "flex",
                gap: 10,
                justifyContent: "center",
                flex: 1,
              }}>
              <Text style={{ ...styles.defaultText, color: "#47b977" }}>
                No workouts logged yet.
              </Text>
              <NoWorkoutsLoggedYetDefaultMascot width={300} height={400} />
            </View>
          ) : (
            workoutHistory.map((workout, index) => (
              <View key={index} style={{ marginTop: 10, alignItems: "center" }}>
                {/* <Text style={styles.defaultText}>{workout.name}</Text> */}
                <Image
                  source={{ uri: workout.gif }}
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
                <Pressable
                  style={{
                    ...styles.workoutGoalButton,
                  }}
                  onPress={() => {
                    clearWorkoutData();
                    console.log("Cleared workout history");
                    console.log("workoutHistory after clear", workoutHistory);
                  }}>
                  <Text style={{ ...styles.defaultText }}>
                    Clear Workout History
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </View>
    </SafeScreen>
  );
};

export default WorkoutsHistory;
