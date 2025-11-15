import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import SafeScreen from "../components/SafeScreen";
import styles from "../components/style";
import { presetPrograms } from "../api/PreSetPrograms";
import ProgramWorkoutCard from "../components/ProgramWorkoutCard";
import { ScrollView } from "moti";
import WorkoutScreen from "../(onboarding)/WorkoutScreen";
const Programs = () => {
  // console.log("papi", presetPrograms.workouts[0].exercises[0]);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  return (
    <SafeScreen
      excludeBottomSafeArea={false}
      style={{ ...styles.Background, flex: 1 }}>
      {/* {presetPrograms.workouts.map((workout, index) => (
          <ProgramWorkoutCard key={index} workout={workout} />
        ))} */}
      <FlatList
        data={presetPrograms.workouts}
        // ListFooterComponent={}
        renderItem={({ item, index }) => (
          <ProgramWorkoutCard
            workoutModalVisible={workoutModalVisible}
            setWorkoutModalVisible={setWorkoutModalVisible}
            key={index}
            workout={item}
            onOpen={() => {
              setSelectedWorkout(item); // <- store the clicked workout
              // setModalVisible(true); // <- open single modal
            }}
            selectedWorkout={selectedWorkout}
          />
        )}
        keyExtractor={(item, index) => `workout-${index}`}
      />
    </SafeScreen>
  );
};

export default Programs;
