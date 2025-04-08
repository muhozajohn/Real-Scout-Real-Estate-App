import { Link } from "expo-router";
import { StatusBar, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/sign-in"> Sign In </Link>
      <Link href="/explore"> Explore </Link>
      <Link href="/profile"> Profile </Link>
      <Link href="/properties/1"> Property </Link>

      <Text className=" text-4xl font-bold text-blue-400 mt-10 ">NativeWind is working!</Text>
      <StatusBar  />
    </View>
  );
}
