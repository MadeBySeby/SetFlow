import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeScreen from "../components/SafeScreen";
import styles from "../components/style";
import { presetPrograms } from "../api/PreSetPrograms";
import ProgramWorkoutCard from "../components/ProgramWorkoutCard";
import { ScrollView } from "moti";
import WorkoutScreen from "../(onboarding)/WorkoutScreen";
const Programs = () => {
  return (
    <SafeScreen
      excludeBottomSafeArea={false}
      style={{ ...styles.Background, flex: 1 }}>
      <ScrollView style={{ padding: 10, width: "100%", height: "auto" }}>
        {presetPrograms.workouts.map((workout, index) => (
          <ProgramWorkoutCard key={index} workout={workout} />
        ))}
        <View
          style={{
            ...styles.Background,
            flex: 1,
            height: "100%",
            width: "100%",
            maxWidth: "100%",
          }}>
          <Text style={styles.defaultText}>Programs Screen - Coming Soon!</Text>
        </View>
        <Modal
          visible={false}
          animationType="slide"
          presentationStyle="fullScreen"
          onRequestClose={() => {}}>
          <WorkoutScreen
            currentExercise={[]}
            setWorkoutModalVisible={() => {}}
            onClose={() => {}}
          />
        </Modal>
      </ScrollView>
    </SafeScreen>
  );
};

export default Programs;
