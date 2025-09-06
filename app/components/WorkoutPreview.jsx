import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../style";
import { getAllExercises } from "../api/exercises";
import { Image } from "expo-image";

const WorkoutPreview = ({ month, day }) => {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    getAllExercises().then((data) => setExercises(data.data));
  }, [month, day]);

  return (
    <View style={{ ...styles.Background, alignItems: "center" }}>
      <Text style={{ ...styles.defaultText, marginTop: 10 }}>
        Workout for {month}/{day}
      </Text>
      <Text style={styles.defaultText}>
        {exercises[day] ? (
          <View style={{ alignSelf: "center" }}>
            <Text style={{ ...styles.defaultText, alignSelf: "center" }}>
              {exercises[day].name}
            </Text>
            <Image
              source={{ uri: exercises[day].gifUrl }}
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
          </View>
        ) : (
          "Rest Day"
        )}
      </Text>
    </View>
  );
};

export default WorkoutPreview;
