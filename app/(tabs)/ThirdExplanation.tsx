import React from "react";
import { Image, Text, View } from "react-native";

export default function ExplanationScreen() {
  return (
    <View className="flex-1 bg-[#7A9B4A] items-center justify-start pt-20 relative">
      {/* Title */}
      <Text className="text-white text-2xl font-bold mb-10 mt-9">
        アプリの使い方
      </Text>

      {/* White Card */}
      <View className="bg-white rounded-3xl w-[90%] px-6 pt-8 pb-10 items-center shadow-lg">
        {/* Step Number */}
        <Text className="absolute left-6 top-6 text-[72px] font-bold text-[#E6F0C2] opacity-100 z-0">
          03
        </Text>
        {/* Phone Image */}
        <View className="w-full items-center mt-6 mb-6 z-10 ">
          <Image
            source={require("../../assets/images/explanation_3.png")}
            className="h-[400px] mt-8"
            resizeMode="contain"
          />
        </View>
        {/* Step Description */}
        <Text className="text-black text-xl font-medium text-left mt-2">
          あなたの条件とのマッチ度で 点数を表示！{" "}
        </Text>
      </View>
      <View className="flex-row items-center justify-center mt-8 space-x-4 gap-3">
        <View className="w-4 h-4 bg-white rounded-md" />
        <Image
          source={require("../../assets/images/whiteTriangle.png")}
          className="w-5 h-4"
        />
        <View className="w-4 h-5 bg-[#EAC43D] rounded-t-full rounded-b-none" />
      </View>
    </View>
  );
}
