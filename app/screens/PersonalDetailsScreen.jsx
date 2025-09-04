import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import styles from "../style";
import { Label } from "@react-navigation/elements";
import { useWorkout } from "../contexts/WorkoutContext";
import SafeScreen from "../components/SafeScreen";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const PersonalDetailsScreen = () => {
  const fields = ["Height", "Weight", "Age"];
  const { updateHeight, updateWeight, updateAge, UserProfile } = useWorkout();
  const { age, height, weight } = UserProfile;
  const allFieldsFilled = age && height && weight;
  const navigate = useNavigation().navigate;
  const handleOnPress = (field, value) => {
    switch (field) {
      case "Height":
        updateHeight(value);
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
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingBottom: 40,
        }}
        extraScrollHeight={80} // ensures input isn’t covered
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <Text style={{ ...styles.TitleText }}>Tell Us About Yourself</Text>
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
              <TextInput
                style={{ ...styles.input, marginTop: 20 }}
                placeholder={`Enter your ${field.toLowerCase()}`}
                placeholderTextColor="#999"
                keyboardType="numeric"
                returnKeyType="go"
                onSubmitEditing={(e) =>
                  handleOnPress(field, e.nativeEvent.text)
                }
              />
            </View>
          );
        })}
        {allFieldsFilled && (
          <Pressable
            style={styles.workoutGoalButton}
            onPress={() => {
              navigate("ScreenOne");
            }}>
            <Text style={styles.defaultText}>Submit</Text>
          </Pressable>
        )}
      </KeyboardAwareScrollView>
    </SafeScreen>
  );
};

export default PersonalDetailsScreen;
