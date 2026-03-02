import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import AnimatedItem from "../animations/AnimatedItem";
import ButtonAnimation from "../animations/ButtonAnimation";
import PrimaryCTAButton from "../components/PrimaryCTAButton";
import SafeScreen from "../components/SafeScreen";
import style from "../components/style";
import { useWorkout } from "../contexts/WorkoutContext";

const ScreenOne = () => {
  const { updateGoal, updateLanguage, UserProfile } = useWorkout();
  const { t } = useTranslation();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [clicked, setClicked] = useState(false);

  const currentLang = UserProfile?.language || "en";

  const goalKeys = ["muscleGain", "weightLoss", "endurance"];

  const handleSelectGoal = (goalKey) => {
    updateGoal(goalKey);
    setClicked(true);
    setSelectedGoal(goalKey);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleToggleLanguage = () => {
    const newLang = currentLang === "en" ? "ka" : "en";
    updateLanguage(newLang);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeScreen style={style.Background}>
      {/* Language Toggle — top right */}
      <TouchableOpacity
        onPress={handleToggleLanguage}
        style={{
          position: "absolute",
          top: 16,
          right: 20,
          zIndex: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 20,
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.2)",
        }}>
        <Text style={{ ...style.defaultText, fontSize: 13, fontWeight: "600" }}>
          {currentLang === "en" ? "🇬🇧 EN" : "🇬🇪 ქარ"}
        </Text>
      </TouchableOpacity>

      <AnimatedItem Screen={"ScreenOne"}>
        <Text
          numberOfLines={3}
          style={{
            ...style.TitleText,
            textAlign: "center",
            width: "100%",
            flexShrink: 1,
          }}>
          {t("selectGoal")}
        </Text>
        <View
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            gap: 20,
          }}>
          {goalKeys.map((goalKey) => {
            const isSelected = selectedGoal === goalKey;
            return (
              <ButtonAnimation
                key={goalKey}
                clicked={isSelected}
                screen={"ScreenOne"}>
                <Pressable
                  onPress={() => handleSelectGoal(goalKey)}
                  style={{
                    ...style.workoutGoalButton,
                    backgroundColor: isSelected ? "#47b977" : "transparent",
                    width: "80%",
                    paddingVertical: 24,
                    paddingHorizontal: 30,
                  }}>
                  <Text style={{ ...style.defaultText, fontSize: 20 }}>
                    {t(goalKey)}
                  </Text>
                </Pressable>
              </ButtonAnimation>
            );
          })}
        </View>

        {clicked && (
          <PrimaryCTAButton
            style={{
              marginTop: 40,
              alignSelf: "center",
              paddingHorizontal: 40,
              shadowOpacity: 0,
              shadowRadius: 0,
              shadowOffset: { width: 0, height: 0 },
              backgroundColor: "transparent",
            }}
            label={t("continue")}
            textColor="white"
            borderColor="#47b977"
            onPress={() => {
              router.push("ScreenTwo");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
        )}
      </AnimatedItem>
    </SafeScreen>
  );
};

export default ScreenOne;
