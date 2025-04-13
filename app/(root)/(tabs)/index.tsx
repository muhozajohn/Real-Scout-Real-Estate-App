import { useEffect } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Filters from "@/components/filters";
import Search from "@/components/search";
import { Card, FeaturedCard } from "@/components/card";
import { useGlobalContext } from "@/lib/global.provider";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import NoResults from "@/components/no-results";
import { CardSkeleton, FeaturedCardSkeleton } from "@/components/skelton";

const Index = () => {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
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

            <Search />

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
              <FlatList
                data={ latestProperties || []}
                renderItem={({ item }) => (
                  <FeaturedCard
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                ListEmptyComponent={
                  latestPropertiesLoading ? (
                    <FeaturedCardSkeleton />
                  ) : (
                    <NoResults />
                  )
                }
                keyExtractor={(item) => item.$id}
                showsHorizontalScrollIndicator={false}
                horizontal
                bounces={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>

            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Index;
