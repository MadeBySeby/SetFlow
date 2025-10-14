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
import styles from "./style";
import { getAllExercises } from "../api/exercises";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useWorkout } from "../contexts/WorkoutContext";
import WorkoutScreen from "../(onboarding)/WorkoutScreen";
import * as Haptics from "expo-haptics";
import AnimatedItem from "../animations/AnimatedItem";
import RestingDefaultMascot from "../assets/restingDefaultMascot.svg";
const WorkoutPreview = ({ month, day, dayOfTheWeek }) => {
  const [exercises, setExercises] = useState([]);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState([]);
  const [timerForStart, setTimerForStart] = useState(3);
  const [isWorkoutStarting, setIsWorkoutStarting] = useState(false);
  const { plan, UserProfile, hydrated } = useWorkout() || {};
  const PlanDuration = UserProfile?.PlanDuration || 0;

  console.log("UserProfile in preview", UserProfile?.DailyWorkoutTime);

  const weekdayMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  let daysForWorkout = (UserProfile?.DailyWorkoutTime).map(
    (day) => weekdayMap[day]
  );
  console.log("daysForWorkout", plan, UserProfile, hydrated);

  if (!hydrated || !plan) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Loading...</Text>
      </View>
    );
  }
  console.log("plan in preview", plan);
  useEffect(() => {
    console.log("daysforworkout", daysForWorkout);
    console.log("dayOfTheWeek", dayOfTheWeek, daysForWorkout);
    getAllExercises().then((data) => setExercises(data.data));
  }, [month, day]);

  useEffect(() => {
    if (!plan || plan.length === 0) {
      setCurrentExercise([{ name: "Rest Day" }]);
      return;
    }

    const currentWeekKey = day / 7 > 1 ? "week2" : "week1";

    const dayIndex = daysForWorkout.indexOf(dayOfTheWeek);

    if (dayIndex === -1 || dayIndex >= PlanDuration) {
      setCurrentExercise([{ name: "Rest Day" }]);
      console.log("Today is a Rest Day");
      return;
    }

    const currentDayKey = `day${dayIndex + 1}`;
    const exercisesForDay = plan[currentWeekKey]?.[currentDayKey] || [
      { name: "Rest Day" },
    ];
    setCurrentExercise(exercisesForDay);

    console.log("Workout Day:", currentDayKey, exercisesForDay);
  }, [exercises, day, plan]);
  console.log("current exercise", currentExercise);
  console.log("exercises in preview", exercises.length);
  const renderExercise = ({ item, index }) => {
    return (
      //   <AnimatedItem index={index}>
      <View style={workoutStyles.exerciseItem}>
        <TouchableOpacity
          onPress={() => {
            console.log("item pressed", item);
            router.push({
              pathname: "/LevelScreen",
              params: {
                exerciseId: item?.exerciseId,
              },
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
      //   </AnimatedItem>
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
    // <AnimatedItem>
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
    // </AnimatedItem>
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
      {currentExercise[0]?.name !== "Rest Day" ? (
        <Text style={{ ...styles.defaultText, marginTop: 10 }}>
          Workout for {month}/{day}
        </Text>
      ) : null}

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
        <>
          <RestingDefaultMascot width={300} height={400} />
          <Text style={{ ...styles.defaultText, marginTop: 10 }}>
            Today you can chill ...
          </Text>
        </>
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
