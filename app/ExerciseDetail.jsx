import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getExerciseById2 } from "./api/exercises";
import SafeScreen from "./components/SafeScreen";
import styles from "./components/style";

const ExerciseDetail = ({ id, field = "details", onClose }) => {
  const { i18n } = useTranslation();
  const route = useLocalSearchParams();
  console.log("route in ExerciseDetail", route);
  const exerciseId = route?.exerciseId || id;
  console.log("exerciseId in ExerciseDetail", exerciseId);
  const [exercise, setExercise] = useState(null);
  const handleGoBack = () => {
    if (typeof onClose === "function") {
      onClose();
      return;
    }

    try {
      router.navigate("/(tabs)/Workouts");
    } catch (error) {
      console.warn("router.back() failed", error);
    }
  };
  useEffect(() => {
    getExerciseById2(exerciseId).then((data) => setExercise(data.data));
    console.log("fetched from getExerciseById2");
    // if (field === "WorkoutScreen") {
    //   getExerciseById2(exerciseId).then((data) => setExercise(data.data));
    //   console.log("fetched from getExerciseById2");
    // } else {
    //   getExerciseById(exerciseId).then((data) => setExercise(data.data));
    // }
  }, [exerciseId]);
  console.log("exercise", exercise);
  return (
    <SafeScreen style={{ ...styles.Background, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}>
        {!exercise ? (
          <>
            <LottieView
              source={require("./assets/writingloop.json")}
              autoPlay
              loop
              style={{ width: 300, height: 300, marginTop: 200 }}
            />
            <TouchableOpacity
              onPress={handleGoBack}
              style={{
                marginTop: 20,
                padding: 12,
                backgroundColor: "#47b977",
                borderRadius: 8,
              }}>
              <Text>Go Back</Text>
            </TouchableOpacity>
          </>
        ) : (
          (() => {
            let translatedName = exercise.name;
            let translatedTarget = exercise.targetMuscles?.[0] || "N/A";
            let translatedEquipment = exercise.equipments || "N/A";
            let translatedInstructions = [...(exercise.instructions || [])];

            if (i18n.language === "ka") {
              const engToKa = {
                "push-up": "აზიდვები",
                squat: "ჩაჯდომები",
                lunge: "ნაბიჯები წინ",
                plank: "პლანკა",
                crunch: "პრესის ვარჯიში",
                "pull-up": "აწევა ძელზე",
                row: "ამოწევა",
                curl: "მოხრა",
                press: "აწევა ზემოთ",
                extension: "გაშლა",
                fly: "განზე გაშლა",
                raise: "აწევა",
                dip: "ორძელზე აზიდვა",
                deadlift: "მკვდარი წევა",
                dumbbell: "ჰანტელით",
                barbell: "შტანგით",
                cable: "ბლოკზე",
                machine: "ტრენაჟორზე",
                bodyweight: "საკუთარი წონით",
                seated: "მჯდომარე",
                standing: "მდგომარე",
                lying: "მწოლიარე",
                incline: "დახრილზე",
                decline: "უარყოფით დახრილზე",
                "close-grip": "ვიწრო მოჭიდებით",
                "wide-grip": "ფართო მოჭიდებით",
                "reverse-grip": "უკუმოჭიდებით",
                "one arm": "ცალი ხელით",
                chest: "მკერდის",
                back: "ზურგის",
                shoulder: "მხრის",
                leg: "ფეხის",
                arm: "ხელის",
                triceps: "ტრიცეპსის",
                biceps: "ბიცეპსის",
                calf: "წვივის",
                abdominal: "პრესის",
                kneeling: "მუხლებზე მდგომი",
                "front lever": "წინა ლევერი",
                "muscle-up": "მასლაპი",
                // specific parts
                cardio: "კარდიო",
                neck: "კისერი",
                waist: "წელი",
                "lower legs": "ქვედა კიდურები",
                "upper legs": "ზედა კიდურები",
                "upper arms": "ზედა მკლავები",
                "lower arms": "ქვედა მკლავები",
              };

              const transliterate = (str) => {
                let s = str.toLowerCase();
                for (const [eng, ka] of Object.entries(engToKa)) {
                  if (s.includes(eng)) {
                    s = s.replace(new RegExp(eng, "g"), ka);
                  }
                }
                return s.charAt(0).toUpperCase() + s.slice(1);
              };

              translatedName = transliterate(exercise.name);
              translatedTarget = transliterate(
                exercise.targetMuscles?.[0] || "",
              );
              translatedEquipment = transliterate(exercise.equipments || "");
              // Since instructions can be complex, doing lightweight keyword replacement
              translatedInstructions = translatedInstructions.map((ins) => {
                let s = ins;
                for (const [eng, ka] of Object.entries(engToKa)) {
                  s = s.replace(new RegExp(eng, "gi"), ka);
                }
                return s;
              });
            }

            return (
              <>
                {/* Header */}
                <View style={detailStyles.header}>
                  <Pressable
                    onPress={handleGoBack}
                    style={detailStyles.backButton}>
                    <Ionicons
                      name="arrow-back-circle"
                      size={32}
                      color="#47b977"
                    />
                  </Pressable>
                  <Text
                    style={detailStyles.exerciseName}
                    adjustsFontSizeToFit
                    numberOfLines={2}>
                    {translatedName}
                  </Text>
                </View>

                {/* Media Section */}
                <View style={detailStyles.mediaContainer}>
                  {/* {field != "WorkoutScreen" ? (
                <Video
                  source={{ uri: exercise.videoUrl }}
                  style={detailStyles.media}
                  useNativeControls
                  resizeMode="contain"
                  shouldPlay={false}
                />
              ) : (
                <Image
                  source={{ uri: exercise.gifUrl }}
                  style={detailStyles.media}
                  contentFit="contain"
                  transition={300}
                />
              )} */}
                  <Image
                    source={{ uri: exercise.gifUrl }}
                    style={detailStyles.media}
                    contentFit="contain"
                    transition={300}
                  />
                </View>

                {/* Info Pills */}
                <View style={detailStyles.infoPills}>
                  <View style={detailStyles.infoPill}>
                    <Text style={detailStyles.infoPillLabel}>
                      Target Muscle
                    </Text>
                    <Text style={detailStyles.infoPillValue}>
                      {translatedTarget}
                    </Text>
                  </View>
                  <View style={detailStyles.infoPill}>
                    <Text style={detailStyles.infoPillLabel}>Equipment</Text>
                    <Text style={detailStyles.infoPillValue}>
                      {translatedEquipment}
                    </Text>
                  </View>
                </View>

                {/* Instructions */}
                <View style={detailStyles.instructionsContainer}>
                  <Text style={detailStyles.instructionsTitle}>
                    Instructions
                  </Text>
                  {translatedInstructions?.map((item, index) => (
                    <View key={index} style={detailStyles.instructionItem}>
                      <View style={detailStyles.instructionNumber}>
                        <Text style={detailStyles.instructionNumberText}>
                          {index + 1}
                        </Text>
                      </View>
                      <Text style={detailStyles.instructionText}>
                        {item.replace(/^Step:\d+\s*/, "")}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            );
          })()
        )}
      </ScrollView>
    </SafeScreen>
  );
};

export default ExerciseDetail;

const detailStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 12,
  },
  exerciseName: {
    ...styles.defaultText,
    fontSize: 24,
    fontWeight: "700",
    flex: 1,
    color: "#47b977",
  },
  mediaContainer: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#161c43ff",
    padding: 2,
  },
  media: {
    width: "100%",
    height: 320,
    borderRadius: 14,
  },
  infoPills: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 24,
  },
  infoPill: {
    flex: 1,
    backgroundColor: "#161c43ff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#47b977",
    alignItems: "center",
  },
  infoPillLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  infoPillValue: {
    color: "#47b977",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  instructionsContainer: {
    width: "100%",
    backgroundColor: "#161c43ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignContent: "center",
  },
  instructionsTitle: {
    ...styles.defaultText,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#47b977",
  },
  instructionItem: {
    borderWidth: 2,
    borderColor: "#334155",
    paddingBlock: 12,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 12,
    borderBottomWidth: 1,
  },
  instructionNumber: {
    position: "absolute",
    top: -15,
    left: -28,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#47b977",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  instructionNumberText: {
    color: "#0B1026",
    fontWeight: "700",
    fontSize: 12,
  },
  instructionText: {
    ...styles.defaultText,
    flex: 1,
    lineHeight: 20,
    color: "#e2e8f0",
  },
});
