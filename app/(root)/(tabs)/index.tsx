import { Link } from "expo-router";
import { StatusBar, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className=" text-4xl font-bold text-danger font-rubik-extrabold mt-10 ">
        NativeWind is working!
      </Text>

      <View className="flex-row gap-4 mt-2">
        <Link href="/sign-in"> Sign In </Link>
        <Link href="/explore"> Explore </Link>
        <Link href="/profile"> Profile </Link>
        <Link href="/properties/1"> Property </Link>
      </View>

      <StatusBar />
    </View>
  );
}
