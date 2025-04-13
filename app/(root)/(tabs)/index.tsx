import { Card, FeaturedCard } from "@/components/card";
import Filters from "@/components/filters";
import Search from "@/components/search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global.provider";
import {
  StatusBar,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="flex px-5 flex-col  h-full bg-white">
      <StatusBar barStyle="dark-content" className=" bg-white" />
      <View className="">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row">
            <Image
              source={{ uri: user?.avatar }}
              className="size-12 w-12 h-12 rounded-full"
            />

            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">
                Good Morning
              </Text>
              <Text className="text-base font-rubik-medium text-black-300">
                {user?.name}
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6 w-6 h-6" />
        </View>
      </View>

      <Search />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="h-full"
      >
        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Featured
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row gap-5 mt-5">
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} > */}
            <FeaturedCard />
            <FeaturedCard />

            {/* </ScrollView> */}
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold text-black-300">
            Our Recomendations
          </Text>
          <TouchableOpacity>
            <Text className="text-base font-rubik-bold text-primary-300">
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <Filters />

        <View className="flex flex-row gap-2 mt-3">
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} > */}
          <Card />
          <Card />

          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
