import { View } from "react-native";

export const FeaturedCardSkeleton = () => {
  return (
    <View className="flex flex-col items-start w-60 h-80 relative">
      {/* Main card background skeleton */}
      <View className="w-full h-full rounded-2xl bg-gray-200 animate-pulse" />

      {/* Rating pill skeleton */}
      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <View className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" />
        <View className="w-5 h-3 ml-1 rounded-full bg-gray-300 animate-pulse" />
      </View>

      {/* Bottom content skeleton */}
      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        {/* Title skeleton */}
        <View className="w-36 h-6 bg-gray-300 rounded-md animate-pulse mb-1" />
        
        {/* Address skeleton */}
        <View className="w-40 h-5 bg-gray-300 rounded-md animate-pulse mb-3" />

        <View className="flex flex-row items-center justify-between w-full">
          {/* Price skeleton */}
          <View className="w-16 h-6 bg-gray-300 rounded-md animate-pulse" />
          
          {/* Heart icon skeleton */}
          <View className="w-5 h-5 rounded-full bg-gray-300 animate-pulse" />
        </View>
      </View>
    </View>
  );
};

export const CardSkeleton = () => {
  return (
    <View className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative">
      {/* Rating pill skeleton */}
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <View className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" />
        <View className="w-5 h-3 ml-0.5 rounded-full bg-gray-300 animate-pulse" />
      </View>

      {/* Image skeleton */}
      <View className="w-full h-40 rounded-lg bg-gray-200 animate-pulse" />

      <View className="flex flex-col mt-2">
        {/* Title skeleton */}
        <View className="w-40 h-5 bg-gray-300 rounded-md animate-pulse mb-1" />
        
        {/* Address skeleton */}
        <View className="w-36 h-3 bg-gray-300 rounded-md animate-pulse mb-2" />

        <View className="flex flex-row items-center justify-between mt-2">
          {/* Price skeleton */}
          <View className="w-16 h-5 bg-gray-300 rounded-md animate-pulse" />
          
          {/* Heart icon skeleton */}
          <View className="w-5 h-5 rounded-full bg-gray-300 animate-pulse mr-2" />
        </View>
      </View>
    </View>
  );
};

