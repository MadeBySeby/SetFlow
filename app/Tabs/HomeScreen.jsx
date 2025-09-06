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
import React, { use, useEffect } from "react";
import SafeScreen from "../components/SafeScreen";
import styles from "../style";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";
import { useWorkout } from "../contexts/WorkoutContext";
import AiWorkoutAssistant from "../components/AiWorkoutAssistant";
import { searchExercises } from "../api/exercises";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 1) {
        setResults([]);
        return;
      } else {
        const timeout = setTimeout(() => {
          searchExercises(query).then((data) => setResults(data));
        }, 300);
        return () => clearTimeout(timeout);
      }
    };
    fetchResults();
    console.log("resulysss", results.data);
  }, [query]);
  return (
    <SafeScreen
      excludeBottomSafeArea={true}
      style={{ ...styles.Background, flex: 1 }}>
      {/* <AiWorkoutAssistant /> */}
      <TextInput
        style={{ ...styles.input, margin: 20, width: "90%" }}
        placeholder="Search Exercises..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("ExerciseDetail");
        }}
        style={{ marginLeft: 20 }}>
        <Text style={{ ...styles.defaultText, alignSelf: "center" }}>
          {results.data?.length ? `${results.data.length} results found` : ""}
        </Text>
      </Pressable>
      <FlatList
        data={results.data || []}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ExerciseDetail", {
                exerciseId: item.exerciseId,
              });
              console.log("clicked", item.exerciseId);
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

export default HomeScreen;
