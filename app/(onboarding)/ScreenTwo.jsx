import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Vibration,
} from "react-native";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import SafeScreen from "../components/SafeScreen";
import { useWorkout } from "../contexts/WorkoutContext";
import { router } from "expo-router";

import style from "../components/style";

const ScreenTwo = () => {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const [showHomeEquipment, setShowHomeEquipment] = useState(false);

  const toggleHomeEquipment = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowHomeEquipment(!showHomeEquipment);
  };

  const { updateEquipment } = useWorkout();
  const [inputValue, setInputValue] = useState("");
  const [addedEquipment, setAddedEquipment] = useState(false);
  const equipmentOptions = [
    "Gym Membership",
    "At Home Equipment",
    "No Equipment",
  ];
  const { push } = router;
  const handleOnPress = (option) => {
    updateEquipment(option);
    if (option === "At Home Equipment") {
      setAddedEquipment((prev) => !prev);
    } else {
      push("PlanDurationScreen");
    }
    toggleHomeEquipment();
    // Vibration.vibrate(50);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeScreen style={style.Background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ alignItems: "center" }}>
            <Text style={style.TitleText}>
              Select Your {"\n"} Available Equipment
            </Text>
            {equipmentOptions.map((option) => {
              return (
                <Pressable
                  style={style.workoutGoalButton}
                  key={option}
                  onPress={() => handleOnPress(option)}>
                  <Text style={style.defaultText}>{option}</Text>
                  {addedEquipment && option === "At Home Equipment" && (
                    <View>
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginTop: 10,
                        }}>
                        Add Your Equipment
                      </Text>
                      <TextInput
                        style={style.input}
                        placeholder="Enter equipment name"
                        placeholderTextColor="#999"
                        value={inputValue}
                        onChangeText={setInputValue}
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};
// const styles = StyleSheet.create({
//   workoutGoalButton: {
//     width: 200,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//     fontSize: 20,
//     color: "white",
//     borderColor: "white",
//     borderRadius: 10,
//     borderWidth: 1,
//     padding: 20,
//     boxShadow: "0 4px 6px rgba(222, 222, 222, 0.1)",
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     color: "white",
//     marginTop: 10,
//     paddingHorizontal: 10,
//     width: 200,
//     borderRadius: 10,
//   },
// });
export default ScreenTwo;
