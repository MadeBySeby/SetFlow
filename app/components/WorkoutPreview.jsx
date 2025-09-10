import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import styles from "../style";
import { getAllExercises } from "../api/exercises";
import { Image } from "expo-image";
import SafeScreen from "./SafeScreen";
import { useNavigation } from "expo-router";
import ExerciseDetail from "../screens/ExerciseDetail";
import ScreenOne from "../screens/ScreenOne";
import { useWorkout } from "../contexts/WorkoutContext";
import WorkoutScreen from "../screens/WorkoutScreen";
import * as Haptics from "expo-haptics";
const WorkoutPreview = ({ month, day }) => {
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [timerForStart, setTimerForStart] = useState(3);
  const [isWorkoutStarting, setIsWorkoutStarting] = useState(false);
  console.log("plan in preview", plan);
  const { plan, UserProfile, hydrated } = useWorkout();

  if (!hydrated || !plan || !UserProfile.level) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Loading...</Text>
      </View>
    );
  }

  useEffect(() => {
    getAllExercises().then((data) => setExercises(data.data));
  }, [month, day]);
  useEffect(() => {
    let newDay = day > 7 ? day - 7 : day;
    let dayKey = `day${newDay}`;
    setCurrentExercise(plan[day > 7 ? "week2" : "week1"][dayKey] || []);
  }, [exercises, day]);
  console.log("current exercise", currentExercise);
  console.log("exercises in preview", exercises.length);
  const renderExercise = ({ item, index }) => {
    return (
      <View style={workoutStyles.exerciseItem}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ExerciseDetail", {
              exerciseId: item?.exerciseId,
            });
          }}
          style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: item?.gif }}
            style={workoutStyles.exerciseGif}
            contentFit="cover"
            transition={1000}
          />
          <View style={workoutStyles.textContainer}>
            <Text style={[styles.defaultText, workoutStyles.exerciseName]}>
              {item?.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    if (!isWorkoutStarting) return;

    let timer = setInterval(() => {
      setTimerForStart((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsWorkoutStarting(false);
          setWorkoutModalVisible(true);
          return 0;
        }
        return prev - 1;
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, 1000);

    return () => clearInterval(timer);
  }, [isWorkoutStarting]);
  const footerComponent = () => (
    // <View style={{ height: 100, width: "100%" }}>
    <TouchableOpacity
      onPress={() => {
        setTimerForStart(3);
        setIsWorkoutStarting(true);
        // setTimeout(() => {
        //   setWorkoutModalVisible(true);
        // }, 3000);
      }}
      style={{
        ...styles.workoutGoalButton,
      }}>
      <Text
        style={{ ...styles.defaultText, color: "white", fontWeight: "600" }}>
        Start Workout
      </Text>
    </TouchableOpacity>
    // </View>
  );
  if (exercises.length < 1)
    return (
      <Text style={{ ...styles.TitleText, marginTop: 20 }}>Loading...</Text>
    );

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        width: "100%",
        backgroundColor: "#1e293b",
      }}>
      <Text style={{ ...styles.defaultText, marginTop: 10 }}>
        Workout for {month}/{day}
      </Text>
      {isWorkoutStarting ? (
        <Text style={{ ...styles.defaultText, marginTop: 10 }}>
          Starting in {timerForStart}
        </Text>
      ) : null}
      <Modal
        animationType="slide"
        presentationStyle="fullScreen"
        visible={workoutModalVisible}
        onRequestClose={() => setWorkoutModalVisible(false)}>
        <WorkoutScreen
          currentExercise={currentExercise}
          setWorkoutModalVisible={setWorkoutModalVisible}
          onClose={() => {
            setWorkoutModalVisible(false);
            setIsWorkoutStarting(false);
            setTimerForStart(3);
          }}
        />
      </Modal>
      {console.log("currentExercise", currentExercise.length)}
      {currentExercise[0]?.name !== "Rest Day" ? (
        <>
          <FlatList
            data={currentExercise || []}
            renderItem={renderExercise}
            keyExtractor={(item, index) => `exercise-${index}`}
            style={workoutStyles.flatList}
            contentContainerStyle={{
              ...workoutStyles.flatListContent,
              //   paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
            bounces={true}
            scrollEventThrottle={16}
            ListFooterComponent={footerComponent}
          />
        </>
      ) : (
        <Text style={styles.defaultText}>Rest Day</Text>
      )}
    </View>
  );
};

const workoutStyles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: "100%",
  },
  flatListContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    width: "100%",
  },
  exerciseItem: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#334155",
    padding: 10,
    borderRadius: 15,
    marginTop: 15,
    // marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    width: "100%",
    paddingHorizontal: 10,
  },
  gifContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: 100,
    height: 100,
  },
  exerciseGif: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#1e293b",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    marginTop: 12,
    marginLeft: 20,
  },
  exerciseName: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default WorkoutPreview;
