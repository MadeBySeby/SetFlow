import AsyncStorge from "@react-native-async-storage/async-storage";
import { Widget } from "expo-widgets";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchPresetPlan } from "../api/presetPlansApi";
import i18n from "../i18n";

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [UserProfile, setUserProfile] = useState({
    workoutGoal: null,
    age: null,
    height: null,
    weight: null,
    DailyWorkoutTime: [],
    PlanDuration: null,
    equipment: [],
    level: null,
    language: "en",
  });
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [plan, setPlan] = useState([]);
  const completeOnboarding = () => setIsOnboardingCompleted(true);
  const [restartWorkoutValue, setRestartWorkoutValue] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const profileData = await AsyncStorge.getItem("UserProfile");
        const historyData = await AsyncStorge.getItem("WorkoutHistory");
        const planData = await AsyncStorge.getItem("userPlan");
        const onboardingStatus = await AsyncStorge.getItem(
          "OnboardingCompleted",
        );
        if (profileData) {
          const parsed = JSON.parse(profileData);
          setUserProfile(parsed);
          if (parsed.language) {
            i18n.changeLanguage(parsed.language);
          }
        }
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

      // Sync data to the FlowWidget
      try {
        const todayStr = new Date().toISOString().split("T")[0];
        const todaysWorkouts = workoutHistory.filter(
          (w) => w.date === todayStr,
        );

        // Map to a lightweight structure to prevent hitting memory limits
        const widgetData = todaysWorkouts.map((w) => ({
          type: w.type,
          exercises: Array.isArray(w.data)
            ? w.data.map((ex) => ex.name || "Exercise").join(", ")
            : "Workout",
        }));

        const widget = new Widget("FlowWidget");
        widget.updateSnapshot({ workouts: widgetData });
        console.log("FlowWidget snapshot updated", widgetData);
      } catch (err) {
        console.warn("Failed to update FlowWidget", err);
      }
    }
  }, [workoutHistory]);
  useEffect(() => {
    if (hydrated) {
      AsyncStorge.setItem(
        "OnboardingCompleted",
        isOnboardingCompleted ? "true" : "false",
      );
      console.log("Onboarding status updated", isOnboardingCompleted);
    }
  }, [isOnboardingCompleted]);
  useEffect(() => {
    if (!hydrated) return;
    const equipmentKey = (UserProfile.equipment || "")
      .toString()
      .split(" ")
      .join("");
    if (
      !UserProfile.level ||
      !UserProfile.workoutGoal ||
      !UserProfile.PlanDuration ||
      !equipmentKey
    )
      return;

    const loadPlan = async () => {
      try {
        const rows = await fetchPresetPlan(
          UserProfile.level,
          UserProfile.equipment,
          UserProfile.workoutGoal,
        );

        // Filter to only the number of weeks that match PlanDuration
        const duration = parseInt(UserProfile.PlanDuration) || 0;
        // Each week object has `duration` days; slice to requested weeks
        const filtered =
          duration > 0
            ? rows.slice(0, Math.ceil((duration * 4) / 7) || rows.length)
            : rows;

        if (filtered && filtered.length > 0) {
          setPlan(filtered);
          AsyncStorge.setItem("userPlan", JSON.stringify(filtered));
        } else {
          console.warn(
            "No plan found in Supabase for:",
            UserProfile.level,
            UserProfile.workoutGoal,
          );
          setPlan([]);
          AsyncStorge.removeItem("userPlan");
        }
      } catch (err) {
        console.error(
          "Failed to load plan from Supabase, using cached plan.",
          err,
        );
        // If fetch fails, keep whatever is in AsyncStorage (already loaded on hydrate)
      }
    };

    loadPlan();
  }, [
    UserProfile.level,
    UserProfile.workoutGoal,
    UserProfile.PlanDuration,
    UserProfile.equipment,
    hydrated,
  ]);

  const clearWorkoutData = async () => {
    try {
      console.log("workoutHistory before clearing:", workoutHistory);
      await AsyncStorge.removeItem("WorkoutHistory");
      setWorkoutHistory([]);
    } catch (error) {
      console.error("Failed to clear workout data", error);
    }
  };
  const clearExerciseData = async () => {
    try {
      console.log("exercise data before clearing:", workoutHistory);
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
        DailyWorkoutTime: [],
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
    updateDailyWorkoutTime: (day) =>
      setUserProfile((prev) => {
        const days = prev.DailyWorkoutTime || [];
        const exists = days.includes(day);

        return {
          ...prev,
          DailyWorkoutTime: exists
            ? days.filter((d) => d !== day)
            : [...days, day],
        };
      }),
    clearDailyWorkoutTime: () =>
      setUserProfile((prev) => ({ ...prev, DailyWorkoutTime: [] })),
    updatePlanDuration: (duration) =>
      setUserProfile((prev) => ({ ...prev, PlanDuration: duration })),
    updateHeight: (height) => setUserProfile((prev) => ({ ...prev, height })),
    updateWeight: (weight) => setUserProfile((prev) => ({ ...prev, weight })),
    isOnboardingCompleted,
    completeOnboarding,
    addWorkout: (workout, date, type = "Normal") => {
      const workoutDate =
        date || workout?.date || new Date().toISOString().split("T")[0];
      setWorkoutHistory((prev) => [
        ...prev,
        { date: workoutDate, type, data: workout },
      ]);
    },
    clearWorkoutData,
    updateLevel: (level) => setUserProfile((prev) => ({ ...prev, level })),
    updateLanguage: (lang) => {
      setUserProfile((prev) => ({ ...prev, language: lang }));
      i18n.changeLanguage(lang);
    },
    clearAllData,
    restartWorkoutValue,
    setRestartWorkoutValue,
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
