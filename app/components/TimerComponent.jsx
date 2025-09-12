import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import style from "./style";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
const TimerComponent = ({
  timeLeft,
  setTimeLeft,
  setWorkoutStarted,
  workoutStarted,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const handleOnPress = () => {
    if (workoutStarted) {
      setWorkoutStarted(false);
      setTimeLeft(0);
    }
  };
  useEffect(() => {
    let interval;
    if (workoutStarted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (isPaused) return prev;
          if (prev === 1) {
            clearInterval(interval);
            setWorkoutStarted(false);
            return 0;
          }
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [workoutStarted, isPaused]);
  return (
    <Pressable
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 100,
        elevation: 100,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "rgba(56, 217, 169, 0.2)",
        borderWidth: 6,
        borderColor: "#38d9a9",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 20,
      }}
      onPress={() => {
        handleOnPress();
      }}>
      <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
        {timeLeft < 10 ? `0${timeLeft}` : timeLeft} sec
      </Text>
      <Pressable onPress={() => setIsPaused(!isPaused)}>
        <Ionicons
          name={isPaused ? "play" : "pause"}
          size={24}
          color="white"
          style={{}}
        />
      </Pressable>
    </Pressable>
  );
};

export default TimerComponent;
