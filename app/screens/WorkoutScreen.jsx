import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
import styles from "../style";
import SafeScreen from "../components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import AiWorkoutAssistant from "../components/AiWorkoutAssistant";
import TimerComponent from "../components/TimerComponent";
import ExerciseDetail from "./ExerciseDetail";
import * as Haptics from "expo-haptics";
import { WorkoutContext } from "../contexts/WorkoutContext";
const WorkoutScreen = ({ setWorkoutModalVisible, currentExercise }) => {
  const [nextWorkoutNumber, setNextWorkoutNumber] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [exerciseDetailModalVisible, showExerciseDetailModal] = useState(false);
  const [completedSets, setCompletedSets] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const { addWorkout } = useContext(WorkoutContext);
  const handleSetComplete = (setNumber) => {
    setWorkoutStarted((prev) => !prev);

    if (setNumber === completedSets + 1) {
      setCompletedSets(setNumber);
    }
    console.log(completedSets, setNumber);
  };
  return (
    <SafeScreen style={styles.Background}>
      <View
        style={{
          ...styles.Background,
          flex: 1,
          display: "flex",
        }}>
        <View>
          <Pressable
            style={{ position: "absolute", top: 0, right: 20, zIndex: 10 }}
            onPress={() => {
              setWorkoutModalVisible(false);
            }}>
            <Ionicons name="close" size={28} color="white" />
          </Pressable>
          <Text style={{ ...styles.defaultText }}>Workout in Progress</Text>
        </View>
        <View
          style={{
            flex: 3,
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              showExerciseDetailModal(true);
            }}>
            <Image
              source={{ uri: currentExercise[nextWorkoutNumber].gif }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: "#1e293b",
                marginTop: 10,
              }}
              contentFit="cover"
              transition={1000}
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            presentationStyle="formSheet"
            visible={exerciseDetailModalVisible}
            onRequestClose={() => showExerciseDetailModal(false)}>
            <ExerciseDetail
              id={currentExercise[nextWorkoutNumber].exerciseId}
              onClose={() => showExerciseDetailModal(false)}
            />
          </Modal>
          {[1, 2, 3].map((setNumber) => {
            const isCompleted = setNumber <= completedSets;
            const isLocked = setNumber > completedSets + 1;
            const isActive = !isCompleted && !isLocked;

            return (
              <Pressable
                key={setNumber}
                onPress={() => {
                  handleSetComplete(setNumber);
                  setTimeLeft(30);
                }}
                disabled={!isActive}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  //   gap: 20,
                }}>
                <View
                  style={{
                    ...styles.workoutGoalButton,
                    width: "100%",
                    backgroundColor: !isActive ? "gray" : "#38d9a9",
                    borderWidth: !isActive ? 0 : 2,
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                  }}>
                  <Text
                    style={{
                      ...styles.defaultText,
                    }}>
                    {setNumber === 1
                      ? "First"
                      : setNumber === 2
                      ? "Second"
                      : "Third"}{" "}
                    set done
                  </Text>
                  <Ionicons name="stopwatch-sharp" size={25} color="white" />
                </View>
              </Pressable>
            );
          })}

          {workoutStarted ? (
            <>
              <TimerComponent
                setWorkoutStarted={setWorkoutStarted}
                workoutStarted={workoutStarted}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
              />
              <BlurView
                intensity={10}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                }}
              />
            </>
          ) : (
            ""
          )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // height: "90%",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            padding: 20,
            marginTop: -50,
          }}>
          <Image
            source={{ uri: currentExercise[nextWorkoutNumber + 1]?.gif }}
            style={{
              width: 150,
              height: 100,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "#1e293b",
              marginTop: 10,
            }}
            contentFit="cover"
            transition={1000}
          />
          <TouchableOpacity
            onPress={() => {
              setNextWorkoutNumber((prev) => prev + 1);
              setCompletedSets(0);
              addWorkout(currentExercise[nextWorkoutNumber]);
            }}>
            <Text
              style={{
                color: "white",
                alignContent: "center",
                textAlign: "center",
                width: "auto",
                // maxWidth: "70%",
                height: "auto",
                marginLeft: 20,
                marginBottom: 10,
                fontSize: 20,
                borderWidth: 2,
                borderColor: "#47b977",
                borderRadius: 10,
                padding: 20,
              }}>
              Next Workout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
};

export default WorkoutScreen;
