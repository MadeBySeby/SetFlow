import { Picker } from "@react-native-picker/picker";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import AnimatedItem from "../animations/AnimatedItem";
import ButtonAnimation from "../animations/ButtonAnimation";
import PrimaryCTAButton from "../components/PrimaryCTAButton";
import SafeScreen from "../components/SafeScreen";
import style from "../components/style";
import { useWorkout } from "../contexts/WorkoutContext";
const PlanDurationScreen = () => {
  const {
    UserProfile,
    setUserProfile,
    updateDailyWorkoutTime,
    updatePlanDuration,
    clearDailyWorkoutTime,
  } = useWorkout();
  const { t } = useTranslation();
  const { DailyWorkoutTime, PlanDuration } = UserProfile;

  const weekdays = [
    { label: t("monday"), value: "monday" },
    { label: t("tuesday"), value: "tuesday" },
    { label: t("wednesday"), value: "wednesday" },
    { label: t("thursday"), value: "thursday" },
    { label: t("friday"), value: "friday" },
    { label: t("saturday"), value: "saturday" },
    { label: t("sunday"), value: "sunday" },
  ];
  const weekdayValues = weekdays.map((day) => day.value);
  const pickerTextColor = style?.defaultText?.color ?? "#ffffff";

  const handleSubmit = () => {
    router.push("PersonalDetailsScreen");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <SafeScreen
      excludeBottomSafeArea={true}
      style={{
        ...style.Background,
        flex: 1,
        alignItems: "center",
        width: "100%",
        display: "flex",
        paddingTop: 30,
        // justifyContent: "space-evenly",
      }}>
      <AnimatedItem Screen={"PlanDurationScreen"}>
        <Text style={{ ...style.TitleText, marginTop: 0, padding: 10 }}>
          {t("selectDays")}
        </Text>

        <Picker
          style={{ color: pickerTextColor, width: "80%", textAlign: "center" }}
          dropdownIconColor={pickerTextColor}
          itemStyle={{ color: pickerTextColor }}
          mode="dropdown"
          selectedValue={PlanDuration}
          onValueChange={(itemValue) => {
            updatePlanDuration(itemValue);
            if (itemValue === "7") {
              setUserProfile((prev) => ({
                ...prev,
                DailyWorkoutTime: weekdayValues,
              }));
            } else {
              clearDailyWorkoutTime();
            }
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}>
          <Picker.Item label={t("pickDays")} value="" color={pickerTextColor} />
          <Picker.Item
            label={`1 ${t("day")}`}
            value="1"
            color={pickerTextColor}
          />
          <Picker.Item
            label={`2 ${t("days")}`}
            value="2"
            color={pickerTextColor}
          />
          <Picker.Item
            label={`3 ${t("days")}`}
            value="3"
            color={pickerTextColor}
          />
          <Picker.Item
            label={`4 ${t("days")}`}
            value="4"
            color={pickerTextColor}
          />
          <Picker.Item
            label={`5 ${t("days")}`}
            value="5"
            color={pickerTextColor}
          />
          <Picker.Item
            label={`6 ${t("days")}`}
            value="6"
            color={pickerTextColor}
          />
          <Picker.Item
            label={t("everyDay")}
            value="7"
            color={pickerTextColor}
          />
        </Picker>

        {PlanDuration && PlanDuration !== "7" && (
          <Animated.Text
            entering={ZoomInEasyDown.duration(200)}
            style={{ ...style.defaultText, marginTop: 50 }}>
            {t("selectUpTo", { count: PlanDuration })}
          </Animated.Text>
        )}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap-reverse",
            marginTop: 10,
            padding: 10,
          }}>
          {weekdays.map((day) => {
            const isEveryDay = PlanDuration === "7";
            const isSelected =
              isEveryDay || DailyWorkoutTime.includes(day.value);
            return (
              <ButtonAnimation clicked={isSelected} key={day.value}>
                <Pressable
                  key={day.value}
                  onPress={() => {
                    if (isEveryDay) return;
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

                    if (isSelected) {
                      updateDailyWorkoutTime(day.value);
                    } else if (DailyWorkoutTime.length < PlanDuration) {
                      updateDailyWorkoutTime(day.value);
                    } else {
                      alert(`You can only select up to ${PlanDuration} days`);
                    }
                  }}
                  style={{
                    padding: 10,
                    margin: 5,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#47b977",
                    backgroundColor: isSelected ? "#47b977" : "transparent",
                  }}>
                  <Text style={{ color: isSelected ? "white" : "#47b977" }}>
                    {day.label}
                  </Text>
                </Pressable>
              </ButtonAnimation>
            );
          })}
        </View>

        {PlanDuration && DailyWorkoutTime?.find((day) => day) && (
          <PrimaryCTAButton
            style={{ alignSelf: "center", marginTop: 50 }}
            label={t("continue")}
            onPress={handleSubmit}
          />
        )}
      </AnimatedItem>
    </SafeScreen>
  );
};

export default PlanDurationScreen;
