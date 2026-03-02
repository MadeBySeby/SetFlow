import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WorkoutScreen from "../(onboarding)/WorkoutScreen";
import ExerciseDetail from "../ExerciseDetail";
import SafeScreen from "./SafeScreen";
import styles from "./style";

const ProgramWorkoutScreen = ({ workoutData, setWorkoutModalVisible }) => {
  const { t } = useTranslation();
  const [startWorkout, setStartWorkout] = useState(false);
  const [exerciseDetailModalVisible, setExerciseDetailModalVisible] =
    useState(false);
  const [itemIdforDetail, setItemIdforDetail] = useState(null);

  const exercises = workoutData.supersets
    ? workoutData.supersets[0].exercises
    : workoutData.exercises;

  const normalizedExercises = useMemo(
    () =>
      exercises.map((ex, index) => ({
        name: ex.name,
        gif: ex.gifUrl,
        reps: ex.duration_seconds || 45,
        sets: workoutData.sets_per_round || 1,
        exerciseId: ex.id || index,
      })),
    [exercises, workoutData],
  );

  if (startWorkout) {
    return (
      <WorkoutScreen
        selectedDate={new Date().toISOString().split("T")[0]}
        setWorkoutModalVisible={setWorkoutModalVisible}
        currentExercise={normalizedExercises}
        type="Programs"
        restSec={workoutData.rest_between_exercises_seconds}
      />
    );
  }

  return (
    <SafeScreen style={styles.Background}>
      {/* Header */}
      <View style={local.header}>
        <TouchableOpacity
          onPress={() => setWorkoutModalVisible(false)}
          style={local.closeBtn}>
          <Ionicons name="close" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={local.workoutTitle} numberOfLines={2}>
            {workoutData.name}
          </Text>
          <View style={local.metaRow}>
            <View style={local.metaBadge}>
              <Ionicons name="layers-outline" size={13} color="#47b977" />
              <Text style={local.metaText}>
                {workoutData.sets_per_round} {t("sets")}
              </Text>
            </View>
            <View style={local.metaBadge}>
              <Ionicons name="timer-outline" size={13} color="#47b977" />
              <Text style={local.metaText}>
                {workoutData.rest_between_exercises_seconds}s{" "}
                {t("restTime").replace("!", "")}
              </Text>
            </View>
            <View style={local.metaBadge}>
              <Ionicons name="barbell-outline" size={13} color="#47b977" />
              <Text style={local.metaText}>{exercises.length} exercises</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Exercise List */}
      <FlatList
        data={exercises}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <Pressable
            style={local.startBtn}
            onPress={() => setStartWorkout(true)}>
            <Ionicons
              name="play-circle"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={local.startBtnText}>{t("startWorkout")}</Text>
          </Pressable>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setItemIdforDetail(item.id ?? index);
              setExerciseDetailModalVisible(true);
            }}
            activeOpacity={0.85}
            style={local.card}>
            {/* Index number */}
            <View style={local.indexBadge}>
              <Text style={local.indexText}>{index + 1}</Text>
            </View>

            {/* GIF */}
            <Image
              source={{ uri: item.gifUrl }}
              style={local.gif}
              contentFit="cover"
              transition={300}
            />

            {/* Info */}
            <View style={local.cardInfo}>
              <Text style={local.exerciseName} numberOfLines={2}>
                {item.name}
              </Text>
              <View style={local.badgeRow}>
                {item.duration_seconds && (
                  <View style={local.badge}>
                    <Text style={local.badgeText}>
                      {item.duration_seconds}s
                    </Text>
                  </View>
                )}
                <View style={[local.badge, { backgroundColor: "#1e3a2f" }]}>
                  <Text style={local.badgeText}>
                    {workoutData.sets_per_round} {t("sets")}
                  </Text>
                </View>
              </View>
              <Text style={local.tapHint}>{t("tapDetails")}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        presentationStyle="fullScreen"
        visible={exerciseDetailModalVisible}
        onRequestClose={() => setExerciseDetailModalVisible(false)}>
        <ExerciseDetail
          field="WorkoutScreen"
          id={itemIdforDetail}
          onClose={() => setExerciseDetailModalVisible(false)}
        />
      </Modal>
    </SafeScreen>
  );
};

const local = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(71,185,119,0.2)",
    marginBottom: 10,
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  workoutTitle: {
    color: "white",
    fontSize: 20,
    fontFamily: "Nunito-Bold",
    lineHeight: 26,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(71,185,119,0.12)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(71,185,119,0.25)",
  },
  metaText: {
    color: "#47b977",
    fontSize: 12,
    fontFamily: "Nunito-SemiBold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(71,185,119,0.15)",
  },
  indexBadge: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
  },
  indexText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 13,
    fontFamily: "Nunito-Bold",
  },
  gif: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 10,
  },
  cardInfo: {
    flex: 1,
    paddingRight: 12,
    gap: 4,
  },
  exerciseName: {
    color: "white",
    fontSize: 14,
    fontFamily: "Nunito-SemiBold",
    lineHeight: 20,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  badge: {
    backgroundColor: "rgba(71,185,119,0.18)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: "#47b977",
    fontSize: 11,
    fontFamily: "Nunito-SemiBold",
  },
  tapHint: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 11,
    fontFamily: "Nunito-Regular",
    marginTop: 4,
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#47b977",
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 12,
    marginHorizontal: 4,
  },
  startBtnText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito-Bold",
  },
});

export default ProgramWorkoutScreen;
