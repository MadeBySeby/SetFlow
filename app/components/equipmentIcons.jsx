import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export const EquipmentIcons = {
  "body weight": (
    <MaterialCommunityIcons name="human-greeting" size={24} color="#009e42ff" />
  ),
  dumbbell: (
    <MaterialCommunityIcons name="dumbbell" size={24} color="#47b977" />
  ),
  barbell: (
    <MaterialCommunityIcons name="weight-lifter" size={24} color="#E63946" />
  ),
  kettlebell: (
    <MaterialCommunityIcons name="kettlebell" size={24} color="#3B82F6" />
  ),
  cable: <MaterialCommunityIcons name="cable-data" size={24} color="#8B5CF6" />,
  mat: <MaterialCommunityIcons name="yoga" size={24} color="#F97316" />,
};

export const EquipmentIconsExample = ({ equipment }) => {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {equipment.map((eq, idx) => (
        <React.Fragment key={idx}>
          {EquipmentIcons[eq.toLowerCase()] || null}
        </React.Fragment>
      ))}
    </View>
  );
};
