import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import styles from "../style";
const AiWorkoutAssistant = () => {
  const [showAiChat, setShowAiChat] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
      <Text style={styles.defaultText}>Ai Quick Question</Text>
      <TextInput
        style={{ ...styles.input, width: "80%" }}
        placeholder="Type here..."
      />
    </View>
  );
};

export default AiWorkoutAssistant;
