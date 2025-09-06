import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import styles from "../style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Label } from "@react-navigation/elements";
const AiWorkoutAssistant = () => {
  const [showAiChat, setShowAiChat] = useState(false);
  return (
    <View
      style={{
        ...styles.workoutGoalButton,
        // flex: 1,
        display: "flex",
        alignSelf: "center",
        marginTop: 50,
      }}>
      <Text style={styles.defaultText}>Ai Quick Question</Text>
      {/* <MaterialCommunityIcons name="robot" size={32} color="white" /> */}
      <TextInput
        style={{ ...styles.input, width: "80%" }}
        placeholder="Type here..."
      />
    </View>
  );
};

export default AiWorkoutAssistant;
