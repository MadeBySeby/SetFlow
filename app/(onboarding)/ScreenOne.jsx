import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { useWorkout } from "../contexts/WorkoutContext";
import * as Haptics from "expo-haptics";
import svg, { Path } from "react-native-svg";
import style from "../components/style";
import { Button } from "@react-navigation/elements";
import BoardingButtons from "../components/BoardingButtons";
import AnimatedItem from "../animations/AnimatedItem";
import { Audio } from "expo-av";
import DuolingoLikeMascotOnScale from "../components/Mascot";
import ButtonAnimation from "../animations/ButtonAnimation";
import PrimaryCTAButton from "../components/PrimaryCTAButton";
const ScreenOne = () => {
  const { updateGoal, UserProfile } = useWorkout();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const goals = ["Muscle Gain", "Weight Loss", "Endurance"];
  const [clicked, setClicked] = useState(false);

  const handleSelectGoal = (goal) => {
    if (goal === "Muscle Gain") goal = "muscleGain";
    if (goal === "Weight Loss") goal = "weightLoss";
    if (goal === "Endurance") goal = "endurance";
    updateGoal(goal);
    setClicked(true);
    if (selectedGoal === goal) {
      setSelectedGoal(null);
    } else {
      setSelectedGoal(goal);
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeScreen style={style.Background}>
      <AnimatedItem Screen={"ScreenOne"}>
        <Text style={{ ...style.TitleText, textAlign: "center" }}>
          Select Your{"\n"}Workout Goal
        </Text>
        <View
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            gap: 20,
          }}>
          {goals.map((goal) => {
            const isSelected =
              selectedGoal?.toLowerCase().replace(/\s/g, "") ===
              goal.toLowerCase().replace(/\s/g, "");

            return (
              <ButtonAnimation
                key={goal}
                clicked={isSelected}
                screen={"ScreenOne"}>
                <Pressable
                  onPress={() => handleSelectGoal(goal)}
                  style={{
                    ...style.workoutGoalButton,
                    color: `${isSelected ? "white" : "red"}`,
                    backgroundColor: isSelected ? "#47b977" : "transparent",
                    width: "80%",
                    paddingVertical: 24,
                    paddingHorizontal: 30,
                  }}>
                  <Text style={{ ...style.defaultText, fontSize: 20 }}>
                    {goal}
                  </Text>
                </Pressable>
              </ButtonAnimation>
            );
          })}
        </View>

        {clicked && (
          <PrimaryCTAButton
            style={{
              marginTop: 40,
              alignSelf: "center",
              paddingHorizontal: 40,
              shadowOpacity: 0,
              shadowRadius: 0,
              shadowOffset: { width: 0, height: 0 },
              backgroundColor: "transparent",
            }}
            label="Continue"
            textColor="white"
            borderColor="#47b977"
            onPress={() => {
              router.push("ScreenTwo");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
        )}
      </AnimatedItem>
    </SafeScreen>
  );
};

export default ScreenOne;

/// ინსტაგრამის ფოტოს ვიზუალის ჩაინტეგრირება
