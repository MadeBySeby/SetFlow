import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import SafeScreen from "../components/SafeScreen";
import styles from "../components/style";
import TimerComponent from "../components/TimerComponent";
import { useWorkout } from "../contexts/WorkoutContext";
import ExerciseDetail from "../ExerciseDetail";
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
  const {
    addWorkout,
    setRestartWorkoutValue,
    restartWorkoutValue,
    UserProfile,
  } = useWorkout();
  const { t } = useTranslation();
  const language = UserProfile?.language || "en";
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
          {t("workout", {
            current: nextWorkoutNumber + 1,
            total: currentExercise.length,
          })}
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
            <Text style={workoutStyles.exerciseDetails}>
              {t("reps")}: {currentExercise[nextWorkoutNumber].reps}
              {currentExercise[nextWorkoutNumber].weight
                ? `  |  ${t("weight")}: ${currentExercise[nextWorkoutNumber].weight}`
                : ""}
            </Text>
            <Text
              style={{
                ...styles.defaultText,
                opacity: 0.7,
                marginTop: 4,
                textTransform: "capitalize",
              }}>
              {language === "ka" && currentExercise[nextWorkoutNumber].name_ka
                ? currentExercise[nextWorkoutNumber].name_ka
                : currentExercise[nextWorkoutNumber].name}
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
              },
            )}
          </ScrollView>

          {workoutStarted ? (
            <>
              <View
                style={{
                  position: "absolute",
                  // top: "-10%",
                  left: "25%",
                  // right: "50%",
                  // bottom: "50%",
                  // transform: [{ translateX: -150 }, { translateY: -100 }],
                  // backgroundColor: "rgba(52, 52, 52, 0.7)",
                  borderRadius: 20,
                  zIndex: 999,
                  // width: "100%",
                  // height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      ...styles.TitleText,
                      color: "#47b977",
                      marginBottom: phase === "rest" ? 10 : 0,
                      textAlign: "center",
                      textShadowColor: "rgba(0, 0, 0, 0.9)",
                      textShadowOffset: { width: 1, height: 2 },
                      textShadowRadius: 10,
                    }}>
                    {phase === "exercise"
                      ? timeLeft > 0 && timeLeft < 15
                        ? "LAST SECONDS AMIGOO!"
                        : "Keep Going!"
                      : "Rest Time!"}
                  </Text>

                  {phase === "rest" && (
                    <LottieView
                      source={require("../assets/o.json")}
                      autoPlay
                      loop
                      style={{
                        width: 200,
                        height: 200,
                      }}
                    />
                  )}
                </View>
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
                Haptics.NotificationFeedbackType.Success,
              );
              const finalHistory = [
                ...exerciseForHistory,
                currentExercise[nextWorkoutNumber],
              ];
              setExerciseForHistory(finalHistory);

              if (!restartWorkoutValue) {
                addWorkout(finalHistory, selectedDate, type);
              }

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

const workoutStyles = StyleSheet.create({
  exerciseDetails: {
    ...styles.defaultText,
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#47b977",
  },
});

export default WorkoutScreen;
