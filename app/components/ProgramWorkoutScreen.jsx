import React, { useState, useMemo } from "react";
import {
  Pressable,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import styles from "./style";
import SafeScreen from "./SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import WorkoutScreen from "../(onboarding)/WorkoutScreen";
import ExerciseDetail from "../ExerciseDetail";
const ProgramWorkoutScreen = ({ workoutData, setWorkoutModalVisible }) => {
  const [startWorkout, setStartWorkout] = useState(false);
  const [exerciseDetailModalVisible, setExerciseDetailModalVisible] =
    useState(false);
  const [itemIdforDetail, setItemIdforDetail] = useState(null);
  const exercises = workoutData.supersets
    ? workoutData.supersets[0].exercises
    : workoutData.exercises;
  const normalizedExercises = useMemo(
    () =>
      exercises.map((ex, index) => ({
        name: ex.name,
        gif: ex.gifUrl,
        reps: ex.duration_seconds || 45,
        sets: workoutData.sets_per_round || 1,
        exerciseId: ex.id || index,
      })),
    [exercises, workoutData]
  );

  if (startWorkout) {
    return (
      <WorkoutScreen
        selectedDate={new Date().toISOString().split("T")[0]}
        setWorkoutModalVisible={setWorkoutModalVisible}
        currentExercise={normalizedExercises}
        type="Programs"
        restSec={workoutData.rest_between_exercises_seconds}
      />
    );
  }

  return (
    <SafeScreen style={{ ...styles.Background }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          onPress={() => setWorkoutModalVisible(false)}
          name="close-circle"
          size={30}
          color="white"
        />
        <Text style={{ ...styles.TitleText, marginLeft: 10 }}>
          {workoutData.name}
        </Text>
      </View>

      <Text style={{ ...styles.defaultText, marginLeft: 10, marginBottom: 10 }}>
        {workoutData.sets_per_round} sets -{" "}
        {workoutData.rest_between_exercises_seconds} seconds rest
      </Text>

      <FlatList
        data={exercises}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={() => (
          <Pressable
            style={{
              ...styles.workoutGoalButton,
              alignSelf: "center",
              padding: 15,
              marginBottom: 30,
            }}
            onPress={() => setStartWorkout(true)}>
            <Text style={{ ...styles.defaultText }}>Start Workout</Text>
          </Pressable>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setItemIdforDetail(item.exerciseId);
              setExerciseDetailModalVisible(true);
            }}
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
              borderColor: "#47b977",
              alignItems: "center",
            }}>
            <Text style={{ ...styles.defaultText }}>
              {index + 1}. {item.name} - {item.duration_seconds} seconds
            </Text>
            <Image
              source={{ uri: item.gifUrl }}
              style={{
                width: 200,
                height: 200,
                marginTop: 10,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: "#47b977",
              }}
              contentFit="cover"
              transition={300}
            />
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        presentationStyle="fullScreen"
        visible={exerciseDetailModalVisible}
        onRequestClose={() => setExerciseDetailModalVisible(false)}>
        <ExerciseDetail
          field="WorkoutScreen"
          id={itemIdforDetail}
          onClose={() => setExerciseDetailModalVisible(false)}
        />
      </Modal>
    </SafeScreen>
  );
};

export default ProgramWorkoutScreen;
