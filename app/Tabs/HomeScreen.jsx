import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import SafeScreen from "../components/SafeScreen";
import styles from "../style";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";
import { useWorkout } from "../contexts/WorkoutContext";
import AiWorkoutAssistant from "../components/AiWorkoutAssistant";
import { searchExercises } from "../api/exercises";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CalendarStrip from "react-native-calendar-strip";
import WorkoutPreview from "../components/WorkoutPreview";
import dayjs from "dayjs";

const HomeScreen = () => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);
  const date = new Date(selectedDate);
  const month = date.getMonth() + 1; // +1 because getMonth() returns 0-11
  const day = date.getDate();
  return (
    <SafeScreen
      excludeBottomSafeArea={true}
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
          style={{ height: 100, paddingTop: 30, paddingBottom: 0 }}
          calendarColor="#2d3748"
          highlightDateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "white" }}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          iconContainer={{ flex: 0.1 }}
          // minDate={today}
          // maxDate={today.add(30, "day")}
          onDateSelected={(date) => {
            setSelectedDate(date);
          }}
          selectedDate={selectedDate}
          daySelectionAnimation={{
            type: "background",
            duration: 100,
            highlightColor: "#38d9a9",
          }}
          showMonth={false}
          scrollToOnSelect={false}
          scrollerPaging={true}
          startingDate={today}
        />
        <WorkoutPreview month={month} day={day} />
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
