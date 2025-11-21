import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useContext } from "react";
import { useWorkout, WorkoutContext } from "../contexts/WorkoutContext";
import styles from "../components/style";
import SafeScreen from "../components/SafeScreen";
import { Image } from "expo-image";
import NoWorkoutsLoggedYetDefaultMascot from "../assets/noWorkoutsLoggedYetDefault.svg";

const WorkoutsHistory = () => {
  const { workoutHistory, clearWorkoutData } = useWorkout();

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
            workoutHistory.map((workout) =>
              workout.data.map((exercise, i) => (
                <View key={i} style={{ marginTop: 10, alignItems: "center" }}>
                  <Image
                    source={{ uri: exercise.gif }}
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
            )
          )}
        </View>
        {workoutHistory.length > 0 && (
          <Pressable
            style={{
              ...styles.workoutGoalButton,
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              top: "65%",
              alignSelf: "center",
            }}
            onPress={() => {
              clearWorkoutData();
            }}>
            <Text style={{ ...styles.defaultText }}>Clear Workout History</Text>
          </Pressable>
        )}
      </View>
    </SafeScreen>
  );
};

export default WorkoutsHistory;
