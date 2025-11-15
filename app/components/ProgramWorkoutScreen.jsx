import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style";
import SafeScreen from "./SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";
import { Button } from "@react-navigation/elements";
import { searchExercises, searchOldExercises } from "../api/exercises";
const ProgramWorkoutScreen = ({ workouts, rame, setWorkoutModalVisible }) => {
  const [startWorkout, setStartWorkout] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isWorkoutStarting, setIsWorkoutStarting] = useState(false);
  //   console.log("workouts in ProgramWorkoutScreen:", workouts);
  const [timerForStart, setTimerForStart] = useState(3);
  console.log("kk", rame);

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
  //   const exercises = workouts.supersets
  //     ? workouts.supersets[0].exercises
  //     : workouts.exercises;
  //   useEffect(() => {
  //     const fetchResults = async () => {
  //       searchOldExercises(query).then((data) => {
  //         setResults(data);
  //         // console.log("results from API:", data);
  //       });
  //     };
  //     fetchResults();
  //   }, [query]);

  //   useEffect(() => {
  //     if (!isWorkoutStarting) return;

  //     let timer = setInterval(() => {
  //       setTimerForStart((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);
  //           setIsWorkoutStarting(false);
  //           setWorkoutModalVisible(true);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, [isWorkoutStarting]);
  //   const workoutToShow = React.useMemo(() => {
  //     if (!workouts) return null;

  //     // If parent passed a single workout object
  //     if (!Array.isArray(workouts)) {
  //       // If no query, just use the passed workout; otherwise match by name
  //       if (!query) return workouts;
  //       return workouts.name?.toLowerCase() === query.toLowerCase()
  //         ? workouts
  //         : null;
  //     }

  //     // If parent passed an array of workout objects
  //     if (!query) return null; // need a name to match
  //     return (
  //       workouts.find((w) => w?.name?.toLowerCase() === query.toLowerCase()) ||
  //       null
  //     );
  //   }, [workouts, query]);
  //   const exercises =
  //     workouts.supersets?.flatMap((superset) =>
  //       superset.exercises.map((exercise) => ({
  //         ...exercise,
  //         supersetName: superset.name, // Keep track of which superset it belongs to
  //       }))
  //     ) || [];

  const exercises = rame.supersets
    ? rame.supersets[0].exercises
    : rame.exercises;
  console.log("eqse", exercises);
  return (
    <SafeScreen style={{ ...styles.Background }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          onPress={() => setWorkoutModalVisible(false)}
          name="close-circle"
          size={30}
          color="white"
        />
        <Text style={{ ...styles.TitleText, marginLeft: 10 }}>{rame.name}</Text>
      </View>
      <Text style={{ ...styles.defaultText, marginLeft: 10, marginBottom: 10 }}>
        {rame.sets_per_round} sets - {rame.rest_between_exercises_seconds}{" "}
        seconds rest
      </Text>

      {startWorkout ? (
        <>
          <View
            style={{
              // flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: "100%",
              justifyContent: "center",
              marginBottom: 20,
            }}>
            <Progress.Bar
              progress={1}
              width={200}
              color="#47b977"
              unfilledColor="rgba(255, 255, 255, 0.2)"
              borderWidth={0}
              height={10}
              style={{
                marginTop: 0,
                alignSelf: "center",
                alignContent: "center",
              }}
            />
            {/* <FlatList
              data={exercises}
              ListFooterComponent={() => (
                <View style={{ height: 80 }}>
                  <Text style={{ ...styles.defaultText }}>ramssse</Text>
                </View>
              )}
              renderItem={({ item, index }) => (
                <View key={index} style={{ marginTop: 10 }}>
                  <Text style={{ ...styles.defaultText }}>
                    {index + 1}. {item.name} - {item.duration_seconds} seconds
                  </Text>
                  <Image
                    source={{ uri: item.gifUrl }}
                    style={{ width: 200, height: 200, marginTop: 10 }}
                    contentFit="cover"
                    transition={1000}
                  />
                </View>
              )}
            /> */}
            <Image
              source={{ uri: exercises[0]?.gifUrl }}
              style={{ width: 200, height: 200, marginTop: 20 }}
              contentFit="cover"
              transition={400}
            />

            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                flexDirection: "row",
                gap: 20,
                flexWrap: "wrap",
              }}>
              <Text style={{ ...styles.TitleText, fontSize: 24 }}>Next Up</Text>
              <Image
                source={{ uri: exercises[1]?.gifUrl }}
                style={{ width: 100, height: 100, marginTop: 20 }}
                contentFit="cover"
                transition={400}
              />
            </View>
          </View>
        </>
      ) : (
        <FlatList
          data={exercises}
          ListFooterComponent={() => (
            <Pressable
              style={{
                ...styles.workoutGoalButton,
                alignSelf: "center",
                padding: 15,
                marginBottom: 30,
              }}
              onPress={() => setStartWorkout(true)}>
              <Text style={{ ...styles.defaultText }}>Start Workout</Text>
            </Pressable>
          )}
          renderItem={({ item, index }) => (
            console.log(item, "item in ProgramWorkoutScreen"),
            (
              <TouchableOpacity
                onPress={() => {
                  setQuery(item.name);
                  //   console.log(workoutToShow, "selectedExercise");
                }}
                key={index}
                style={{
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 10,
                  borderColor: "#47b977",
                  alignItems: "center",
                }}>
                <Text style={{ ...styles.defaultText }}>
                  {index + 1}. {item.name} - {item.duration_seconds} seconds
                </Text>
                <Image
                  source={{ uri: item.gifUrl }}
                  style={{
                    width: 200,
                    height: 200,
                    marginTop: 10,
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: "#47b977",
                  }}
                  contentFit="cover"
                  transition={300}
                />
              </TouchableOpacity>
            )
          )}
        />
      )}
    </SafeScreen>
  );
};

export default ProgramWorkoutScreen;
