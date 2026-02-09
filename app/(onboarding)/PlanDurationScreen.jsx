import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import style from "../components/style";
import React, { use, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useWorkout } from "../contexts/WorkoutContext";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

import { Calendar } from "react-native-calendars";
import SafeScreen from "../components/SafeScreen";
import AnimatedItem from "../animations/AnimatedItem";
import ButtonAnimation from "../animations/ButtonAnimation";
import * as Animatable from "react-native-animatable";
import Animated, {
  FadeIn,
  FadeInUp,
  ZoomIn,
  ZoomInDown,
  ZoomInEasyDown,
  ZoomOut,
} from "react-native-reanimated";
import PrimaryCTAButton from "../components/PrimaryCTAButton";
const PlanDurationScreen = () => {
  const {
    UserProfile,
    setUserProfile,
    updateDailyWorkoutTime,
    updatePlanDuration,
    clearDailyWorkoutTime,
  } = useWorkout();
  const { DailyWorkoutTime, PlanDuration } = UserProfile;
  const weekdays = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ];
  const weekdayValues = weekdays.map((day) => day.value);
  const pickerTextColor = style?.defaultText?.color ?? "#ffffff";

  const handleSubmit = () => {
    router.push("PersonalDetailsScreen");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <SafeScreen
      excludeBottomSafeArea={true}
      style={{
        ...style.Background,
        flex: 1,
        alignItems: "center",
        width: "100%",
        display: "flex",
        paddingTop: 30,
        // justifyContent: "space-evenly",
      }}>
      <AnimatedItem Screen={"PlanDurationScreen"}>
        <Text style={{ ...style.TitleText, marginTop: 0, padding: 10 }}>
          How many days you want to workout per week?
        </Text>

        <Picker
          style={{ color: pickerTextColor, width: "80%", textAlign: "center" }}
          dropdownIconColor={pickerTextColor}
          itemStyle={{ color: pickerTextColor }}
          mode="dropdown"
          selectedValue={PlanDuration}
          onValueChange={(itemValue) => {
            updatePlanDuration(itemValue);
            if (itemValue === "7") {
              setUserProfile((prev) => ({
                ...prev,
                DailyWorkoutTime: weekdayValues,
              }));
            } else {
              clearDailyWorkoutTime();
            }
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}>
          <Picker.Item label="Select Days" value="" color={pickerTextColor} />
          <Picker.Item label="1 Day" value="1" color={pickerTextColor} />
          <Picker.Item label="2 Days" value="2" color={pickerTextColor} />
          <Picker.Item label="3 Days" value="3" color={pickerTextColor} />
          <Picker.Item label="4 Days" value="4" color={pickerTextColor} />
          <Picker.Item label="5 Days" value="5" color={pickerTextColor} />
          <Picker.Item label="6 Days" value="6" color={pickerTextColor} />
          <Picker.Item label="Every Day" value="7" color={pickerTextColor} />
        </Picker>

        {PlanDuration && PlanDuration !== "7" && (
          <Animated.Text
            entering={ZoomInEasyDown.duration(200)}
            style={{ ...style.defaultText, marginTop: 50 }}>
            Select up to {PlanDuration} workout days
          </Animated.Text>
        )}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap-reverse",
            marginTop: 10,
            padding: 10,
          }}>
          {weekdays.map((day) => {
            const isEveryDay = PlanDuration === "7";
            const isSelected =
              isEveryDay || DailyWorkoutTime.includes(day.value);
            return (
              <ButtonAnimation clicked={isSelected} key={day.value}>
                <Pressable
                  key={day.value}
                  onPress={() => {
                    if (isEveryDay) return;
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

                    if (isSelected) {
                      updateDailyWorkoutTime(day.value);
                    } else if (DailyWorkoutTime.length < PlanDuration) {
                      updateDailyWorkoutTime(day.value);
                    } else {
                      alert(`You can only select up to ${PlanDuration} days`);
                    }
                  }}
                  style={{
                    padding: 10,
                    margin: 5,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#47b977",
                    backgroundColor: isSelected ? "#47b977" : "transparent",
                  }}>
                  <Text style={{ color: isSelected ? "white" : "#47b977" }}>
                    {day.label}
                  </Text>
                </Pressable>
              </ButtonAnimation>
            );
          })}
        </View>

        {PlanDuration && DailyWorkoutTime?.find((day) => day) && (
          <PrimaryCTAButton
            style={{ alignSelf: "center", marginTop: 50 }}
            label="Continue"
            onPress={handleSubmit}
          />
        )}
      </AnimatedItem>
    </SafeScreen>
  );
};

export default PlanDurationScreen;
