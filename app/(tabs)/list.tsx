import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { db } from "../../firebaseConfig";

import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const userIcon = require("../../assets/images/mypage_icon.png");
const houseIcon = require("../../assets/images/home_icon.png");
const shapesImage = require("../../assets/images/shapes2.png");
const editIcon = require("../../assets/images/edit_icon.png");

export default function RoomListScreen() {
  const [buildings, setBuildings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchBuildings = async () => {
        try {
          const snapshot = await getDocs(collection(db, "Buildings"));
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBuildings(data);
        } catch (error) {
          console.error("Error fetching buildings:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBuildings();
    }, [])
  );

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row bg-[#FDF5D9] rounded-2xl p-3 mb-4 mx-4">
      <Image
        source={{ uri: item.img }}
        className="w-[110px] rounded-xl mr-3"
        resizeMode="cover"
      />
      <View className="flex-1 justify-between">
        {/* Tags */}
        <View className="flex-row flex-wrap gap-2 mb-2">
          {(item.merit || []).map((tag: string, i: number) => (
            <View
              key={`merit-${i}`}
              className="bg-white px-3 py-2 rounded-full border border-[#E4C341]"
            >
              <Text className="text-[15px] font-medium text-[#222222]">
                {tag}
              </Text>
            </View>
          ))}
        </View>
        <View className="flex-row flex-wrap gap-2">
          {(item.demerit || []).map((tag: string, i: number) => (
            <View
              key={`demerit-${i}`}
              className="bg-white px-3 py-2 rounded-full border border-[#E4C341]"
            >
              <Text className="text-[14px] font-medium text-[#222222]">
                {tag}
              </Text>
            </View>
          ))}
        </View>
        <View className="flex-row flex-wrap gap-2 mt-2">
          <Text>メモ : {item.note}</Text>
        </View>
        {/* Score badge */}
        <View className="absolute top-0 right-0 bg-yellow-400 w-8 h-8 rounded-full items-center justify-center">
          <Text className="text-white font-bold text-sm">
            {item.score || "?"}
          </Text>
        </View>
        <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full items-center justify-center">
          <TouchableOpacity onPress={() => router.push("/addition")}>
            <Image source={editIcon} className="" resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white relative">
      {/* Bottom background */}
      <View className="absolute bottom-0 w-full h-40 bg-[#FDF6E0] rounded-t-[80px] z-0" />

      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 mt-6">
          <Image
            source={userIcon}
            className="w-8 h-8 self-end"
            resizeMode="contain"
          />
          <View className="flex-row items-center mt-2">
            <Image
              source={houseIcon}
              className="w-9 h-7"
              resizeMode="contain"
            />
            <Text className="ml-2 text-xl font-medium text-gray-800">
              あなたの条件にあったお部屋
            </Text>
          </View>
        </View>

        {/* Content */}
        {loading ? (
          <Text className="text-center mt-8 text-base text-gray-600">
            読み込み中...
          </Text>
        ) : buildings.length === 0 ? (
          <View className="bg-[#FDF6E0] rounded-xl mx-4 mt-10 p-5">
            <Text className="text-lg text-gray-800 text-center">
              まだ物件の情報が登録されていません。
              {"\n"}下の＋ボタンから情報を追加してください。
            </Text>
          </View>
        ) : (
          <FlatList
            data={buildings}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingTop: 20 }}
          />
        )}

        {/* Bottom Image */}
        <Image
          source={shapesImage}
          className="w-36 h-10 absolute bottom-[240px] self-center"
          resizeMode="contain"
        />

        {/* FAB */}
        <View className="absolute bottom-20 left-0 right-0 items-center z-10">
          <TouchableOpacity
            className="w-24 h-24 rounded-full bg-[#A2BC5A] items-center justify-center shadow-md"
            onPress={() => router.push("/addition")}
          >
            <Text className="text-white text-5xl leading-[56px]">＋</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
