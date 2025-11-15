import { Image } from "expo-image";
import { ImageBackground } from "react-native";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./style";
// import { LinearGradient } from "expo-linear-gradient";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { IconContext } from "phosphor-react";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { EquipmentIconsExample } from "./equipmentIcons";
import { presetPrograms } from "../api/PreSetPrograms";
// import Body from "react-native-body-highlighter";
import AutoBody from "./AutoBody";
// import WorkoutScreen from "../(onboarding)/WorkoutScreen";
import ProgramWorkoutScreen from "./ProgramWorkoutScreen";
const getGradientForIntensity = (intensity) => {
  switch (intensity.toLowerCase()) {
    case "light":
      return ["#47B977", "#2E8B57"];
    case "moderate":
      return ["#3B82F6", "#1E3A8A"];
    case "moderate-high":
      return ["#F59E0B", "#B45309"];
    case "high":
      return ["#E63946", "#8B0000"];
    case "very high":
      return ["#7F1D1D", "#DC2626"];
    default:
      return ["#161C43", "#161C43"]; // fallback to base color
  }
};
export default function ProgramWorkoutCard({
  workoutModalVisible,
  setWorkoutModalVisible,
  workout,
  selectedWorkout,
  onOpen,
}) {
  console.log("workout in ProgramWorkoutCard:", workout);
  const gradientColors = getGradientForIntensity(workout.intensity);
  const [currentExercise, setCurrentExercise] = useState();

  // console.log(workout, "test");
  //  name: "10-Minute Abs & Core Blast",
  //     duration_minutes: 10,
  //     focus: "Abs / Cardio",
  //     intensity: "High",
  //     sets_per_round: 2,
  //     rest_between_exercises_seconds: 15,
  //     notes:
  //       "Perform 2 sets of the circuit. Minimize rest to keep intensity high.",
  //     exercises: [
  //       {
  //         name: "Mountain Climber",
  //         duration_seconds: 45,
  //         target_muscles: ["cardiovascular system", "core", "shoulders"],
  //         equipment: ["body weight"],
  //         gifUrl: "https://static.exercisedb.dev/media/RJgzwny.gif",
  //       },

  return (
    <View
      style={{
        margin: 10,
        // padding: 20,
        backgroundColor: "#161c43ff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        color: "red",
      }}>
      <ImageBackground
        source={require(`../assets/10-MinuteBodyweightAbs.png`)}
        resizeMode="cover"
        // make sure images opacity is lower so text is readable
        imageStyle={{ borderRadius: 10, opacity: 0.2 }}
        // onLoad={() => setLoaded(true)}
        style={{
          margin: 10,
          padding: 20,
          borderRadius: 10,
          borderWidth: 1,

          borderColor: "black",
          overflow: "hidden",
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log("Opening workout modal");
            // setCurrentExercise(workout?.name);

            // setCurrentExercise(workout.exercises);
            onOpen();
            setWorkoutModalVisible(true);

            console.log("worki", selectedWorkout);
          }}
          style={{ gap: 5, color: "red" }}>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <Text
              style={{ ...styles.TitleText, fontSize: 18, color: "#47b977" }}>
              {workout?.name}
            </Text>
            {/* <MuscleFigure highlights={"abs"} /> */}
            {/* <Body
            data={[
              { slug: "abs", intensity: 1 },
              // { slug: "biceps", intensity: 2 },
              { slug: "abs", intensity: 4 },
            ]}
            gender="male" // or "female"
            side="front" // "back" for the other side
            scale={0.7} // resize the model
            border="#47b977"
          /> */}
            <Text style={{ ...styles.defaultText }}>
              Focus: {workout?.focus}
            </Text>
          </View>
          <AutoBody focus={workout?.focus} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}>
          <EquipmentIconsExample equipment={workout?.mustHaveEquipment} />
          {/** Helper function to determine color based on intensity **/}
          {(() => {
            let intensityColor = "black";
            switch (workout?.intensity) {
              case "Very High":
                intensityColor = "#DC2626";
                break;
              case "High":
                intensityColor = "#E63946";
                break;
              case "Moderate-High":
                intensityColor = "#F59E0B";
                break;
              case "Moderate":
                intensityColor = "#3B82F6";
                break;
              case "Light":
                intensityColor = "#A5B4FC";
                break;
              case "Low":
                intensityColor = "#47B977";
                break;
              default:
                intensityColor = "#FFFFFF"; // fallback for unknown
            }
            return (
              <View
                style={{
                  alignItems: "flex-end",
                  flexDirection: "row",
                  gap: 10,
                }}>
                <Text style={{ ...styles.defaultText, color: "#47B977" }}>
                  Intensity:
                </Text>
                <Text
                  style={{
                    ...styles.defaultText,
                    color: intensityColor,
                    padding: 0,
                  }}>
                  {workout?.intensity}
                </Text>
              </View>
            );
          })()}
          {/* </LinearGradient> */}
        </View>
      </ImageBackground>
      <Modal
        visible={workoutModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => {}}>
        <ProgramWorkoutScreen
          workouts={workout}
          rame={selectedWorkout}
          setWorkoutModalVisible={setWorkoutModalVisible}
          onClose={() => {
            setWorkoutModalVisible(false);
          }}
        />
      </Modal>
    </View>
  );
}
