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
import DuolingoLikeMascotOnScale from "../components/Mascot";
import HorizontalNumberPicker from "../components/Roller";
import RadioSlider from "../components/Roller";
import Slider from "@react-native-community/slider";
const PersonalDetailsScreen = () => {
  const fields = ["Height", "Weight", "Age"];
  const { updateHeight, updateWeight, updateAge, UserProfile } = useWorkout();
  const { age, height, weight } = UserProfile;
  const allFieldsFilled = age && height && weight;
  // In your PersonalDetailsScreen (temporarily)
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
        // justifyContent: "space-between",
      }}>
      {/* <DuolingoLikeMascotOnScale size={400} /> */}

      {/* <RadioSlider /> */}

      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingBottom: 40,
        }}
        extraScrollHeight={80}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <Text style={{ ...styles.TitleText }}>Tell Us About Yourself</Text>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center", // Center vertically
            zIndex: -1, // Ensure it's behind content
          }}>
          <DuolingoLikeMascotOnScale
            weight={weight || 20} // Use user input or default
            height={height || 200} // Use user input or default
            size={Dimensions.get("window").height} // 90% of screen height
            mascotScale={1.0}
          />
        </View>
        {fields.map((field) => {
          return (
            <View
              key={field}
              style={{ ...styles.workoutGoalButton, borderWidth: 0 }}>
              <Label
                style={{
                  ...styles.defaultText,
                  display: "flex",
                  alignContent: "flex-start",
                  alignSelf: "flex-start",
                }}>
                {field}
              </Label>
              {/* <TextInput
                style={{ ...styles.input, marginTop: 20 }}
                placeholder={`Enter your ${field.toLowerCase()}`}
                placeholderTextColor="#999"
                keyboardType="numeric"
                returnKeyType="go"
                // onSubmitEditing={(e) =>
                //   handleOnPress(field, e.nativeEvent.text)
                // }
                onChangeText={(value) => handleOnPress(field, value)}
              /> */}
              <Text style={{ color: "white", marginTop: 10, fontSize: 16 }}>
                {field === "Height"
                  ? height || 170
                  : field === "Weight"
                  ? weight || 70
                  : age || 25}{" "}
                {field === "Height" ? "cm" : field === "Weight" ? "kg" : "yrs"}
              </Text>
              <Slider
                style={{ width: 300, height: 40 }}
                step={1}
                value={
                  field === "Height"
                    ? height || 170
                    : field === "Weight"
                    ? weight || 70
                    : age || 25
                }
                minimumValue={
                  field === "Height" ? 140 : field === "Weight" ? 40 : 10
                } // <-- add
                maximumValue={
                  field === "Height" ? 220 : field === "Weight" ? 150 : 100
                } // <-- add
                onValueChange={(value) => handleOnPress(field, value)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#4CAF50"
              />
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
      </KeyboardAwareScrollView>
    </SafeScreen>
  );
};

export default PersonalDetailsScreen;
