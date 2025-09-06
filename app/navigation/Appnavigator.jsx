import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useWorkout } from "../contexts/WorkoutContext";
import OnboardingNavigator from "./OnboardingNavigator";
import TabsNavigator from "./TabsNavigator";
import { WorkoutProvider } from "../contexts/WorkoutContext";
import styles from "../style";
import { NavigationContainer } from "@react-navigation/native";
import ExerciseDetail from "../screens/ExerciseDetail";
const Stack = createNativeStackNavigator();

function AppStack() {
  const { UserProfile, isOnboardingCompleted } = useWorkout();
  const isComplete = Object.values(UserProfile).every(
    (value) => value !== null && value !== "" && isOnboardingCompleted
  );
  // const isComplete = true;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isComplete ? (
        <Stack.Screen name="Tabs" component={TabsNavigator} />
      ) : (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      )}
      <Stack.Screen
        name="ExerciseDetail"
        component={ExerciseDetail}
        options={{
          // headerShown: false,
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Exercise Detail",
          headerStyle: {
            backgroundColor: "#47b977",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}
const StackNavigator = () => {
  return (
    <WorkoutProvider>
      <AppStack />
    </WorkoutProvider>
  );
};
export default StackNavigator;
