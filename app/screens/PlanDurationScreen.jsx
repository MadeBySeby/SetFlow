import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import style from "../style";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useWorkout } from "../contexts/WorkoutContext";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
  const handleSubmit = () => {
    navigation.navigate("PersonalDetailsScreen");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <SafeScreen style={{ ...style.Background, flex: 1, alignItems: "center" }}>
      <Text style={style.TitleText}>How much free time do you have?</Text>
      <Text
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
      </Picker>

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
      {PlanDuration && DailyWorkoutTime && (
        <Pressable style={style.workoutGoalButton} onPress={handleSubmit}>
          <Text style={style.defaultText}>Submit</Text>
        </Pressable>
      )}
    </SafeScreen>
  );
};

export default PlanDurationScreen;

const styles = StyleSheet.create({});
