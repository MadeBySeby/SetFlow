import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedItem from "../animations/AnimatedItem";
import styles from "./style";
const BoardingButtons = ({ text, onPress }) => {
  return (
    <AnimatedItem>
      <Pressable
        style={{ ...styles.workoutGoalButton, marginTop: 40 }}
        onPress={onPress}>
        <Text style={styles.defaultText}>{text}</Text>
      </Pressable>
    </AnimatedItem>
  );
};

export default BoardingButtons;
