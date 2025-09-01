import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        // styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default SafeScreen;
