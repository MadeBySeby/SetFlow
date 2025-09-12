import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../components/style";
import { useLocalSearchParams } from "expo-router";
import { getExerciseById } from "../api/exercises";
import { Image } from "expo-image";

const ExerciseDetail = ({ id }) => {
  const route = useLocalSearchParams();
  console.log("route in ExerciseDetail", route);
  const exerciseId = route.params?.exerciseId || id;
  console.log("exerciseId in ExerciseDetail", exerciseId);
  const [exercise, setExercise] = useState(null);
  useEffect(() => {
    getExerciseById(exerciseId).then((data) => setExercise(data.data));
  }, [exerciseId]);
  console.log("exercise", exercise);
  return (
    <View
      style={{
        ...styles.Background,
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}>
      {!exercise ? (
        <Text style={{ ...styles.defaultText }}>Loading...</Text>
      ) : (
        <>
          <Text style={{ ...styles.defaultText, marginTop: 10 }}>
            {exercise.name}
          </Text>
          <Image
            source={{ uri: exercise.gifUrl }}
            style={{
              width: 250,
              height: 250,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "#1e293b",
              marginTop: 10,
            }}
            contentFit="cover"
            transition={1000}
          />
          <Text style={{ ...styles.defaultText }}>
            Target Muscle: {exercise.targetMuscles[0]}
          </Text>
          <Text style={{ ...styles.defaultText }}>
            Equipment: {exercise.equipments}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                ...styles.defaultText,
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 10,
              }}>
              Instructions:
            </Text>
            <FlatList
              data={exercise.instructions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Text
                  key={index}
                  style={{
                    ...styles.defaultText,
                    fontSize: 16,
                    marginTop: 2,
                    lineHeight: 22,
                  }}>
                  {index + 1}. {item.replace(/^Step:\d+\s*/, "")}
                </Text>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ExerciseDetail;
