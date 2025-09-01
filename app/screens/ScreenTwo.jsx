import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeScreen from "../components/SafeScreen";

const ScreenTwo = () => {
  return (
    <SafeScreen style={{ backgroundColor: "black", height: "100%" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "white" }}>ScreenTwo</Text>
      </View>
    </SafeScreen>
  );
};

export default ScreenTwo;

const styles = StyleSheet.create({});
