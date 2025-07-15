import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../lib/firebaseConfig";

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
    <View className="flex-1 bg-[#7A9B4A] items-center justify-center">
      <View className="bg-white rounded-3xl p-6 pt-10 mt-8 w-[90%] shadow-lg">
        <View className="flex-row items-center mb-4 w-full">
          <Image
            source={require("../../assets/images/character.png")} // Replace with your icon path
            className="w-16 h-24 mr-3"
            resizeMode="contain"
          />
          <Text className="font-bold text-base text-left flex-1 flex-wrap">
            あなたがお部屋選びで重視していることを３つ以上選んでください。
          </Text>
        </View>
        {/* Options */}
        <View className="w-full flex-wrap flex-row mb-4 gap-4">
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              className={`border border-gray-400 rounded-full px-4 py-2 m-1 ${
                selected.includes(option)
                  ? "bg-yellow-200 border-black text-white"
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
          onPress={async () => {
            const user = auth.currentUser;
            if (!user) {
              console.log("ログインしていません");
              return;
            }
            try {
              await setDoc(doc(db, "userPreferences", user.uid), {
                preferences: selected,
                createdAt: new Date(),
              });
              console.log("登録成功");
            } catch (error) {
              console.error("登録失敗:", error);
            }
          }}
        >
          <Text className="text-center font-bold text-[#333] text-[20px]">
            登録する
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
