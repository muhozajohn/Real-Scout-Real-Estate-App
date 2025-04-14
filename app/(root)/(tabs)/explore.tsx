import { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Filters from "@/components/filters";
import Search from "@/components/search";
import { Card } from "@/components/card";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import NoResults from "@/components/no-results";
import { CardSkeleton } from "@/components/skelton";

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties || []}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item?.$id}
        ListEmptyComponent={loading ? <CardSkeleton /> : <NoResults />}
        showsVerticalScrollIndicator={false}
        columnWrapperClassName="flex gap-5 px-5"
        contentContainerClassName="pb-32"
        numColumns={2}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full w-11 h-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="w-6 h-6" />
              </TouchableOpacity>
              <Text className="text-base mr-2 font-rubik-medium text-black-300">
                Search for your Ideal Home
              </Text>
                <Image source={icons.bell} className="w-6 h-6" />
            </View>
            <Search />

            <View className="mt-5">
              <Filters />
              <Text className=" text-lg font-rubik-bold text-black-300  "> Found {properties?.length} Properties </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
