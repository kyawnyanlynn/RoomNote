import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { auth } from "../../firebase";
import { db } from "../../firebaseConfig";

import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const yellowCharacter = require("../../assets/images/yellow-character.png");
const shapesImage = require("../../assets/images/shapes2.png");

export default function RoomListScreen() {
  const [buildings, setBuildings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [importantPoints, setImportantPoints] = useState<string[]>([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, "Buildings", id));
      setBuildings((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("削除エラー:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchBuildings = async () => {
        try {
          const userId = auth.currentUser?.uid;
          const userDoc = await getDoc(doc(db, "userPreferences", userId));
          const userData = userDoc.exists() ? userDoc.data() : {};
          const userPoints = userData.preferences || [];

          setImportantPoints(userPoints);

          const snapshot = await getDocs(collection(db, "Buildings"));
          const data = snapshot.docs
            .map((doc) => {
              const building = { id: doc.id, ...doc.data() };
              const matched = Array.from(
                new Set(
                  (building.merit || []).filter((m: string) =>
                    userPoints.includes(m)
                  )
                )
              );
              const matchScore =
                userPoints.length > 0 && matched.length > 0
                  ? (matched.length / userPoints.length) * 5
                  : 0;

              return { ...building, score: parseFloat(matchScore.toFixed(1)) };
            })
            .filter((doc) => doc.uid === userId);

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
    <Swipeable
      renderRightActions={() => (
        <View className="flex-row h-full pb-5">
          <TouchableOpacity
            onPress={() => router.push(`/addition?id=${item.id}`)}
            className="bg-green-400 w-16 h-full pb-5 items-center justify-center rounded-l-xl"
          >
            <Text className="text-white font-bold">編集</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            className="bg-yellow-500 w-16 h-full pb-5 items-center justify-center rounded-r-xl"
          >
            <Text className="text-white font-bold">削除</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View
        style={{
          shadowColor: "#C4C8BE", // your custom shadow color
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 6,
          backgroundColor: "white",
          borderRadius: 16,
          marginHorizontal: 16,
          padding: 16,
          marginBottom: 24,
        }}
      >
        <View className="relative">
          <Image
            source={{ uri: item.img }}
            className="w-full h-48 rounded-xl mb-4"
            resizeMode="cover"
          />
          <View className="absolute top-3 right-3 bg-yellow-400 w-16 h-16 rounded-full items-center justify-center">
            <Text className="text-white font-medium text-[20px]">
              {typeof item.score === "number" ? `${item.score}/5` : "?"}
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-2 mb-2">
          {(item.merit || []).map((tag: string, i: number) => (
            <View
              key={`merit-${i}`}
              className="bg-[#FFF6D9] px-3 py-2 rounded-[10px]"
            >
              <Text className="text-[20px] font-medium text-[#222222]">
                {tag}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row flex-wrap gap-2 mb-2">
          {(item.demerit || []).map((tag: string, i: number) => (
            <View
              key={`demerit-${i}`}
              className="bg-[#F2F2F2] px-3 py-2 rounded-[10px]"
            >
              <Text className="text-[20px] font-medium text-[#222222]">
                {tag}
              </Text>
            </View>
          ))}
        </View>

        <Text className="text-[16px] text-[#444444] mt-2">
          メモ : {item.note}
        </Text>
      </View>
    </Swipeable>
  );

  return (
    <View className="flex-1 bg-white relative">
      {/* Bottom background */}
      <View />

      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row justify-end items-center px-4 pt-4">
          <TouchableOpacity
            onPress={() => setShowLogoutConfirm(true)}
            className="border border-[#94B74B] px-4 py-2 rounded-full"
          >
            <Text className="text-[#000000] text-[18px] font-medium">
              ログアウト
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <Modal transparent animationType="fade" visible>
            <View className="flex-1 justify-center items-center bg-black/40">
              <View className="bg-[#FFFEF7] rounded-xl px-5 py-16 w-[80%] border-[2px] border-[#94B74B] items-center">
                <Text className="text-[24px] font-normal mb-6">
                  ログアウトしますか？
                </Text>
                <View className="flex-row gap-4">
                  <TouchableOpacity
                    className="bg-[#94B74B] px-12 py-3 rounded-md"
                    onPress={async () => {
                      setShowLogoutConfirm(false); // Close modal first
                      try {
                        await auth.signOut();
                        router.push({
                          pathname: "/login",
                          params: { reset: "true" },
                        });
                      } catch (error) {
                        console.error("ログアウトエラー:", error);
                      }
                    }}
                  >
                    <Text className="text-black text-[20px] font-normal">
                      はい
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-[#FCDC5A] px-12 py-3 rounded-md"
                    onPress={() => setShowLogoutConfirm(false)}
                  >
                    <Text className="text-black text-[20px] font-normal">
                      いいえ
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
        <View className="flex flex-row justify-between items-center pl-3 pr-3 mb-2">
          <View className="flex-row items-center mt-2">
            <Image
              source={yellowCharacter}
              className="w-20 h-16"
              resizeMode="contain"
            />
            <Text className="text-gray-800 text-[25px] font-medium">
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
