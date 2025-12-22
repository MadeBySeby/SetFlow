import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./components/style";
import { router, useLocalSearchParams } from "expo-router";
import { getExerciseById } from "./api/exercises";
import { getExerciseById2 } from "./api/exercises";
import { Image } from "expo-image";
import { Video } from "expo-av";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";

const ExerciseDetail = ({ id, field = "details", onClose }) => {
  const route = useLocalSearchParams();
  console.log("route in ExerciseDetail", route);
  const exerciseId = route?.exerciseId || id;
  console.log("exerciseId in ExerciseDetail", exerciseId);
  const [exercise, setExercise] = useState(null);
  useEffect(() => {
    if (field === "WorkoutScreen") {
      getExerciseById2(exerciseId).then((data) => setExercise(data.data));
      console.log("fetched from getExerciseById2");
    } else {
      getExerciseById(exerciseId).then((data) => setExercise(data.data));
    }
  }, [exerciseId]);
  console.log("exercise", exercise);
  return (
    <View
      style={{
        ...styles.Background,
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}>
      {!exercise ? (
        // <ActivityIndicator size="large" color="#00ff00" />
        <LottieView
          source={require("./assets/writingloop.json")}
          autoPlay
          loop
          style={{ width: 300, height: 300, marginTop: 200 }}
        />
      ) : (
        <>
          <View>
            <Text
              style={{
                ...styles.defaultText,
                marginTop: 20,
                fontWeight: "500",
                display: "flex",
                flexDirection: "row",
              }}>
              {exercise.name}
            </Text>
            <Pressable
              onPress={() => onClose()}
              style={{ position: "absolute", left: -40, top: 20 }}>
              <Ionicons name="arrow-back-circle" size={30} color="#47b977" />
            </Pressable>
          </View>
          {field != "WorkoutScreen" ? (
            <Video
              source={{ uri: exercise.videoUrl }}
              style={{
                width: 300,
                height: 300,
                borderRadius: 10,
                marginTop: 20,
              }}
              useNativeControls
              resizeMode="contain"
              shouldPlay={true}
            />
          ) : (
            <Image
              source={{ uri: exercise.gifUrl }}
              style={{
                width: 300,
                height: 300,
                borderRadius: 10,

                marginTop: 20,
              }}
              contentFit="contain"
              transition={300}
            />
          )}
          <Text style={{ ...styles.defaultText, marginTop: 10 }}>
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
                fontWeight: "700",
              }}>
              Instructions:
            </Text>
            <FlatList
              data={exercise.instructions}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: "100%" }}
              showsVerticalScrollIndicator={false}
              style={{ height: 300, width: "100%" }}
              ListFooterComponent={<View style={{ height: 60 }} />}
              renderItem={({ item, index }) => (
                <Text
                  key={index}
                  style={{
                    ...styles.defaultText,
                    marginTop: 5,
                    lineHeight: 22,
                    borderBottomWidth: 1,
                    borderBottomColor: "#475569",
                    paddingBottom: 5,
                    paddingRight: 10,
                    color: "#47b977",
                    fontWeight: "500",
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
