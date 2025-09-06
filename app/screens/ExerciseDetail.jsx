import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../style";
import { Link, useRoute } from "@react-navigation/native";
import { getExerciseById } from "../api/exercises";
import { Image } from "expo-image";

const ExerciseDetail = () => {
  const route = useRoute();
  const { exerciseId } = route.params;
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
        backgroundColor: "white",
        // justifyContent: "center",
        alignItems: "center",
      }}>
      {!exercise ? (
        <Text style={{ ...styles.defaultText, color: "black" }}>
          Loading...
        </Text>
      ) : (
        <>
          <Text style={{ ...styles.defaultText, color: "black" }}>
            {exercise.name}
          </Text>
          <Image
            source={{ uri: exercise.gifUrl }}
            style={{
              width: 250,
              height: 250,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "#38d9a9",
              marginTop: 10,
            }}
            contentFit="cover"
            transition={1000}
          />
          <Text style={{ ...styles.defaultText, color: "black" }}>
            Target Muscle: {exercise.targetMuscles[0]}
          </Text>
          <Text style={{ ...styles.defaultText, color: "black" }}>
            Equipment: {exercise.equipments}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                ...styles.defaultText,
                color: "black",
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 10,
              }}>
              Instructions:
            </Text>

            {exercise.instructions.map((step, index) => (
              <Text
                key={index}
                style={{
                  ...styles.defaultText,
                  color: "#333",
                  fontSize: 16,
                  marginBottom: 8,
                  lineHeight: 22,
                }}>
                {index + 1}. {step.replace(/^Step:\d+\s*/, "")}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default ExerciseDetail;
