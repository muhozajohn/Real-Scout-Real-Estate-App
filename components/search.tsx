import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({query: text}), 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };
  return (
    <View className="flex flex-row  items-center justify-center bg-accent-100 rounded-lg px-4 py-2 mt-5 border border-primary-100">
      <View className="flex-1 flex flex-row items-center justify-start  z-50">
        <Image
          source={icons.search}
          resizeMode="contain"
          className=" size-5 w-5 h-5"
        />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything..."
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
          placeholderTextColor="#B0B0B0"
        />
      </View>
      <TouchableOpacity>
        <Image
          source={icons.filter}
          resizeMode="contain"
          className=" size-5 w-5 h-5 ml-2"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
