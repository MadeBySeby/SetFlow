import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children, style, excludeBottomSafeArea = false }) => {
  const insets = useSafeAreaInsets();
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const backgroundColor = flattenedStyle.backgroundColor || "#0B1026";

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor,
          paddingTop: excludeBottomSafeArea ? 0 : insets.top,
          paddingBottom: excludeBottomSafeArea ? 0 : insets.bottom,
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
