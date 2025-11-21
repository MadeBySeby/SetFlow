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
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  return (
    <SafeScreen
      excludeBottomSafeArea={false}
      style={{ ...styles.Background, flex: 1 }}>
      <FlatList
        data={presetPrograms.workouts}
        renderItem={({ item, index }) => (
          <ProgramWorkoutCard
            workoutModalVisible={workoutModalVisible}
            setWorkoutModalVisible={setWorkoutModalVisible}
            key={index}
            workout={item}
            onOpen={() => {
              setSelectedWorkout(item);
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
