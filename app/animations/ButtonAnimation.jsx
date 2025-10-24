import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MotiView, AnimatePresence } from "moti";

const ButtonAnimation = ({ children, clicked, screen }) => {
  return (
    <MotiView
      style={
        screen === "ScreenOne"
          ? { width: "100%", alignItems: "center" }
          : undefined
      }
      from={{
        borderColor: "transparent",
        translateY: 0,
        scale: 1,
      }}
      animate={{
        translateY: clicked ? -5 : 0,
        scale: clicked ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        duration: 150,
        stiffness: 200,
      }}>
      {children}
    </MotiView>
  );
};

export default ButtonAnimation;
