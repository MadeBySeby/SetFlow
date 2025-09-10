import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenOne from "../screens/ScreenOne";
import ScreenTwo from "../screens/ScreenTwo";
import PlanDurationScreen from "../screens/PlanDurationScreen";
import PersonalDetailsScreen from "../screens/PersonalDetailsScreen";
import styles from "../style";
import LevelScreen from "../screens/LevelScreen";

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#47b977",
        headerShown: true,
        headerTitle: "SetFlow",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: styles.Background.backgroundColor,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTitleStyle: { color: "white" },
        headerShadowVisible: false,
      }}>
      <Stack.Screen name="ScreenOne" component={ScreenOne} />
      <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
      <Stack.Screen
        // options={{ headerBackVisible: false, gestureEnabled: false }}
        name="PlanDurationScreen"
        component={PlanDurationScreen}
      />
      <Stack.Screen
        name="PersonalDetailsScreen"
        component={PersonalDetailsScreen}
      />
      <Stack.Screen name="LevelScreen" component={LevelScreen} />
    </Stack.Navigator>
  );
}
