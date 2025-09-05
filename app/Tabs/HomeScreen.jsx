import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import React, { use } from "react";
import SafeScreen from "../components/SafeScreen";
import styles from "../style";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";
import { useWorkout } from "../contexts/WorkoutContext";

const HomeScreen = () => {
  return (
    <SafeScreen
      excludeBottomSafeArea={true}
      style={{ ...styles.Background, flex: 1 }}>
      <View style={{ ...styles.Background, justifyContent: "center", flex: 1 }}>
        <Text style={{ ...styles.TitleText }}>Home</Text>
      </View>
      <Text style={{ ...styles.TitleText }}>Go to Details</Text>
    </SafeScreen>
  );
};

export default HomeScreen;
