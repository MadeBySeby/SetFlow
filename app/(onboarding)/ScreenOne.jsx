import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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
const ScreenOne = () => {
  const { updateGoal } = useWorkout();
  const goals = ["Muscle Gain", "Weight Loss", "Endurance"];
  const [clicked, setClicked] = useState(false);

  // const playClick = async () => {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("../assets/buttonclicksound.mp3")
  //   );
  //   await sound.playAsync();
  // };

  const handleSelectGoal = (goal) => {
    if (goal === "Muscle Gain") goal = "muscleGain";
    if (goal === "Weight Loss") goal = "weightLoss";
    if (goal === "Endurance") goal = "endurance";
    console.log("Selected Goal:", goal);
    updateGoal(goal);
    setClicked(true);
    // setTimeout(() => {

    // }, 500);
    // playClick();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  // ბორდერის ლაინებით რო გავაკეთო ანიმაცია

  return (
    <SafeScreen style={style.Background}>
      <AnimatedItem Screen={"ScreenOne"}>
        <Text style={{ ...style.TitleText }}>
          Select Your {"\n"} Workout Goal
        </Text>
        <View
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            gap: 20,
          }}>
          {goals.map((goal) => (
            <Pressable
              key={goal}
              onPress={() => handleSelectGoal(goal)}
              text={goal}
              style={{
                ...style.workoutGoalButton,
                width: "80%",
              }}>
              <Text style={style.defaultText}>{goal}</Text>
            </Pressable>
          ))}
        </View>

        {clicked && (
          <Pressable
            style={{
              ...style.workoutGoalButton,
              width: 200,
            }}
            onPress={() => {
              router.push("ScreenTwo");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}>
            <Text style={style.defaultText}> Continue</Text>
          </Pressable>
        )}
      </AnimatedItem>
    </SafeScreen>
  );
};

export default ScreenOne;

/// ინსტაგრამის ფოტოს ვიზუალის ჩაინტეგრირება
