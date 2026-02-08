import "react-native-reanimated";
import { Slot, useRouter } from "expo-router";
import { WorkoutProvider } from "./contexts/WorkoutContext";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Caveat-Bold": require("./assets/fonts/Caveat-Bold.ttf"),
    "Caveat-Regular": require("./assets/fonts/Caveat-Regular.ttf"),
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(
          "Notification tapped:",
          response.notification.request.content.data,
        );
      },
    );
    return () => subscription.remove();
  }, []);
  return (
    <WorkoutProvider>
      <Slot />
    </WorkoutProvider>
  );
}
