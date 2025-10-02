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
const Workouts = () => {
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
