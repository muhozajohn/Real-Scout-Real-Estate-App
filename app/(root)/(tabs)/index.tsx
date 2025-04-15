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
import { getGreeting } from "@/lib/time";

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


  const renderFeaturedSection = () => {
    return (
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
        
        {latestPropertiesLoading ? (
          <View className="mt-5 gap-3 flex-row items-center ">
            <FeaturedCardSkeleton />
            <FeaturedCardSkeleton />
          </View>
        ) : latestProperties && latestProperties.length > 0 ? (
          <FlatList
            data={latestProperties}
            renderItem={({ item }) => (
              <FeaturedCard
                item={item}
                onPress={() => handleCardPress(item.$id)}
              />
            )}
            keyExtractor={(item) => item.$id}
            showsHorizontalScrollIndicator={false}
            horizontal
            bounces={false}
            contentContainerClassName="flex gap-5 mt-5"
          />
        ) : (
          <NoResults />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={loading ? Array(4).fill({}) : (properties || [])}
        renderItem={({ item }) => 
          loading ? (
            <CardSkeleton />
          ) : (
            <Card item={item} onPress={() => handleCardPress(item.$id)} />
          )
        }
        keyExtractor={(item, index) => item?.$id || `skeleton-${index}`}
        showsVerticalScrollIndicator={false}
        columnWrapperClassName="flex gap-5 px-5"
        contentContainerClassName="pb-32"
        numColumns={2}
        ListEmptyComponent={() => (!loading ? <NoResults /> : null)}
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
                    {getGreeting()}
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6 w-6 h-6" />
            </View>

            <Search />

            {renderFeaturedSection()}

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