import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import styles from "../components/style";
import SafeScreen from "../components/SafeScreen";
import { Image } from "expo-image";
import NoWorkoutsLoggedYetDefaultMascot from "../assets/noWorkoutsLoggedYetDefault.svg";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const WorkoutsHistory = () => {
  const { workoutHistory, clearWorkoutData } = useWorkout();

  // Sort history by date (newest first)
  const sortedHistory = [...workoutHistory].reverse();

  const renderWorkoutItem = ({ item }) => {
    return (
      <View style={historyStyles.card}>
        <View style={historyStyles.cardHeader}>
          <View>
            <Text style={historyStyles.dateText}>{item.date}</Text>
          </View>
          <View style={historyStyles.exerciseBadge}>
            <Text style={historyStyles.badgeText}>
              {item.data?.length || 0} Exercises
            </Text>
          </View>
        </View>

        <View style={historyStyles.gifGrid}>
          {item.data?.slice(0, 4).map((exercise, idx) => (
            <View key={idx} style={historyStyles.gifContainer}>
              <Image
                source={{ uri: exercise.gif || exercise.gifUrl }}
                style={historyStyles.gif}
                contentFit="cover"
                transition={500}
              />
              {idx === 3 && item.data.length > 4 && (
                <View style={historyStyles.moreOverlay}>
                  <Text style={historyStyles.moreText}>
                    +{item.data.length - 4}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeScreen style={styles.Background}>
      <View style={historyStyles.container}>
        <Text style={[styles.TitleText, { marginBottom: 20 }]}>
          Workout History
        </Text>

        <FlatList
          data={sortedHistory}
          keyExtractor={(item, index) => `${item.date}-${index}`}
          renderItem={renderWorkoutItem}
          contentContainerStyle={historyStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={historyStyles.emptyContainer}>
              <NoWorkoutsLoggedYetDefaultMascot width={300} height={300} />
              <Text
                style={[
                  styles.defaultText,
                  { color: "#47b977", marginTop: 20 },
                ]}>
                No workouts logged yet.
              </Text>
              <Text
                style={[styles.defaultText, { fontSize: 14, opacity: 0.6 }]}>
                Finish a workout to see it here!
              </Text>
            </View>
          }
          ListFooterComponent={
            sortedHistory.length > 0 ? (
              <Pressable
                style={historyStyles.clearButton}
                onPress={clearWorkoutData}>
                <Ionicons name="trash-outline" size={20} color="white" />
                <Text style={historyStyles.clearButtonText}>Clear History</Text>
              </Pressable>
            ) : null
          }
        />
      </View>
    </SafeScreen>
  );
};

const historyStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  typeText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Nunito-Bold",
  },
  dateText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
    fontFamily: "Nunito-Regular",
    marginTop: 2,
  },
  exerciseBadge: {
    backgroundColor: "rgba(71, 185, 119, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    color: "#47b977",
    fontSize: 12,
    fontFamily: "Nunito-Bold",
  },
  gifGrid: {
    flexDirection: "row",
    gap: 10,
  },
  gifContainer: {
    width: (width - 100) / 4,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  gif: {
    width: "100%",
    height: "100%",
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: {
    color: "white",
    fontFamily: "Nunito-Bold",
    fontSize: 16,
  },
  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
  },
  clearButton: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "rgba(255, 0, 0, 0.15)",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderColor: "rgba(255, 0, 0, 0.3)",
    borderWidth: 1,
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito-Bold",
  },
});

export default WorkoutsHistory;
