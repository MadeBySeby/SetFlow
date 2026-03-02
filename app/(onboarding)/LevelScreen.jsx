import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import styles from "../components/style";
import { useWorkout } from "../contexts/WorkoutContext";
import { usePushNotifications } from "../hooks/useNotification";

const LevelScreen = () => {
  const { completeOnboarding, updateLevel } = useWorkout();
  usePushNotifications();
  const { t } = useTranslation();

  const handleSelectLevel = async (level) => {
    updateLevel(level);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await completeOnboarding();
    router.replace("/(tabs)");
  };

  const levels = [
    { key: "beginner", value: "beginner" },
    { key: "intermediate", value: "intermediate" },
    { key: "advanced", value: "advanced" },
  ];

  return (
    <View
      style={{
        ...styles.Background,
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
      }}>
      <Text style={[styles.defaultText, { fontSize: 24, marginBottom: 30 }]}>
        {t("selectLevel")}
      </Text>
      {levels.map((level) => (
        <Pressable
          key={level.value}
          style={[styles.workoutGoalButton, { marginBottom: 20 }]}
          onPress={() => handleSelectLevel(level.value)}>
          <Text style={styles.defaultText}>{t(level.key)}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default LevelScreen;
