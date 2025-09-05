import React, { createContext, useContext, useState } from "react";
const WorkoutContext = createContext();
export const WorkoutProvider = ({ children }) => {
  const [UserProfile, setUserProfile] = useState({
    workoutGoal: null,
    age: null,
    height: null,
    weight: null,
    // fitnessLevel: null,
    DailyWorkoutTime: null,
    PlanDuration: null,
    equipment: [],
  });
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const completeOnboarding = () => setIsOnboardingCompleted(true);
  const value = {
    UserProfile,
    setUserProfile,
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
