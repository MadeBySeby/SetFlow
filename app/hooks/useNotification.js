import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

export const usePushNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  async function registerForPushNotifactionAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStats = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStats = status;
      }
      if (finalStats !== "granted") {
        alert("failed to get push token");
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF2D55",
        });
      }
      return token;
    } else {
      console.log("error: please use a physical device");
    }
  }
  useEffect(() => {
    registerForPushNotifactionAsync().then((token) =>
      token ? setExpoPushToken(token) : null,
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) =>
        setNotification(notification),
      );
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log(response),
      );
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);
  return {
    expoPushToken,
    notification,
    registerForPushNotifactionAsync,
  };
};
