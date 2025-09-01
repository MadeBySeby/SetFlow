import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SafeScreen from "../components/SafeScreen";

const ScreenOne = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const handleSelectGoal = (goal) => {
    setSelectedGoal(goal);
    navigation.navigate("ScreenTwo");
  };
  const navigation = useNavigation();
  return (
    <SafeScreen style={{ backgroundColor: "black", height: "100%" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 25 }}>
          Select Your {"\n"} Workout Goal
        </Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate("ScreenTwo")}> */}
        <Text
          onPress={() => handleSelectGoal("Muscle Gain")}
          style={styles.workoutGoalButton}>
          Muscle Gain
        </Text>
        <Text
          onPress={() => handleSelectGoal("Weight Loss")}
          style={styles.workoutGoalButton}>
          Weight Loss
        </Text>
        <Text
          onPress={() => handleSelectGoal("Endurance")}
          style={styles.workoutGoalButton}>
          Endurance
        </Text>
        {/* </TouchableOpacity> */}
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  workoutGoalButton: {
    width: "300",
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    color: "white",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    boxShadow: "0 4px 6px rgba(222, 222, 222, 0.1)",
  },
});
export default ScreenOne;
