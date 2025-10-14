import { View, Text } from "react-native";
import React from "react";
import { MotiView } from "moti";

const PulseAnimations = ({ children }) => {
  return (
    <MotiView
      from={{ transform: [{ translateY: 0 }, { rotate: "0deg" }] }}
      animate={{ transform: [{ translateY: -70 }, { rotate: "10deg" }] }}
      transition={{
        type: "timing",
        duration: 400,
        loop: true,
        repeatReverse: true,
      }}>
      {children}
    </MotiView>
  );
};

export default PulseAnimations;
