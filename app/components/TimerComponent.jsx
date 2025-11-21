import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import style from "./style";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
const TimerComponent = ({
  timeLeft,
  setTimeLeft,
  setWorkoutStarted,
  workoutStarted,
  restSec,
  type,
  onComplete,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [firstTimer, setFirstTimer] = useState(true);
  const isPrograms = type === "Programs";
  console.log(isPrograms, "isPrograms");
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
          if (prev <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [workoutStarted, isPaused, timeLeft]);
  return (
    <Pressable
      style={{
        position: "absolute",
        top: "50%",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 100,
        elevation: 100,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "rgba(9, 48, 36, 0.2)",
        borderWidth: 5,
        borderColor: "#47b977",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 20,
      }}
      onPress={() => {
        handleOnPress();
      }}>
      <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
        {timeLeft} sec
      </Text>
      <Pressable
        onPress={() => setTimeLeft(timeLeft + 10)}
        style={{ position: "absolute", right: 0 }}>
        <MaterialIcons name="forward-10" size={24} color="white" />
      </Pressable>
      <Pressable
        onPress={() => setTimeLeft(timeLeft - 10 >= 0 ? timeLeft - 10 : 0)}
        style={{ position: "absolute", left: 0 }}>
        <MaterialIcons name="replay-10" size={24} color="white" />
      </Pressable>
      <Pressable
        onPress={() => setIsPaused(!isPaused)}
        style={{ position: "absolute", top: 2 }}>
        <Ionicons name={isPaused ? "play" : "pause"} size={32} color="white" />
      </Pressable>
    </Pressable>
  );
};

export default TimerComponent;
