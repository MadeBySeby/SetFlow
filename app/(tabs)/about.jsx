import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SafeScreen from "../components/SafeScreen";
import styles from "../components/style";
import { useWorkout } from "../contexts/WorkoutContext";

const About = () => {
  const {
    UserProfile,
    clearAllData,
    updateLevel,
    updateGoal,
    updateAge,
    updateHeight,
    updateWeight,
    updatePlanDuration,
    updateEquipment,
    updateLanguage,
    setUserProfile,
  } = useWorkout();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tempPlanDays, setTempPlanDays] = useState([]);
  const selectedDays = UserProfile?.DailyWorkoutTime || [];

  const safeInt = (value, fallback = 0) => {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const safeFloat = (value, fallback = 0) => {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const LEVEL_OPTIONS = [
    { label: t("beginner"), value: "beginner" },
    { label: t("intermediate"), value: "intermediate" },
    { label: t("advanced"), value: "advanced" },
  ];
  const GOAL_OPTIONS = [
    { label: t("weightLoss"), value: "weightLoss" },
    { label: t("muscleGain"), value: "muscleGain" },
    { label: t("endurance"), value: "endurance" },
  ];
  const Equipment = [
    { label: t("gymMembership"), value: "Gym Membership" },
    { label: t("noEquipment"), value: "No Equipment" },
  ];
  const LANGUAGE_OPTIONS = [
    { label: t("english"), value: "en" },
    { label: t("georgian"), value: "ka" },
  ];
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
  const PLAN_DURATION_OPTIONS = [
    { label: t("pickDays"), value: "" },
    { label: `1 ${t("day")}`, value: "1" },
    { label: `2 ${t("days")}`, value: "2" },
    { label: `3 ${t("days")}`, value: "3" },
    { label: `4 ${t("days")}`, value: "4" },
    { label: `5 ${t("days")}`, value: "5" },
    { label: `6 ${t("days")}`, value: "6" },
    { label: t("everyDay"), value: "7" },
  ];

  const getPickerOptions = (key) => {
    if (key === "level") return LEVEL_OPTIONS;
    if (key === "workoutGoal") return GOAL_OPTIONS;
    if (key === "planDuration") return PLAN_DURATION_OPTIONS.slice(1);
    if (key === "language") return LANGUAGE_OPTIONS;
    return undefined;
  };

  const normalizePickerValue = (value, key) => {
    if (!value) return "";
    const options = getPickerOptions(key);
    if (!options) return String(value);
    const match = options.find(
      (option) => option.value.toLowerCase() === String(value).toLowerCase(),
    );
    return match ? match.value : "";
  };

  const formatDisplayValue = (value, key) => {
    if (!value) return "-";
    const options = getPickerOptions(key);
    if (!options) return value;
    const match = options.find(
      (option) => option.value.toLowerCase() === String(value).toLowerCase(),
    );
    return match ? match.label : value;
  };

  const info = [
    {
      key: "workoutGoal",
      label: t("workoutGoalLabel"),
      value: UserProfile?.workoutGoal ?? "",
      updater: updateGoal,
      parser: (val) => val?.trim?.() ?? "",
    },
    {
      key: "age",
      label: t("ageLabel"),
      value: UserProfile?.age ?? "",
      updater: updateAge,
      keyboardType: "number-pad",
      parser: (val, prev) => safeInt(val, prev ?? 0),
    },
    {
      key: "height",
      label: t("heightLabel"),
      value: UserProfile?.height ?? "",
      updater: updateHeight,
      keyboardType: "numeric",
      parser: (val, prev) => safeFloat(val, prev ?? 0),
    },
    {
      key: "weight",
      label: t("weightLabel"),
      value: UserProfile?.weight ?? "",
      updater: updateWeight,
      keyboardType: "numeric",
      parser: (val, prev) => safeFloat(val, prev ?? 0),
    },
    {
      key: "level",
      label: t("fitnessLevel"),
      value: UserProfile?.level ?? "",
      updater: updateLevel,
      parser: (val) => val?.trim?.() ?? "",
    },
    {
      key: "planDuration",
      label: t("planDuration"),
      value: UserProfile?.PlanDuration ?? "",
      updater: updatePlanDuration,
      parser: (val) => val?.trim?.() ?? "",
    },
    {
      key: "equipment",
      label: t("equipmentLabel"),
      value: UserProfile?.equipment ?? "",
      updater: updateEquipment,
      parser: (val) => val?.trim?.() ?? "",
    },
    {
      key: "language",
      label: t("language"),
      value: UserProfile?.language ?? "en",
      updater: updateLanguage,
      parser: (val) => val?.trim?.() ?? "",
    },
  ];

  const handleOpenModal = (field) => {
    console.log("Selected field:", field);
    setSelectedField(field);
    setInputValue(
      field?.value === undefined || field?.value === null
        ? ""
        : normalizePickerValue(field.value, field.key),
    );
    setTempPlanDays(field?.key === "planDuration" ? [...selectedDays] : []);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedField(null);
    setInputValue("");
    setTempPlanDays([]);
  };

  const handleSaveField = () => {
    if (!selectedField) return;
    const parsedValue = selectedField.parser
      ? selectedField.parser(inputValue, selectedField.value)
      : inputValue;
    if (selectedField.key === "planDuration") {
      const limit =
        parsedValue === "7"
          ? weekdayValues.length
          : parseInt(parsedValue || "0", 10) || 0;
      const normalizedDays =
        parsedValue === "7" ? weekdayValues : tempPlanDays.slice(0, limit);
      setUserProfile((prev) => ({
        ...prev,
        PlanDuration: parsedValue,
        DailyWorkoutTime: normalizedDays,
      }));
      handleCloseModal();
      return;
    }
    selectedField.updater?.(parsedValue);
    handleCloseModal();
  };

  const handleModalPlanDurationChange = (value) => {
    setInputValue(value);
    if (value === "7") {
      setTempPlanDays(weekdayValues);
      return;
    }
    if (!value) {
      setTempPlanDays([]);
      return;
    }
    const limit = parseInt(value || "0", 10) || 0;
    setTempPlanDays((prev) => prev.filter((_, index) => index < limit));
  };

  const handleToggleTempDay = (dayValue) => {
    if (inputValue === "7") return;
    const limit = parseInt(inputValue || "0", 10) || 0;
    if (!limit) {
      alert("Select a plan duration first");
      return;
    }
    setTempPlanDays((prev) => {
      const exists = prev.includes(dayValue);
      if (exists) {
        return prev.filter((day) => day !== dayValue);
      }
      if (prev.length >= limit) {
        alert(`You can only select up to ${limit} days`);
        return prev;
      }
      return [...prev, dayValue];
    });
  };

  const footerComponent = () => (
    <View style={aboutStyles.footer}>
      <Pressable onPress={() => clearAllData()}>
        <Text
          style={{
            ...styles.workoutGoalButton,
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
            borderColor: "red",
          }}>
          {t("clearAllData")}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeScreen style={{ ...styles.Background, flex: 1 }}>
      <Text style={styles.defaultText}>{t("aboutYou")}</Text>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
        <FlatList
          data={info}
          style={{ width: "100%", paddingBottom: 0 }}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={footerComponent}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpenModal(item)}>
              <View
                style={{
                  ...styles.workoutGoalButton,
                  margin: 10,
                  alignSelf: "center",
                }}>
                <Text style={styles.defaultText}>
                  {item.label}: {formatDisplayValue(item.value, item.key)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {selectedField ? (
        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={handleCloseModal}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}>
            <View
              style={{
                width: 320,
                padding: 24,
                backgroundColor: "white",
                borderRadius: 12,
                alignItems: "stretch",
                position: "relative",
              }}>
              <Pressable
                onPress={handleCloseModal}
                style={{ position: "absolute", top: 12, right: 12 }}>
                <Ionicons name="close-circle" size={28} color="#47b977" />
              </Pressable>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 16,
                  textAlign: "center",
                }}>
                {t("update")} {selectedField.label}
              </Text>
              {selectedField.key === "level" ||
              selectedField.key === "workoutGoal" ||
              selectedField.key === "equipment" ||
              selectedField.key === "language" ||
              selectedField.key === "planDuration" ? (
                <>
                  <Picker
                    style={{ color: "#222", width: "100%" }}
                    mode="dropdown"
                    selectedValue={inputValue}
                    onValueChange={
                      selectedField.key === "planDuration"
                        ? handleModalPlanDurationChange
                        : setInputValue
                    }>
                    <Picker.Item
                      label={
                        selectedField.key === "level"
                          ? "Select Fitness Level"
                          : selectedField.key === "workoutGoal"
                            ? "Select Workout Goal"
                            : selectedField.key === "equipment"
                              ? "Select Equipment"
                              : selectedField.key === "language"
                                ? "Select Language"
                                : "Select Plan Duration"
                      }
                      value=""
                      color="#ccc"
                    />
                    {(selectedField.key === "level"
                      ? LEVEL_OPTIONS
                      : selectedField.key === "workoutGoal"
                        ? GOAL_OPTIONS
                        : selectedField.key === "equipment"
                          ? Equipment
                          : selectedField.key === "language"
                            ? LANGUAGE_OPTIONS
                            : selectedField.key === "planDuration"
                              ? PLAN_DURATION_OPTIONS.slice(1)
                              : []
                    ).map((option) => (
                      <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        color="#111"
                      />
                    ))}
                  </Picker>
                  {selectedField.key === "planDuration" ? (
                    <View style={aboutStyles.modalDayContainer}>
                      <Text style={aboutStyles.modalDayTitle}>
                        {inputValue === "7"
                          ? "Every day will be scheduled automatically."
                          : inputValue
                            ? `Select up to ${
                                parseInt(inputValue || "0", 10) || 0
                              } days to train`
                            : "Choose a plan duration to pick specific days."}
                      </Text>
                      {inputValue && inputValue !== "7" ? (
                        <View style={aboutStyles.dayChipWrap}>
                          {weekdays.map((day) => {
                            const isSelected = tempPlanDays.includes(day.value);
                            return (
                              <Pressable
                                key={day.value}
                                onPress={() => handleToggleTempDay(day.value)}
                                style={[
                                  aboutStyles.dayChip,
                                  isSelected && aboutStyles.dayChipSelected,
                                ]}>
                                <Text
                                  style={[
                                    aboutStyles.dayChipText,
                                    isSelected &&
                                      aboutStyles.dayChipTextSelected,
                                  ]}>
                                  {day.label}
                                </Text>
                              </Pressable>
                            );
                          })}
                        </View>
                      ) : null}
                    </View>
                  ) : null}
                </>
              ) : (
                <TextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder={`Enter ${selectedField.label}`}
                  keyboardType={selectedField.keyboardType ?? "default"}
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    fontSize: 16,
                    marginBottom: 20,
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Pressable
                  onPress={handleCloseModal}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#999",
                    marginRight: 8,
                    alignItems: "center",
                  }}>
                  <Text style={{ color: "#333", fontWeight: "600" }}>
                    {t("cancel")}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSaveField}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 8,
                    backgroundColor: "#47b977",
                    marginLeft: 8,
                    alignItems: "center",
                  }}>
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    {t("save")}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </SafeScreen>
  );
};

export default About;

const aboutStyles = StyleSheet.create({
  footer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 40,
  },
  modalDayContainer: {
    marginTop: 20,
  },
  modalDayTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
    fontWeight: "600",
  },
  dayChipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayChip: {
    borderWidth: 1,
    borderColor: "#47b977",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    marginRight: 10,
    flex: 1,
    flexBasis: "30%",
    alignItems: "center",
  },
  dayChipSelected: {
    backgroundColor: "#47b977",
  },
  dayChipText: {
    color: "#47b977",
    fontFamily: "Nunito-Bold",
  },
  dayChipTextSelected: {
    color: "#0B1026",
  },
});
