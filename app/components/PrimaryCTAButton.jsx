import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PrimaryCTAButton = ({
  label = "Continue",
  onPress,
  style,
  disabled,
  textColor = "#0B1026",
  borderColor,
  backgroundColor,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          ...styles.button,
          backgroundColor: backgroundColor || styles.button.backgroundColor,
          borderWidth: borderColor ? 1 : 0,
          borderColor: borderColor || "transparent",
        },
        pressed && !disabled ? styles.buttonPressed : null,
        disabled ? styles.buttonDisabled : null,
        style,
      ]}>
      <View pointerEvents="none" style={styles.glow} />
      <Text style={{ ...styles.text, color: textColor }}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "85%",
    paddingVertical: 18,
    borderRadius: 999,
    backgroundColor: "#47b977",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#47b977",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 8,
    overflow: "hidden",
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  glow: {
    position: "absolute",
    width: "140%",
    height: "180%",
    borderRadius: 999,
    // backgroundColor: "rgba(255,255,255,0.12)",
    opacity: 0.35,
  },
  text: {
    color: "#0B1026",
    fontSize: 18,
    fontFamily: "Nunito-Bold",
    letterSpacing: 0.5,
  },
});

export default PrimaryCTAButton;
