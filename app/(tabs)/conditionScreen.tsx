import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const options = [
  "日当たりがいい",
  "周りが静か",
  "スーパー・コンビニが近い",
  "病院が近い",
  "24時間ゴミ捨て可能",
  "ベランダが綺麗",
  "コンセントが多い",
  "家具の配置がしやすい",
];

export default function ConditionScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <View className="flex-1 bg-[#6d8f2c] items-center justify-center">
      <View className="bg-white rounded-2xl px-6 py-8 w-[90%] max-w-md items-center">
        {/* Icon */}
        <Image
          source={require("../../assets/images/Character.svg")} // Replace with your icon path
          className="w-10 h-10 mb-2"
          resizeMode="contain"
        />
        {/* Title */}
        <Text className="text-center font-bold mb-6">
          あなたがお部屋選びで重視していることを3つ以上選んでください。
        </Text>
        {/* Options */}
        <View className="w-full flex-wrap flex-row justify-center mb-6">
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              className={`border border-gray-400 rounded-full px-4 py-2 m-1 ${
                selected.includes(option)
                  ? "bg-yellow-200 border-yellow-400"
                  : "bg-white"
              }`}
              onPress={() => toggleOption(option)}
            >
              <Text className="text-center">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Button */}
        <TouchableOpacity
          className="bg-[#f1b600] rounded-lg py-3 w-full mt-2"
          disabled={selected.length < 3}
        >
          <Text className="text-center font-bold text-[#333]">登録する</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
