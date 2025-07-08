import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { getApps, initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  LogBox,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { firebaseConfig } from "../../firebaseConfig"; // ← ensure this exists

const { width } = Dimensions.get("window");
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const mainGreen = "#A2BC5A";
const yellow = "#E7C75F";

const backIcon = require("../../assets/images/back_icon.png");
const nextIcon = require("../../assets/images/next_icon.png");
const backnav = require("../../assets/images/nav_back.png");
const nextnav = require("../../assets/images/nav_next.png");
const houseIcon = require("../../assets/images/add_door.png");
const defaultRoomImage = require("../../assets/images/room_sample2.jpg");

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function PropertyDetailScreen() {
  const router = useRouter();

  const [meritTags, setMeritTags] = useState([
    "日当たりがいい",
    "周りが静か",
    "スーパーが近い",
    "家具を配置しやすそう",
    "バス・トイレが綺麗",
  ]);
  const [demeritTags, setDemeritTags] = useState([
    "換気しづらい",
    "川が近い",
    "病院が遠い",
    "ゴミ捨て場が汚い",
    "隣人がうるさい",
  ]);
  const [selectedMerit, setSelectedMerit] = useState<number[]>([]);
  const [selectedDemerit, setSelectedDemerit] = useState<number[]>([]);
  const [note, setNote] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const toggleMerit = (idx: number) => {
    setSelectedMerit((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleDemerit = (idx: number) => {
    setSelectedDemerit((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleRegister = async () => {
    try {
      const selectedMeritTags = selectedMerit.map((i) => meritTags[i]);
      const selectedDemeritTags = selectedDemerit.map((i) => demeritTags[i]);

      await addDoc(collection(db, "properties"), {
        merits: selectedMeritTags,
        demerits: selectedDemeritTags,
        note,
        createdAt: new Date(),
        // Add selectedImage when uploading later
      });

      alert("登録が完了しました！");
      router.push("/listup");
    } catch (error) {
      console.error("Firebase error:", error);
      alert("アップロード中にエラーが発生しました。");
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("写真ライブラリへのアクセス許可が必要です。");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFDF8]">
      {/* Header */}
      <View className="flex-row justify-between items-center mx-6 mt-4 mb-3">
        <TouchableOpacity
          onPress={() => router.push("/listup")}
          className="bg-[#A2BC5A] rounded-full px-5 py-1.5"
        >
          <View className="flex-row items-center justify-center">
            <Image source={backnav} className="w-5 h-5" resizeMode="contain" />
            <View className="w-5" />
            <Text className="text-white p-[3px] text-[18px] font-medium tracking-wider">
              戻る
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#A2BC5A] rounded-full px-5 py-1.5"
          onPress={handleRegister}
        >
          <View className="flex-row items-center justify-center">
            <Text className="text-white p-[3px] text-[18px] font-medium tracking-wider">
              登録
            </Text>
            <View className="w-5" />
            <Image source={nextnav} className="w-5 h-5" resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Title */}
        <View className="flex-row items-center mt-3 ml-8 mb-2">
          <Image
            source={houseIcon}
            className="w-8 h-8 mr-2"
            resizeMode="contain"
          />
          <Text className="text-[22px] font-medium text-[#222]">物件情報</Text>
        </View>

        {/* Image Picker */}
        <View className="flex-row items-center mb-4 mt-2 relative">
          <TouchableOpacity className="absolute left-2 top-1/2 z-20 -translate-y-4.5">
            <View className="w-9 h-9 rounded-full bg-[#E7C75F] justify-center items-center opacity-70">
              <Image
                source={backIcon}
                className="w-8 h-8 opacity-90"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <View className="flex-1 mx-8">
            <TouchableOpacity onPress={handlePickImage}>
              <Image
                source={
                  selectedImage ? { uri: selectedImage } : defaultRoomImage
                }
                className="w-full aspect-[16/9] rounded-xl bg-gray-200"
                style={{ maxWidth: width - 64 }}
              />
              <Text className="text-center text-gray-500 mt-2">
                画像をタップして選択
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="absolute right-2 top-1/2 z-20 -translate-y-4.5">
            <View className="w-9 h-9 rounded-full bg-[#E7C75F] justify-center items-center opacity-70">
              <Image
                source={nextIcon}
                className="w-8 h-8 opacity-90"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* メリット */}
        <View className="ml-8 mt-3">
          <Text className="font-medium mb-3 text-[#222] text-[18px]">
            <Text style={{ color: yellow, fontSize: 18 }}>●</Text> メリット
          </Text>
          <View className="flex-row flex-wrap mb-1">
            {meritTags.map((tag, idx) => (
              <TouchableOpacity
                key={tag}
                className={`border-2 rounded-full px-4 py-1 mr-2 mb-2 bg-white ${
                  selectedMerit.includes(idx)
                    ? "border-[#E7C75F]"
                    : "border-gray-200"
                }`}
                onPress={() => toggleMerit(idx)}
              >
                <Text
                  className={`text-[15px] p-[3px] ${
                    selectedMerit.includes(idx) ? "text-[#222]" : "text-[#222]"
                  }`}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* デメリット */}
        <View className="ml-8 mt-5">
          <Text className="font-medium mb-3 text-[#222] text-[18px]">
            <Text style={{ color: yellow, fontSize: 18 }}>▲</Text> デメリット
          </Text>
          <View className="flex-row flex-wrap mb-1">
            {demeritTags.map((tag, idx) => (
              <TouchableOpacity
                key={tag}
                className={`border-2 rounded-full px-4 py-1 mr-2 mb-2 bg-white ${
                  selectedDemerit.includes(idx)
                    ? "border-[#E7C75F]"
                    : "border-gray-200"
                }`}
                onPress={() => toggleDemerit(idx)}
              >
                <Text
                  className={`text-[16px] p-[3px] ${
                    selectedDemerit.includes(idx)
                      ? "text-[#222]"
                      : "text-[#222]"
                  }`}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 備考 */}
        <View className="ml-8 mt-6 mr-8">
          <Text className="font-medium mb-3 text-[#222] text-[18px]">
            <Text style={{ color: yellow, fontSize: 18 }}>■</Text>備考
          </Text>
          <TextInput
            className="border-2 border-[#A2BC5A] rounded-lg p-3 text-[15px] bg-white min-h-[60px] mt-1"
            value={note}
            onChangeText={setNote}
            placeholder="備考を入力"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
