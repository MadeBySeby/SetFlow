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
import LottieView from "lottie-react-native";
import Body from "react-native-body-highlighter";
import AutoBody from "../components/AutoBody";
const Workouts = () => {
  const JumpingMascot = require("../assets/jumpingDefaultMascot.svg").default;
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState([]);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 1) {
        setResults([]);
        return;
      } else {
        const timeout = setTimeout(() => {
          searchExercises(query).then((data) => {
            setResults(data);
            console.log("results from API:", data);
          });
        }, 300);
        return () => clearTimeout(timeout);
      }
    };
    fetchResults();
  }, [query]);
  useEffect(() => {
    if (!query) {
      setHighlighted([]);
    }
  }, [query]);
  return (
    <SafeScreen excludeBottomSafeArea={true} style={{ ...styles.Background }}>
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
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Body
              onBodyPartPress={(e) => {
                setQuery(e.slug);
                setHighlighted([{ slug: e.slug, color: "red", intensity: 1 }]);
              }}
              data={highlighted}
              style={{ width: 200, height: 200 }}
              strokeWidth={2}
              scale={1}
              border="#47b977"
              side="front"
              gender="male"
            />
            <Body
              onBodyPartPress={(e) => {
                setQuery(e.slug);
                setHighlighted([{ slug: e.slug, color: "red", intensity: 1 }]);
              }}
              data={highlighted}
              style={{ width: 200, height: 200 }}
              strokeWidth={2}
              scale={1}
              border="#47b977"
              side="back"
              gender="male"
            />
          </View>

          <Text
            style={{
              ...styles.defaultText,
              fontSize: 20,
              alignSelf: "center",
              color: "white",
              opacity: results.data?.length ? 0 : 1,
            }}>
            Click On the Body Parts To Search Exercises
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
