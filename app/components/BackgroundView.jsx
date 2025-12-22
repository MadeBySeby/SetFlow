// components/BackgroundView.js
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants"; // For dynamic status bar height

const BackgroundView = ({ children, overlay = "dark", style }) => {
  const gradientColors = ["#47b977", "#050A30"]; // Orange to Deep Blue

  // Define overlay styles
  const overlayStyles = {
    dark: {
      backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% black overlay for contrast
    },
    light: {
      backgroundColor: "rgba(255, 255, 255, 0.2)", // 20% white overlay
    },
    none: {
      backgroundColor: "transparent", // No overlay
    },
  };

  return (
    <LinearGradient
      colors={gradientColors}
      start={[0, 0]} // Top-left
      end={[1, 1]} // Bottom-right for a diagonal gradient
      style={styles.fullScreen}>
      <View style={[styles.fullScreen, overlayStyles[overlay], style]}>
        {/*
          SafeAreaView handles notches and status bar on iOS/Android.
          Added conditional padding for Android StatusBar to avoid content under it.
          For iOS, SafeAreaView correctly pushes content below the notch.
        */}
        <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1, // Ensures it fills the entire screen
  },
  safeArea: {
    flex: 1,
    // Add dynamic padding for Android StatusBar if not already handled by SafeAreaView default
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});

export default BackgroundView;
