import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorge from "@react-native-async-storage/async-storage";
import { filterPlanByDays, PresetPlans } from "../api/PreSetPlans";

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [UserProfile, setUserProfile] = useState({
    workoutGoal: null,
    age: null,
    height: null,
    weight: null,
    DailyWorkoutTime: null,
    PlanDuration: null,
    equipment: [],
    level: null,
  });
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [plan, setPlan] = useState([]);
  const completeOnboarding = () => setIsOnboardingCompleted(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const profileData = await AsyncStorge.getItem("UserProfile");
        const historyData = await AsyncStorge.getItem("WorkoutHistory");
        const planData = await AsyncStorge.getItem("userPlan");
        const onboardingStatus = await AsyncStorge.getItem(
          "OnboardingCompleted"
        );
        if (profileData) setUserProfile(JSON.parse(profileData));
        if (historyData) setWorkoutHistory(JSON.parse(historyData));
        if (planData) setPlan(JSON.parse(planData));
        if (onboardingStatus === "true") setIsOnboardingCompleted(true);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setHydrated(true);
      }
    };
    loadData();
  }, []);
  useEffect(() => {
    if (hydrated) {
      AsyncStorge.setItem("UserProfile", JSON.stringify(UserProfile));
      console.log("UserProfile updated", UserProfile);
    }
  }, [UserProfile]);
  useEffect(() => {
    if (hydrated) {
      AsyncStorge.setItem("WorkoutHistory", JSON.stringify(workoutHistory));
      console.log("WorkoutHistory updated", workoutHistory);
    }
  }, [workoutHistory]);
  useEffect(() => {
    if (hydrated) {
      AsyncStorge.setItem(
        "OnboardingCompleted",
        isOnboardingCompleted ? "true" : "false"
      );
      console.log("Onboarding status updated", isOnboardingCompleted);
    }
  }, [isOnboardingCompleted]);
  useEffect(() => {
    if (!hydrated) return;
    if (
      !UserProfile.level ||
      !UserProfile.workoutGoal ||
      !UserProfile.PlanDuration
    )
      return;
    let planFromPreset =
      PresetPlans[0]?.[UserProfile.level]?.[UserProfile.workoutGoal] || [];
    // planFromPreset = filterPlanByDays(
    //   planFromPreset,
    //   parseInt(UserProfile.PlanDuration) || 0
    // );
    console.log("Filtered Plan:", planFromPreset);
    if (planFromPreset) {
      setPlan(planFromPreset);
      AsyncStorge.setItem("userPlan", JSON.stringify(planFromPreset));
    } else {
      console.warn(
        "No plan found for:",
        UserProfile.level,
        UserProfile.workoutGoal
      );
      setPlan([]);
      AsyncStorge.removeItem("userPlan");
    }
  }, [UserProfile.level, UserProfile.workoutGoal, hydrated]);

  const clearWorkoutData = async () => {
    try {
      await AsyncStorge.removeItem("WorkoutHistory");
      setWorkoutHistory([]);
    } catch (error) {
      console.error("Failed to clear workout data", error);
    }
  };
  const clearAllData = async () => {
    try {
      await AsyncStorge.clear();
      setUserProfile({
        workoutGoal: null,
        age: null,
        height: null,
        weight: null,
        DailyWorkoutTime: null,
        PlanDuration: null,
        equipment: [],
        level: null,
      });
      setWorkoutHistory([]);
      setIsOnboardingCompleted(false);
    } catch (error) {
      console.error("Failed to clear all data", error);
    }
  };
  const value = {
    workoutHistory,
    setWorkoutHistory,
    UserProfile,
    setUserProfile,
    plan,
    hydrated,
    updateGoal: (goal) =>
      setUserProfile((prev) => ({ ...prev, workoutGoal: goal })),
    updateAge: (age) => setUserProfile((prev) => ({ ...prev, age })),
    // updateFitnessLevel: (level) =>
    //   setUserProfile((prev) => ({ ...prev, fitnessLevel: level })),
    updateEquipment: (equipment) =>
      setUserProfile((prev) => ({ ...prev, equipment })),
    updateDailyWorkoutTime: (time) =>
      setUserProfile((prev) => ({ ...prev, DailyWorkoutTime: time })),
    updatePlanDuration: (duration) =>
      setUserProfile((prev) => ({ ...prev, PlanDuration: duration })),
    updateHeight: (height) => setUserProfile((prev) => ({ ...prev, height })),
    updateWeight: (weight) => setUserProfile((prev) => ({ ...prev, weight })),
    isOnboardingCompleted,
    completeOnboarding,
    addWorkout: (workout) => setWorkoutHistory((prev) => [...prev, workout]),
    clearWorkoutData,
    updateLevel: (level) => setUserProfile((prev) => ({ ...prev, level })),
    clearAllData,
  };
  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};
export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};
