import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styles from "../components/style";
import { useWorkout } from "../contexts/WorkoutContext";
import SafeScreen from "../components/SafeScreen";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import Slider from "@react-native-community/slider";
import PrimaryCTAButton from "../components/PrimaryCTAButton";
const PersonalDetailsScreen = () => {
  const { updateHeight, updateWeight, updateAge, UserProfile } = useWorkout();
  const { age, height, weight } = UserProfile;
  const allFieldsFilled = age && height && weight;
  const metricConfigs = [
    {
      key: "height",
      label: "Height",
      unit: "cm",
      min: 140,
      max: 220,
      value: height,
      onChange: updateHeight,
    },
    {
      key: "weight",
      label: "Weight",
      unit: "kg",
      min: 40,
      max: 150,
      value: weight,
      onChange: updateWeight,
    },
    {
      key: "age",
      label: "Age",
      unit: "yrs",
      min: 10,
      max: 100,
      value: age,
      onChange: updateAge,
    },
  ];

  return (
    <SafeScreen
      style={{
        ...styles.Background,
        flex: 1,
        alignItems: "center",
        width: "100%",
        display: "flex",
        paddingTop: 30,
      }}>
      <Text style={{ ...styles.TitleText, marginTop: 0, textAlign: "center" }}>
        Enter Your Personal Details
      </Text>
      {metricConfigs.map((metric) => {
        const sliderValue = metric.value ?? metric.min;
        const valueLabel = metric.value
          ? `${metric.value} ${metric.unit}`
          : `Slide to set ${metric.label.toLowerCase()}`;

        return (
          <View key={metric.key} style={detailStyles.metricCard}>
            <View style={detailStyles.metricHeader}>
              <Text style={{ ...styles.defaultText, textAlign: "left" }}>
                {metric.label}
              </Text>
              <Text style={detailStyles.metricValue}>{valueLabel}</Text>
            </View>
            <Slider
              style={{ width: "100%" }}
              minimumValue={metric.min}
              maximumValue={metric.max}
              step={1}
              minimumTrackTintColor="#47b977"
              maximumTrackTintColor="rgba(255,255,255,0.2)"
              thumbTintColor="#47b977"
              value={sliderValue}
              onValueChange={(val) => {
                metric.onChange(Math.round(val));
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              onSlidingComplete={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }
            />
            <View style={detailStyles.metricScale}>
              <Text style={detailStyles.scaleText}>{metric.min}</Text>
              <Text style={detailStyles.scaleText}>{metric.max}</Text>
            </View>
          </View>
        );
      })}
      {allFieldsFilled && (
        <PrimaryCTAButton
          style={{ marginTop: 36 }}
          label="Continue"
          onPress={() => {
            router.push("LevelScreen");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
        />
      )}
    </SafeScreen>
  );
};

export default PersonalDetailsScreen;

const detailStyles = StyleSheet.create({
  metricCard: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  metricValue: {
    color: "white",
    fontSize: 20,
    fontFamily: "Nunito-Bold",
  },
  metricScale: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  scaleText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontFamily: "Nunito-Regular",
  },
});
