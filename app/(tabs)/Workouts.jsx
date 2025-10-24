import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import SafeScreen from "../components/SafeScreen";
import styles from "../components/style";
import { router } from "expo-router";
import AnimatedItem from "../animations/AnimatedItem";
import { getAllExercises, searchExercises } from "../api/exercises";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import PulseAnimations from "../animations/PulseAnimations";
import { Image } from "expo-image";
const Workouts = () => {
  const JumpingMascot = require("../assets/jumpingDefaultMascot.svg").default;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 1) {
        setResults([]);
        return;
      } else {
        const timeout = setTimeout(() => {
          searchExercises(query).then((data) => {
            setResults(data); // just data, not data.data
            console.log("results from API:", data); // log fetched data
          });
        }, 300);
        return () => clearTimeout(timeout);
      }
    };
    fetchResults();
    console.log("resulysss", results);
  }, [query]);

  return (
    <SafeScreen excludeBottomSafeArea={true} style={{ ...styles.Background }}>
      {/* <AiWorkoutAssistant /> */}

      <TextInput
        style={{ ...styles.input, margin: 20, width: "90%", marginTop: 50 }}
        placeholder="Search Exercises..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
      />

      <Text style={{ ...styles.defaultText, alignSelf: "center" }}>
        {results.data?.length ? `${results.data.length} results found` : ""}
      </Text>
      {console.log("results.data?.length", results.data?.length)}
      {results.length < 1 && (
        <View
          style={{
            marginTop: 50,
            alignItems: "center",
            display: "flex",
            gap: 1,
            justifyContent: "center",
            flex: 1,
          }}>
          <PulseAnimations>
            {/* <JumpingMascot width={300} height={400} /> */}
            {/* <MaterialCommunityIcons
              name="dumbbell"
              size={70}
              color="#47b977"
              style={{
                display: "flex",
                alignSelf: "center",

                // please rotate this icon
                transform: [{ rotate: "-10deg" }],
                alignContent: "center",
              }}
            /> */}
          </PulseAnimations>
          <Image
            source={require("../assets/writingg.gif")}
            style={{ width: 300, height: 300, marginTop: 0 }}
            contentFit="contain"
            transition={300}
          />
          <Text
            style={{
              ...styles.defaultText,
              fontSize: 20,
              alignSelf: "center",
              color: "#47b977",
              opacity: results.data?.length ? 0 : 1,
            }}>
            Start searching for exercises
          </Text>
        </View>
      )}
      <FlatList
        data={results || []}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/ExerciseDetail",
                params: {
                  exerciseId: item.exerciseId,
                },
              });
            }}>
            <View
              key={item.id}
              style={{
                ...styles.workoutGoalButton,
                margin: 10,
                alignSelf: "center",
              }}>
              <Text style={styles.defaultText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeScreen>
  );
};

export default Workouts;
