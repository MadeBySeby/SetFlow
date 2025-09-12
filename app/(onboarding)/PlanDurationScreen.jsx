import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import style from "../components/style";
import React, { use, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useWorkout } from "../contexts/WorkoutContext";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

import { Calendar } from "react-native-calendars";
import SafeScreen from "../components/SafeScreen";
const PlanDurationScreen = () => {
  const {
    UserProfile,
    setUserProfile,
    updateDailyWorkoutTime,
    updatePlanDuration,
  } = useWorkout();
  const { DailyWorkoutTime, PlanDuration } = UserProfile;
  console.log(UserProfile);
  const [selected, setSelected] = useState({});
  const onDayPress = (day) => {
    console.log(day, "kaka");
    const date = day.dateString;
    let updated = { ...selected };
    if (updated[date]) {
      delete updated[date];
    } else if (Object.keys(updated).length > PlanDuration - 1) {
      alert(`You can only select up to ${PlanDuration} days`);
      return;
    } else {
      updated[date] = {
        selected: true,
        marked: true,
        selectedColor: "#47b977",
      };
      updateDailyWorkoutTime(day.dateString);
      console.log(DailyWorkoutTime, "after add");
    }
    setSelected(updated);
  };
  console.log(UserProfile);

  const handleSubmit = () => {
    router.push("PersonalDetailsScreen");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <SafeScreen style={{ ...style.Background, flex: 1, alignItems: "center" }}>
      <Text style={style.TitleText}>How much free time do you have?</Text>
      {/* <Text
        style={{
          ...style.defaultText,
          marginTop: 20,
          display: "flex",
        }}>
        Daily Workout Time
      </Text>
      <Picker
        style={{ color: "white", width: 200 }}
        dropdownIconColor="white"
        selectedValue={DailyWorkoutTime}
        onValueChange={(itemValue) => {
          updateDailyWorkoutTime(itemValue);
        }}>
        <Picker.Item label="" value="" />

        <Picker.Item label="1 Month" value="60" color="white" />
        <Picker.Item label="3 Months" value="180" color="white" />
        <Picker.Item label="6 Months" value="360" color="white" />
        <Picker.Item label="12 Months" value="720" color="white" />
      </Picker> */}
      <Calendar
        onDayPress={onDayPress}
        markedDates={DailyWorkoutTime.reduce((acc, day) => {
          acc[day] = { selected: true, marked: true, selectedColor: "#47b977" };
          return acc;
        }, {})}
        theme={{
          backgroundColor: "#1e293b",
          calendarBackground: "#1e293b",
          textSectionTitleColor: "white",
          monthTextColor: "white", // top month label
          arrowColor: "white", // navigation arrows
          todayTextColor: "#3b82f6", // today's date
          dayTextColor: "white", // default day numbers
          textDisabledColor: "#64748b", // disabled days
          selectedDayBackgroundColor: "#f97316",
          selectedDayTextColor: "white",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={{
          borderRadius: 15,
          margin: 10,
          elevation: 3,
          shadowColor: "#000",
          borderWidth: 1,
          borderColor: "#47b977",
          shadowOpacity: 0.2,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        }}
      />

      <Text
        style={{
          ...style.defaultText,
          marginTop: 20,
          display: "flex",
        }}>
        Plan Duration
      </Text>
      <Picker
        style={{ color: "white", width: 200 }}
        dropdownIconColor="white"
        selectedValue={PlanDuration}
        onValueChange={(itemValue) => {
          updatePlanDuration(itemValue);
        }}>
        <Picker.Item label="" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
      </Picker>
      {PlanDuration && (
        <Pressable style={style.workoutGoalButton} onPress={handleSubmit}>
          <Text style={style.defaultText}>Submit</Text>
        </Pressable>
      )}
    </SafeScreen>
  );
};

export default PlanDurationScreen;

const styles = StyleSheet.create({});
