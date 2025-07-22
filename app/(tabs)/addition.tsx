import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { app, auth, db } from "../../firebase";

const { width } = Dimensions.get("window");
const storage = getStorage(app);

const yellow = "#E7C75F";

const backIcon = require("../../assets/images/nav_back.png");
const nextIcon = require("../../assets/images/nav_next.png");
const houseIcon = require("../../assets/images/add_door.png");
const defaultRoomImage = require("../../assets/images/room_sample2.jpg");

export default function PropertyDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id;
  const isEditMode = !!id;

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

  useEffect(() => {
    const fetchData = async () => {
      if (!isEditMode) return;
      try {
        const docRef = doc(db, "Buildings", String(id));
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setNote(data.note || "");
          setSelectedImage(data.img || null);
          setSelectedMerit(
            (data.merit || [])
              .map((tag: string) => meritTags.indexOf(tag))
              .filter((i) => i !== -1)
          );
          setSelectedDemerit(
            (data.demerit || [])
              .map((tag: string) => demeritTags.indexOf(tag))
              .filter((i) => i !== -1)
          );
        }
      } catch (error) {
        console.error("編集データ読み込みエラー:", error);
      }
    };
    fetchData();
  }, [id]);

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
  const addData = async () => {
    try {
      // already using imported 'auth'
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert(
          "ユーザー情報が取得できませんでした。ログイン状態を確認してください。"
        );
        return;
      }
      const payload = {
        uid: currentUser.uid,
        img:
          selectedImage ||
          (isEditMode &&
            (await getDoc(doc(db, "Buildings", String(id)))).data()?.img) ||
          null,
        merit: selectedMerit.map((i) => meritTags[i]),
        demerit: selectedDemerit.map((i) => demeritTags[i]),
        note: note,
      };

      if (isEditMode) {
        await updateDoc(doc(db, "Buildings", String(id)), payload);
      } else {
        await addDoc(collection(db, "Buildings"), payload);
      }

      setSelectedImage(null);
      setSelectedMerit([]);
      setSelectedDemerit([]);
      setNote("");
      router.replace("/list");
    } catch (error) {
      console.error("Error saving document: ", error);
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
          onPress={() => router.push("/list")}
          className="bg-[#A2BC5A] rounded-full px-5 py-1.5"
        >
          <View className="flex-row items-center justify-center">
            <Image source={backIcon} className="w-5 h-5" resizeMode="contain" />
            <View className="w-5" />
            <Text className="text-white p-[3px] text-[18px] font-medium tracking-wider">
              戻る
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#A2BC5A] rounded-full px-5 py-1.5"
          onPress={addData}
        >
          <View className="flex-row items-center justify-center">
            <Text className="text-white p-[3px] text-[18px] font-medium tracking-wider">
              登録
            </Text>
            <View className="w-5" />
            <Image source={nextIcon} className="w-5 h-5" resizeMode="contain" />
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
        <View className="items-center mb-4 mt-2">
          <View className="mx-8">
            <TouchableOpacity onPress={handlePickImage}>
              <Image
                source={
                  selectedImage ? { uri: selectedImage } : defaultRoomImage
                }
                className="w-full aspect-[16/9] rounded-xl bg-gray-200"
                style={{ maxWidth: width - 64 }}
              />
              <Text className="text-[16px] text-center text-gray-800 mt-2">
                画像をタップして選択
              </Text>
            </TouchableOpacity>
          </View>
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
                className={`border-2 rounded-full px-4 py-2 mr-2 mb-2 bg-white ${
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
