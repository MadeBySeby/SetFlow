import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
import styles from "../components/style";
import SafeScreen from "../components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import TimerComponent from "../components/TimerComponent";
import ExerciseDetail from "../ExerciseDetail";
import LottieView from "lottie-react-native";
import * as Haptics from "expo-haptics";
import { useWorkout } from "../contexts/WorkoutContext";
import * as Progress from "react-native-progress";
import { Sound } from "expo-av/build/Audio";
const WorkoutScreen = ({
  selectedDate,
  setWorkoutModalVisible,
  currentExercise,
  restSec,
  type = "Normal",
}) => {
  const [nextWorkoutNumber, setNextWorkoutNumber] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [exerciseDetailModalVisible, showExerciseDetailModal] = useState(false);
  const [completedSets, setCompletedSets] = useState(0);
  const [animationShow, setAnimationShow] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const { addWorkout, setRestartWorkoutValue, restartWorkoutValue } =
    useWorkout();
  const [exerciseForHistory, setExerciseForHistory] = useState([]);
  const handleSetComplete = (setNumber) => {
    if (setNumber === completedSets + 1) {
      setCompletedSets(setNumber);
    }
  };
  return (
    <SafeScreen style={styles.Background}>
      <View
        style={{
          ...styles.Background,
          flex: 1,
          display: "flex",
        }}>
        <Text style={{ ...styles.defaultText }}>
          Workout {nextWorkoutNumber + 1} of {currentExercise.length}
        </Text>
        <View>
          <Pressable
            style={{ position: "absolute", top: 0, right: 20, zIndex: 10 }}
            onPress={() => {
              setWorkoutModalVisible(false);
            }}>
            <Ionicons name="close" size={28} color="white" />
          </Pressable>
          <Progress.Bar
            style={{ marginTop: 10, alignSelf: "center" }}
            progress={
              completedSets / currentExercise[nextWorkoutNumber].sets || 0
            }
            width={200}
            color="#47b977"
          />
        </View>
        <View
          style={{
            flex: 3,
            padding: 20,
          }}>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
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
                borderColor: "black",
                marginTop: 10,
              }}
              contentFit="cover"
              transition={100}
            />
            <Text style={{ ...styles.defaultText, marginTop: 10 }}>
              Reps: {currentExercise[nextWorkoutNumber].reps}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            presentationStyle="fullScreen"
            visible={exerciseDetailModalVisible}
            onRequestClose={() => showExerciseDetailModal(false)}>
            <ExerciseDetail
              field="WorkoutScreen"
              id={currentExercise[nextWorkoutNumber].exerciseId}
              onClose={() => showExerciseDetailModal(false)}
            />
          </Modal>
          <ScrollView>
            {[...Array(currentExercise[nextWorkoutNumber].sets)].map(
              (_, index) => {
                const setNumber = index + 1;
                const isCompleted = setNumber <= completedSets;
                const isLocked = setNumber > completedSets + 1;
                const isActive = !isCompleted && !isLocked;

                return (
                  <Pressable
                    key={setNumber}
                    onPress={() => {
                      handleSetComplete(setNumber);
                      if (type === "Programs") {
                        setPhase("exercise");
                        setTimeLeft(currentExercise[nextWorkoutNumber].reps);
                        setWorkoutStarted(true);
                      } else {
                        setPhase("rest");
                        setTimeLeft(30);
                        setWorkoutStarted(true);
                      }
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
                        backgroundColor: !isActive ? "gray" : "#47b977",
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
                        {type === "Programs"
                          ? `Start Set ${setNumber}`
                          : `Set ${setNumber} Done`}
                      </Text>
                      <Ionicons
                        name="stopwatch-sharp"
                        size={25}
                        color="white"
                      />
                    </View>
                  </Pressable>
                );
              }
            )}
          </ScrollView>

          {workoutStarted ? (
            <>
              <View
                style={{
                  // backgroundColor: "#0B1026",
                  // borderWidth: 1,
                  // borderColor: "#47b977",
                  position: "absolute",
                  // top: "10%",
                  // left: "50%",
                  // transform: [{ translateX: "-0%" }],
                  width: 200,
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  zIndex: 999,
                  display: "flex",
                  justifyContent: "center",
                  display: "flex",
                  // alignItems: "center",
                }}>
                <Text
                  style={{
                    ...styles.TitleText,
                    paddingHorizontal: 16,
                    paddingVertical: 6,
                    borderRadius: 12,
                    color: "#47b977",
                    textShadowColor: "rgba(0, 0, 0, 0.9)",
                    textShadowOffset: { width: 1, height: 2 },
                    textShadowRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 10,
                  }}>
                  {phase === "exercise"
                    ? timeLeft > 0 && timeLeft < 15
                      ? "LAST SECONDS AMIGOO!"
                      : "Keep Going!"
                    : "Rest Time! !"}
                  {phase === "rest" && (
                    <LottieView
                      source={require("../assets/o.json")}
                      autoPlay
                      loop
                      style={{
                        width: 200,
                        height: 200,
                        // alignSelf: "center",
                        // alignContent: "center",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // position: "absolute",
                        // top: "50%",
                        // left: "50%",
                        // transform: [{ translateX: -50 }, { translateY: -50 }],
                      }}
                    />
                  )}
                </Text>
              </View>
              <TimerComponent
                setWorkoutStarted={setWorkoutStarted}
                workoutStarted={workoutStarted}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                type={type}
                restSec={restSec}
                onComplete={() => {
                  if (type === "Programs") {
                    if (phase === "exercise") {
                      setPhase("rest");
                      setTimeLeft(restSec);
                      setWorkoutStarted(true);
                    } else if (phase === "rest") {
                      setPhase("idle");
                      setWorkoutStarted(false);
                    }
                  } else {
                    setPhase("idle");
                    setWorkoutStarted(false);
                  }
                }}
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

        {nextWorkoutNumber < currentExercise.length - 1 ? (
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
              disabled={
                completedSets !== currentExercise[nextWorkoutNumber]?.sets
              }
              onPress={() => {
                setNextWorkoutNumber((prev) => prev + 1);
                setCompletedSets(0);
                // addWorkout(currentExercise[nextWorkoutNumber]);
                setExerciseForHistory((prev) => [
                  ...prev,
                  currentExercise[nextWorkoutNumber],
                ]);
              }}>
              <Text
                style={{
                  color: "white",
                  disabled:
                    completedSets !== currentExercise[nextWorkoutNumber]?.sets,
                  opacity:
                    completedSets === currentExercise[nextWorkoutNumber]?.sets
                      ? 1
                      : 0.5,
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
        ) : (
          <Pressable
            style={{ ...styles.workoutGoalButton, alignSelf: "center" }}
            disabled={completedSets !== currentExercise[nextWorkoutNumber].sets}
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );

              setExerciseForHistory((prev) => [
                ...prev,
                currentExercise[nextWorkoutNumber],
              ]);

              !restartWorkoutValue
                ? addWorkout(exerciseForHistory, selectedDate, type)
                : null;

              setWorkoutModalVisible(false);

              setNextWorkoutNumber(0);
              setCompletedSets(0);
              setRestartWorkoutValue(false);
              setAnimationShow(true);
            }}>
            <Text
              style={{
                ...styles.defaultText,
                opacity:
                  completedSets === currentExercise[nextWorkoutNumber].sets
                    ? 1
                    : 0.5,
              }}>
              Finish Workout
            </Text>
          </Pressable>
        )}
      </View>
    </SafeScreen>
  );
};

export default WorkoutScreen;
