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
      <View className="bg-[#FFFDF8] rounded-2xl px-6 py-8 w-[90%] max-w-md items-center">
        <View className="flex flex-row gap-2">
          <Image
            source={require("../../assets/images/Character.svg")} // Replace with your icon path
            className="w-10 h-10 mb-2"
            resizeMode="contain"
          />
          <Text className="text-left font-bold mb-6 text-[20px]">
            あなたがお部屋選びで重視していることを3つ以上選んでください。
          </Text>
        </View>
        {/* Options */}
        <View className="w-full flex-wrap flex-row mb-4 gap-4">
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              className={`border border-gray-400 rounded-full px-4 py-3 m-1 ${
                selected.includes(option)
                  ? "bg-yellow-200 border-yellow-400"
                  : "bg-white"
              }`}
              onPress={() => toggleOption(option)}
            >
              <Text className="text-center text-lg">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Button */}
        <TouchableOpacity
          className="bg-[#f1b600] rounded-lg p-5 mt-10"
          disabled={selected.length < 3}
        >
          <Text className="text-center font-bold text-[#333] text-[20px]">
            登録する
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
