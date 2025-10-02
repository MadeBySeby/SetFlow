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
import AnimatedItem from "../animations/AnimatedItem";
import iconSet from "@expo/vector-icons/build/Fontisto";
import { Ionicons } from "@expo/vector-icons";
import GymMembershipIcon from "../../icons/GymMembershipIcon";
import AtHomeEquipmentIcon from "../../icons/AtHomeEquipmentIcon";
import NoEquipmentIcon from "../../icons/NoEquipmentIcon";

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
  const [selectedOption, setSelectedOption] = useState(null);
  const [addedEquipment, setAddedEquipment] = useState(false);
  const equipmentOptions = [
    "Gym Membership",
    "At Home Equipment",
    "No Equipment",
  ];
  const { push } = router;
  const handleOnPress = (option) => {
    setSelectedOption(option);
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
  console.log("inputValue:", inputValue);
  function getIcon(option) {
    switch (option) {
      case "Gym Membership":
        return (
          <GymMembershipIcon isActive={selectedOption === option} size={40} />
        );
      case "At Home Equipment":
        return (
          <AtHomeEquipmentIcon isActive={selectedOption === option} size={50} />
        );
      case "No Equipment":
        return (
          <NoEquipmentIcon isActive={selectedOption === option} size={40} />
        );
      default:
        return null;
    }
  }
  return (
    <SafeScreen style={style.Background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ alignItems: "center" }}>
            <AnimatedItem Screen={"ScreenTwo"}>
              <Text style={style.TitleText}>
                Select Your {"\n"} Available Equipment
              </Text>
              {equipmentOptions.map((option) => {
                return (
                  <Pressable
                    style={{ ...style.workoutGoalButton, marginTop: 40 }}
                    key={option}
                    onPress={() => handleOnPress(option)}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}>
                      <Text style={style.defaultText}>{option}</Text>
                      {getIcon(option)}
                    </View>

                    {addedEquipment && option === "At Home Equipment" && (
                      <View>
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            marginTop: 20,
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
            </AnimatedItem>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

export default ScreenTwo;
