import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MotiView, AnimatePresence } from "moti";
const ButtonAnimation = ({ children, clicked }) => {
  return (
    console.log("isSelected", clicked),
    (
      // <MotiView
      //   style={{ width: "100%", alignItems: "center" }}
      //   from={{ opacity: 0, translateY: 50 }}
      //   animate={{ opacity: 1, translateY: 0 }}
      //   transition={{ delay: 1000, type: "spring" }}>
      //   {children}
      // </MotiView>

      <MotiView
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
    )
  );
};

export default ButtonAnimation;
