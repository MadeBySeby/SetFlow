import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";
import styles from "../components/style";
import { Label } from "@react-navigation/elements";
import { useWorkout } from "../contexts/WorkoutContext";
import SafeScreen from "../components/SafeScreen";
import { router } from "expo-router";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Haptics from "expo-haptics";
import { WeightScale } from "../components/Mascot";
import HorizontalNumberPicker from "../components/Roller";
import RadioSlider from "../components/Roller";
import Slider from "@react-native-community/slider";
import MascotSvg from "../components/MascotSvg";
import { Picker } from "@react-native-picker/picker";
const PersonalDetailsScreen = () => {
  const fields = ["Height", "Weight", "Age"];
  const { updateHeight, updateWeight, updateAge, UserProfile } = useWorkout();
  const { age, height, weight } = UserProfile;
  const allFieldsFilled = age && height && weight;
  const handleOnPress = (field, value) => {
    switch (field) {
      case "Height":
        setTimeout(() => {
          updateHeight(value);
        }, 300);
        break;
      case "Weight":
        updateWeight(value);
        break;
      case "Age":
        updateAge(value);
        break;
      default:
        break;
    }
  };

  return (
    <SafeScreen
      style={{
        ...styles.Background,
        flex: 1,
        alignItems: "center",
        width: "100%",
        display: "flex",
        paddingTop: 30,
      }}>
      <Text style={{ ...styles.TitleText, marginTop: 0, textAlign: "center" }}>
        Enter Your Personal Details
      </Text>
      {fields.map((field) => {
        const currentValue =
          field === "Height"
            ? height || "Select Height"
            : field === "Weight"
            ? weight || "Select Weight"
            : age || "Select Age";

        const unit =
          field === "Height" ? "cm" : field === "Weight" ? "kg" : "yrs";

        const min = field === "Height" ? 140 : field === "Weight" ? 40 : 10;

        const max = field === "Height" ? 220 : field === "Weight" ? 150 : 100;

        return (
          <View
            key={field}
            style={{
              ...styles.workoutGoalButton,
              borderWidth: 0,
              marginTop: 0,
            }}>
            <Label
              style={{
                ...styles.defaultText,
                display: "flex",
                alignContent: "flex-start",
                alignSelf: "center",
              }}>
              {/* {field} */}
            </Label>
            <Picker
              mode="dropdown"
              selectedValue={currentValue}
              style={{ height: 120, width: 200, color: "white" }}
              onValueChange={(val) => handleOnPress(field, val)}>
              {Array.from({ length: max - min + 1 }).map((_, i) => {
                const num = min + i;
                if (i === 0) {
                  return (
                    <Picker.Item
                      key={num}
                      label={`Select ${field}`}
                      value={num}
                    />
                  );
                }
                return (
                  <Picker.Item key={num} label={`${num} ${unit}`} value={num} />
                );
              })}
            </Picker>
          </View>
        );
      })}
      {allFieldsFilled && (
        <Pressable
          style={{
            ...styles.workoutGoalButton,
            borderColor: "black",
            backgroundColor: "black",
            width: 200,
            marginTop: 20,
          }}
          onPress={() => {
            router.push("LevelScreen");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}>
          <Text style={styles.defaultText}>Submit</Text>
        </Pressable>
      )}
    </SafeScreen>
  );
};

export default PersonalDetailsScreen;
