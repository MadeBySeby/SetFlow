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
  console.log("papi", presetPrograms.workouts[0].exercises[0]);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
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
          <Pressable
            onPress={() => {
              setWorkoutModalVisible(true);
              alert("Starting Workout from Program");
            }}>
            <ProgramWorkoutCard key={index} workout={item} />
          </Pressable>
        )}
        keyExtractor={(item, index) => `workout-${index}`}
      />

      <Modal
        visible={workoutModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => {}}>
        <WorkoutScreen
          currentExercise={presetPrograms.workouts[0].exercises[0]}
          setWorkoutModalVisible={setWorkoutModalVisible}
          onClose={() => {
            setWorkoutModalVisible(false);
          }}
        />
      </Modal>
    </SafeScreen>
  );
};

export default Programs;
