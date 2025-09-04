import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SafeScreen from "../components/SafeScreen";
import { useWorkout } from "../contexts/WorkoutContext";
import * as Haptics from "expo-haptics";

import style from "../style";
const ScreenOne = () => {
  const { updateGoal } = useWorkout();
  const goals = ["Muscle Gain", "Weight Loss", "Endurance"];
  const handleSelectGoal = (goal) => {
    updateGoal(goal);
    navigation.navigate("ScreenTwo");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  const navigation = useNavigation();
  return (
    <SafeScreen style={style.Background}>
      <View style={{ alignItems: "center" }}>
        <Text style={style.TitleText}>Select Your {"\n"} Workout Goal</Text>
        {goals.map((goal) => (
          <Pressable
            key={goal}
            onPress={() => handleSelectGoal(goal)}
            style={style.workoutGoalButton}>
            <Text style={style.defaultText}>{goal}</Text>
          </Pressable>
        ))}
      </View>
    </SafeScreen>
  );
};

export default ScreenOne;
