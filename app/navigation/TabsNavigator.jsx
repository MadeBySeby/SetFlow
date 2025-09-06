import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Tabs/HomeScreen";
import About from "../Tabs/About";
import styles from "../style";
import { StatusBar, Platform } from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
// import WorkoutsScreen from "../screens/tabs/WorkoutsScreen";
// import ProfileScreen from "../screens/tabs/ProfileScreen";

const Tab = createBottomTabNavigator();
export default function TabsNavigator() {
  return (
    <>
      <StatusBar
        barStyle="light-content" // White text/icons
        backgroundColor="#2d3748" // Your background color
        translucent={true} // Allow content under status bar
        hidden={false} // Make sure it's not hidden
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 0,
            elevation: 0,
            height: 70,
            paddingTop: 0,
            paddingBottom: 0,
            paddingHorizontal: 0,
            borderTopWidth: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: "#38d9a9",
          tabBarInactiveTintColor: "#9ca3af",
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="info" size={size} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      </Tab.Navigator>
    </>
  );
}
