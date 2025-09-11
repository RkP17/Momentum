import React from "react";
import { View } from "react-native";
import AppText from "@/components/AppText";
import { MaterialIcons } from "@expo/vector-icons";

interface TabBarIconProps {
  focused: boolean;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap; // restricts to valid Material icon names
}

const TabBarIcon = ({ focused, icon, }: TabBarIconProps) => (
  <View style={{ flexDirection: "column", alignItems: "center" }}>
    <MaterialIcons
      name={icon}
      size={24}
      color={focused ? "#9FFF9E" : "#232323"} // active green, inactive gray
    />
    
  </View>
);

export default TabBarIcon;
