import { Pressable, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import SafeScreen from "../components/SafeScreen";
import styles from "../components/style";

import CalendarStrip from "react-native-calendar-strip";
import WorkoutPreview from "../components/WorkoutPreview";
import dayjs from "dayjs";
import { useWorkout } from "../contexts/WorkoutContext";
import { Redirect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);
  const { isOnboardingCompleted } = useWorkout();
  const insets = useSafeAreaInsets();
  const date = new Date(selectedDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfTheWeek = date.getDay();
  const {
    workoutHistory,
    clearWorkoutData,
    setRestartWorkoutValue,
    restartWorkoutValue,
  } = useWorkout();
  const selectedDateISO = useMemo(
    () => dayjs(selectedDate).format("YYYY-MM-DD"),
    [selectedDate],
  );
  // console.log("selectedDateISO", workoutHistory);

  const isWorkoutDoneToday = workoutHistory.some(
    (w) => w?.date === selectedDateISO && w?.type != "Programs",
  );

  // if (isWorkoutDoneToday) {
  //   return (
  //     <SafeScreen style={styles.Background}>
  //       <View>
  //         <Text
  //           style={{
  //             ...styles.defaultText,
  //             fontSize: 20,
  //             textAlign: "center",
  //             marginTop: 50,
  //           }}>
  //           You have already completed your workout for today! Great job!
  //         </Text>
  //       </View>
  //     </SafeScreen>
  //   );
  // }

  return (
    <SafeScreen
      excludeBottomSafeArea={false}
      style={{ ...styles.Background, flex: 1 }}>
      <View
        style={{
          ...styles.Background,
          flex: 1,
          height: "100%",
          width: "100%",
          maxWidth: "100%",
        }}>
        <CalendarStrip
          scrollable
          style={{
            height: 100,
            marginTop: -Math.min(22, insets.top / 3),
            paddingTop: 0,
            paddingBottom: 0,
          }}
          calendarColor={"transparent"}
          highlightDateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "white" }}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          iconContainer={{ flex: 0.1 }}
          minDate={today}
          // maxDate={today.add(30, "day")}
          onDateSelected={(date) => {
            setSelectedDate(date);
          }}
          selectedDate={selectedDate}
          daySelectionAnimation={{
            type: "background",
            duration: 100,
            highlightColor: "#47b977",
            borderWidth: 10,
            borderHighlightColor: "red",
          }}
          showMonth={false}
          scrollToOnSelect={false}
          scrollerPaging={true}
          startingDate={today}
        />
        {!isWorkoutDoneToday || restartWorkoutValue ? (
          <WorkoutPreview
            selectedDate={selectedDate}
            month={month}
            day={day}
            dayOfTheWeek={dayOfTheWeek}
          />
        ) : (
          <View
            style={{
              alignItems: "center",
              flex: 1,
              // justifyContent: "center",
              flexDirection: "column",
              marginTop: 0,
            }}>
            <Text
              style={{
                ...styles.defaultText,
                fontSize: 20,

                paddingHorizontal: 10,
                textAlign: "center",
              }}>
              You have already completed your workout for today! Great job!👏
            </Text>
            <Pressable>
              <Text
                style={{
                  ...styles.workoutGoalButton,
                  width: 200,
                  // alignContent: "center",
                  textAlign: "center",
                  // display: "flex",
                  // justifyContent: "center",
                  marginTop: 20,
                  fontSize: 16,
                }}
                onPress={() => {
                  setRestartWorkoutValue(true);
                }}>
                Restart Workout
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
