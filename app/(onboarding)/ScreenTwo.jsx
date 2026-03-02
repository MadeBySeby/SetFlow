import {
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from "react-native";

import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import GymMembershipIcon from "../../icons/GymMembershipIcon";
import NoEquipmentIcon from "../../icons/NoEquipmentIcon";
import AnimatedItem from "../animations/AnimatedItem";
import SafeScreen from "../components/SafeScreen";
import style from "../components/style";
import { useWorkout } from "../contexts/WorkoutContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ScreenTwo = () => {
  const [showHomeEquipment, setShowHomeEquipment] = useState(false);
  const { updateEquipment } = useWorkout();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);
  const { push } = router;

  const toggleHomeEquipment = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowHomeEquipment(!showHomeEquipment);
  };

  // Map translation keys to equipment values stored in context
  const equipmentOptions = [
    { key: "gymMembership", value: "Gym Membership" },
    { key: "noEquipment", value: "No Equipment" },
  ];

  const handleOnPress = (option) => {
    setSelectedOption(option.value);
    updateEquipment(option.value);
    push("PlanDurationScreen");
    toggleHomeEquipment();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  function getIcon(value) {
    switch (value) {
      case "Gym Membership":
        return (
          <GymMembershipIcon isActive={selectedOption === value} size={40} />
        );
      case "No Equipment":
        return (
          <NoEquipmentIcon isActive={selectedOption === value} size={40} />
        );
      default:
        return null;
    }
  }

  return (
    <SafeScreen style={style.Background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ alignItems: "center" }}>
            <AnimatedItem Screen={"ScreenTwo"}>
              <Text style={style.TitleText}>{t("selectEquipment")}</Text>
              {equipmentOptions.map((option) => (
                <Pressable
                  style={{ ...style.workoutGoalButton, marginTop: 40 }}
                  key={option.value}
                  onPress={() => handleOnPress(option)}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}>
                    <Text style={style.defaultText}>{t(option.key)}</Text>
                    {getIcon(option.value)}
                  </View>
                </Pressable>
              ))}
            </AnimatedItem>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

export default ScreenTwo;
