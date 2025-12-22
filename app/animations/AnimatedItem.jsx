import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MotiView, AnimatePresence } from "moti";
const AnimatedItem = ({ children, Screen }) => {
  let from = {};
  let animate = {};
  let transition = { delay: 200, type: "spring" };
  let style = { width: "100%", alignItems: "center" };

  switch (Screen) {
    case "ScreenOne":
      from = { opacity: 0, translateY: 50 };
      animate = { opacity: 1, translateY: 0 };
      break;
    case "ScreenTwo":
      from = {
        marginTop: 0,
        transform: [
          { skewX: "0.7deg" },
          { skewY: "2deg" },
          { translateY: 100 },
        ],
      };
      animate = {
        marginTop: 20,
        transform: [{ skewX: "0deg" }, { skewY: "0deg" }, { translateY: 0 }],
      };
      break;
    case "PlanDurationScreen":
      from = { opacity: 0, translateY: 50 };
      animate = { opacity: 1, translateY: 0 };
      style = { width: "100%", alignItems: "center" };
      break;
    default:
      from = { opacity: 0, translateY: 50 };
      animate = { opacity: 1, translateY: 0 };
      break;
  }
  return (
    // <MotiView
    //   style={{ width: "100%", alignItems: "center" }}
    //   from={{ opacity: 0, translateY: 50 }}
    //   animate={{ opacity: 1, translateY: 0 }}
    //   transition={{ delay: 1000, type: "spring" }}>
    //   {children}
    // </MotiView>

    <MotiView
      style={style}
      from={from}
      animate={animate}
      transition={transition}>
      {children}
    </MotiView>
  );
};

export default AnimatedItem;
