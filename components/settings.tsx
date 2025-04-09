import {
  View,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6 w-6 h-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && (
      <Image source={icons.rightArrow} className="size-5 h-5 w-5" />
    )}
  </TouchableOpacity>
);

export default SettingItem;
