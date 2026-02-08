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
import { Image } from "expo-image";
import { router } from "expo-router";
import dayjs from "dayjs";
import { useWorkout } from "../contexts/WorkoutContext";
import WorkoutScreen from "../(onboarding)/WorkoutScreen";
import * as Haptics from "expo-haptics";
import AnimatedItem from "../animations/AnimatedItem";
import BackgroundView from "./BackgroundView";
import LottieView from "lottie-react-native";
const WorkoutPreview = ({ selectedDate, month, day, dayOfTheWeek }) => {
  // const RestingDefaultMascot =
  //   require("../assets/restingDefaultMascot.svg").default;
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
    (day) => weekdayMap[day],
  );
  console.log("daysForWorkout", plan, UserProfile, hydrated);

  useEffect(() => {
    console.log("daysforworkout", daysForWorkout);
    console.log("dayOfTheWeek", dayOfTheWeek, daysForWorkout);
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
  }, [day, plan]);
  console.log("current exercise", currentExercise);
  console.log("exercises in preview", currentExercise.length);
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
            transition={300}
          />
          <View style={workoutStyles.textContainer}>
            <Text style={styles.defaultText}>{item?.name}</Text>
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
        backgroundColor: "#47b977",
        borderWidth: 2,
        borderColor: "black",
      }}>
      <Text
        style={{ ...styles.defaultText, color: "white", fontWeight: "600" }}>
        Start Workout
      </Text>
    </TouchableOpacity>
    // </AnimatedItem>
    // </View>
  );
  if (!hydrated || !plan) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("../assets/writingloop.json")}
          autoPlay
          loop
          style={{ width: 300, height: 300, marginTop: -200 }}
        />
        <Text style={styles.defaultText}>Writing your plan...</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        width: "100%",
        // backgroundColor: "#1e293b",
      }}>
      {currentExercise[0]?.name !== "Rest Day" ? (
        <Text style={{ ...styles.defaultText, marginTop: 10 }}>
          Today we have {currentExercise.length} exercises
        </Text>
      ) : null}

      {isWorkoutStarting ? (
        <Text style={{ ...styles.defaultText, marginTop: 10 }}>
          Starting in {timerForStart}
        </Text>
      ) : null}
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        visible={workoutModalVisible}
        onRequestClose={() => setWorkoutModalVisible(false)}>
        <WorkoutScreen
          currentExercise={currentExercise}
          selectedDate={dayjs(selectedDate).format("YYYY-MM-DD")}
          setWorkoutModalVisible={setWorkoutModalVisible}
          onClose={() => {
            setWorkoutModalVisible(false);
            setIsWorkoutStarting(false);
            setTimerForStart(3);
          }}
        />
      </Modal>
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
          {/* <RestingDefaultMascot width={300} height={400} /> */}
          <LottieView
            source={require("../assets/o.json")}
            autoPlay
            loop
            style={{ width: 500, height: 350, marginTop: 50 }}
          />
          <Text
            style={{
              ...styles.defaultText,
              marginTop: 10,
              fontFamily: "Nunito-SemiBold",
              fontSize: 16,
              textAlign: "center",
              paddingHorizontal: 20,
            }}>
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
    flexDirection: "row",
    // backgroundColor: "rgba(30, 41, 57, 0.6)",
    //  #161c43ff
    backgroundColor: "#161c43ff",
    padding: 10,
    borderRadius: 15,
    marginTop: 12,
    marginBottom: 25,
    width: "100%",
    shadowColor: "#0e1330ff",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    alignItems: "center",
    overflow: "hidden",
  },
  gifContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 110,
    borderRadius: 16,
    backgroundColor: "#334155",
    marginRight: 18,
    borderWidth: 1,
    borderColor: "#64748b",
    overflow: "hidden",
  },
  exerciseGif: {
    width: 100,
    height: 100,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#1e293b",
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
  exerciseName: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
    letterSpacing: 0.5,
    textShadowColor: "#0ea5e9",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default WorkoutPreview;
