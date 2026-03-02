import dayjs from "dayjs";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WorkoutScreen from "../(onboarding)/WorkoutScreen";
import ExerciseDetail from "../ExerciseDetail";
import { useWorkout } from "../contexts/WorkoutContext";
import styles from "./style";

const weekdayMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const WorkoutPreview = ({ selectedDate, month, day, dayOfTheWeek }) => {
  // const RestingDefaultMascot =
  //   require("../assets/restingDefaultMascot.svg").default;
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState([]);
  const [timerForStart, setTimerForStart] = useState(3);
  const [isWorkoutStarting, setIsWorkoutStarting] = useState(false);
  const [exerciseDetailModalVisible, setExerciseDetailModalVisible] =
    useState(false);
  const [currentExerciseID, setCurrentExerciseID] = useState(null);
  const { plan, UserProfile, hydrated } = useWorkout() || {};
  const { t } = useTranslation();
  const language = UserProfile?.language || "en";
  const PlanDuration = UserProfile?.PlanDuration || 0;

  console.log("UserProfile in preview", UserProfile?.DailyWorkoutTime);

  const daysForWorkout = useMemo(() => {
    return (UserProfile?.DailyWorkoutTime || []).map((day) => weekdayMap[day]);
  }, [UserProfile?.DailyWorkoutTime]);
  console.log("daysForWorkout", plan, UserProfile, hydrated);

  useEffect(() => {
    console.log("daysforworkout", daysForWorkout);
    console.log("dayOfTheWeek", dayOfTheWeek, daysForWorkout);
  }, [month, day, dayOfTheWeek, daysForWorkout]);

  useEffect(() => {
    if (!plan || plan.length === 0) {
      setCurrentExercise([{ name: t("restDayName") }]);
      return;
    }

    const weekIndex = Math.floor((day - 1) / 7) % plan.length;
    const dayIndex = daysForWorkout.indexOf(dayOfTheWeek);

    if (dayIndex === -1 || dayIndex >= PlanDuration) {
      setCurrentExercise([{ name: t("restDayName") }]);
      console.log("Today is a Rest Day");
      return;
    }

    const currentDayKey = dayIndex + 1;
    const exercisesForDay = plan[weekIndex]?.[currentDayKey] || [
      { name: t("restDayName") },
    ];
    setCurrentExercise(exercisesForDay);

    console.log(
      "Workout Day:",
      currentDayKey,
      "Week Index:",
      weekIndex,
      exercisesForDay,
    );
  }, [day, plan, dayOfTheWeek, daysForWorkout, PlanDuration, t]);
  console.log("current exercise", currentExercise);
  console.log("exercises in preview", currentExercise.length);
  const renderExercise = ({ item, index }) => {
    return (
      //   <AnimatedItem index={index}>
      <View style={workoutStyles.exerciseItem}>
        <TouchableOpacity
          onPress={() => {
            console.log("item pressed", item);
            setCurrentExerciseID(item?.exerciseId);
            setExerciseDetailModalVisible(true);
          }}
          style={{ flexDirection: "row", flex: 1 }}>
          <Image
            source={{ uri: item?.gif }}
            style={workoutStyles.exerciseGif}
            contentFit="cover"
            transition={300}
          />
          <View style={workoutStyles.textContainer}>
            <Text style={workoutStyles.exerciseName}>
              {language === "ka" && item?.name_ka ? item.name_ka : item?.name}
            </Text>
            <View style={workoutStyles.detailsRow}>
              {item?.sets && (
                <View style={workoutStyles.badge}>
                  <Text style={workoutStyles.badgeText}>
                    {item.sets} {t("sets")}
                  </Text>
                </View>
              )}
              {item?.reps && (
                <View
                  style={[workoutStyles.badge, { backgroundColor: "#334155" }]}>
                  <Text style={workoutStyles.badgeText}>
                    {item.reps} {typeof item.reps === "number" ? t("reps") : ""}
                  </Text>
                </View>
              )}
              {item?.weight && (
                <View
                  style={[workoutStyles.badge, { backgroundColor: "#47b977" }]}>
                  <Text style={workoutStyles.badgeText}>{item.weight}</Text>
                </View>
              )}
            </View>
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
        {t("startWorkout")}
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
        <Text style={styles.defaultText}>{t("writingPlan")}</Text>
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
      {currentExercise[0]?.name !== t("restDayName") ? (
        <Text style={{ ...styles.defaultText, marginTop: 10 }}>
          {t("todayWorkout", { count: currentExercise.length })}
        </Text>
      ) : null}

      {isWorkoutStarting ? (
        <Text style={{ ...styles.defaultText, marginTop: 10 }}>
          {t("startingIn", { seconds: timerForStart })}
        </Text>
      ) : null}
      <Modal
        animationType="slide"
        presentationStyle="fullScreen"
        visible={exerciseDetailModalVisible}
        onRequestClose={() => setExerciseDetailModalVisible(false)}>
        <ExerciseDetail
          field="WorkoutPreview"
          id={currentExerciseID}
          onClose={() => setExerciseDetailModalVisible(false)}
        />
      </Modal>

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
      {currentExercise[0]?.name !== t("restDayName") ? (
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
            {t("restDay")}
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
    paddingLeft: 12,
  },
  exerciseName: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "600",
    color: "#f1f5f9",
    textTransform: "capitalize",
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
  },
});

export default WorkoutPreview;
