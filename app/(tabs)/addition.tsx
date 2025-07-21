import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const db = getFirestore(app);

const yellow = "#E7C75F";

const backIcon = require("../../assets/images/back_icon.png");
const nextIcon = require("../../assets/images/next_icon.png");
const houseIcon = require("../../assets/images/add_door.png");

export default function PropertyDetailScreen() {
 // タグの状態
const defaultRoomImage = require("../../assets/images/room_sample2.jpg");

export default function PropertyDetailScreen() {
  const router = useRouter();

  const meritTags = [
    "日当たりがいい",
    "周りが静か",
    "スーパーが近い",
    "家具を配置しやすそう",
    "バス・トイレが綺麗",
  ];
  const demeritTags = [
    "換気しづらい",
    "川が近い",
    "病院が遠い",
    "ゴミ捨て場が汚い",
    "隣人がうるさい",
  ];
  const [selectedMerit, setSelectedMerit] = useState<number[]>([]);
  const [selectedDemerit, setSelectedDemerit] = useState<number[]>([]);

  // モーダル制御
  const [showUploadText, setShowUploadText] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);

  // 追加用
  const [isAddingMerit, setIsAddingMerit] = useState(false);
  const [isAddingDemerit, setIsAddingDemerit] = useState(false);
  
  const [newMerit, setNewMerit] = useState("");
  const [newDemerit, setNewDemerit] = useState("");
  
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

  const addMeritTag = () => {
    if (newMerit.trim() !== "") {
      setMeritTags([...meritTags, newMerit.trim()]);
      setNewMerit("");
      setIsAddingMerit(false);
    }
  };

  const addDemeritTag = () => {
    if (newDemerit.trim() !== "") {
      setDemeritTags([...demeritTags, newDemerit.trim()]);
      setNewDemerit("");
      setIsAddingDemerit(false);
    }
  };

  // 写真を選択
  const pickRoomImage = async () => {
    setShowSelectModal(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("写真へのアクセスが許可されていません。");
  const addData = async () => {
    try {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("ユーザー情報が取得できませんでした。ログイン状態を確認してください。");
        return;
      }
      await addDoc(collection(db, "Buildings"), {
        uid: currentUser.uid,
        img: selectedImage,
        merit: selectedMerit.map((i) => meritTags[i]),
        demerit: selectedDemerit.map((i) => demeritTags[i]),
        note: note,
      });
      setSelectedImage(null);
      setSelectedMerit([]);
      setSelectedDemerit([]);
      setNote("");
      router.replace("/list");
    } catch (error) {
      console.error("Error adding document: ", error);
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
            <Image source={backnav} className="w-5 h-5" resizeMode="contain" />
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
          {isAddingMerit && (
            <View style={styles.addTagRow}>
              <TextInput
                style={styles.addTagInput}
                value={newMerit}
                onChangeText={setNewMerit}
                placeholder="新しいメリット"
                autoFocus
                onSubmitEditing={addMeritTag}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.addTagOkButton}
                onPress={addMeritTag}
              >
                <Text style={styles.addTagOkText}>追加</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addTagCancelButton}
                onPress={() => {
                  setIsAddingMerit(false);
                  setNewMerit("");
                }}
              >
                <Text style={styles.addTagCancelText}>キャンセル</Text>
              </TouchableOpacity>
            </View>
          )}
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
          {isAddingDemerit && (
            <View style={styles.addTagRow}>
              <TextInput
                style={styles.addTagInput}
                value={newDemerit}
                onChangeText={setNewDemerit}
                placeholder="新しいデメリット"
                autoFocus
                onSubmitEditing={addDemeritTag}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.addTagOkButton}
                onPress={addDemeritTag}
              >
                <Text style={styles.addTagOkText}>追加</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addTagCancelButton}
                onPress={() => {
                  setIsAddingDemerit(false);
                  setNewDemerit("");
                }}
              >
                <Text style={styles.addTagCancelText}>キャンセル</Text>
              </TouchableOpacity>
            </View>
          )}
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
const IMAGE_HORIZONTAL_MARGIN = 0 + 36 + 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  navButton: {
    backgroundColor: "#94B74B",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  navContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 2,
  },
  navArrowIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    margin: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginLeft: 32,
    marginBottom: 8,
  },
  titleIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: 8,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#222",
  },
  imageSliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0, // ← 画像を最大化するため余白をなくす
    marginBottom: 16,
    marginTop: 8,
    position: "relative", // ← 重なりを許可
  },
  roomImage: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginHorizontal: 32, // ← 画像を最大化するため余白をなくす
    width: width, // ← 画面幅いっぱいに
    height: undefined,
    maxWidth: width, // ← 画面幅いっぱいに
  },
  sliderArrowLeft: {
    position: "absolute",
    left: 8,
    top: "50%",
    zIndex: 2,
    transform: [{ translateY: -18 }],
  },
  sliderArrowRight: {
    position: "absolute",
    right: 8,
    top: "50%",
    zIndex: 2,
    transform: [{ translateY: -18 }],
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: yellow,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
  arrowIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    opacity: 0.9,
  },
  section: {
    marginHorizontal: 32,
    marginTop: 16,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: yellow,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: yellow,
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 24,
  },
  addTagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  addTagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
    fontSize: 16,
    marginRight: 8,
  },
  addTagOkButton: {
    backgroundColor: yellow,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 4,
  },
  addTagOkText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addTagCancelButton: {
    backgroundColor: "#eee",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addTagCancelText: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: yellow,
    marginRight: 8,
  },
  triangle: {
    color: yellow,
    fontSize: 18,
    marginRight: 8,
    marginTop: -2,
  },
  square: {
    width: 12,
    height: 12,
    backgroundColor: yellow,
    borderRadius: 3,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#222",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  tag: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  tagYellowBorder: {
    borderColor: yellow,
  },
  tagText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
  },
  memoInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#ddd",
    minHeight: 48,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: "#222",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadTextModal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    minWidth: 220,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
    color: "#222",
  },
  uploadButton: {
    backgroundColor: yellow,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 8,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectModal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    minWidth: 220,
  },
  selectButton: {
    backgroundColor: yellow,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginVertical: 8,
    width: 160,
    alignItems: "center",
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});