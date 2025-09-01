import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenOne from "./screens/ScreenOne";
import ScreenTwo from "./screens/ScreenTwo";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScreenOne"
        component={ScreenOne}
        options={{
          headerShown: true,
          headerTitle: "SetFlow",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
            elevation: 0,
          },
          headerTitleStyle: { color: "white" },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ScreenTwo"
        component={ScreenTwo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
