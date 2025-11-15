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
import { Image } from "expo-image";
import { Video } from "expo-av";
import LottieView from "lottie-react-native";

const ExerciseDetail = ({ id }) => {
  const route = useLocalSearchParams();
  console.log("route in ExerciseDetail", route);
  const exerciseId = route?.exerciseId || id;
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
          <Text
            style={{ ...styles.defaultText, marginTop: 15, fontWeight: "500" }}>
            {exercise.name}
          </Text>
          <Pressable onPress={() => router.back()} style={{ marginTop: 10 }}>
            <Text>Go back</Text>
          </Pressable>
          {/* <Video
            ref={videoRef}
            source={{ uri: exercise.videoUrl }} // Your video URL
            style={{
              width: 300,
              height: 300,
              borderRadius: 10,
              marginTop: 20,
              // backgroundColor: "#000",
            }}
            useNativeControls // shows play/pause, seek bar, etc.
            resizeMode="contain"
            shouldPlay={false} // auto play if true
          /> */}
          <Image
            source={{ uri: exercise.gifUrl }}
            style={{
              width: 300,
              height: 300,
              borderRadius: 10,

              marginTop: 20,
              // backgroundColor: "#000",
            }}
            contentFit="contain"
            transition={300}
          />
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
