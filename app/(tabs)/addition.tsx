import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const mainGreen = "#A2BC5A";
const yellow = "#E7C75F";

const backIcon = require("../../assets/images/back_icon.png");
const nextIcon = require("../../assets/images/next_icon.png");
const backnav = require("../../assets/images/nav_back.png");
const nextnav = require("../../assets/images/nav_next.png");
const houseIcon = require("../../assets/images/add_door.png");
const defaultRoomImage = require("../../assets/images/room_sample2.jpg");

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
  const [roomImageUri, setRoomImageUri] = useState<string | null>(null);

  const [showUploadText, setShowUploadText] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [isAddingMerit, setIsAddingMerit] = useState(false);
  const [isAddingDemerit, setIsAddingDemerit] = useState(false);
  const [newMerit, setNewMerit] = useState('');
  const [newDemerit, setNewDemerit] = useState('');

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
    if (newMerit.trim()) {
      setMeritTags([...meritTags, newMerit.trim()]);
      setNewMerit('');
      setIsAddingMerit(false);
    }
  };

  const addDemeritTag = () => {
    if (newDemerit.trim()) {
      setDemeritTags([...demeritTags, newDemerit.trim()]);
      setNewDemerit('');
      setIsAddingDemerit(false);
    }
  };

  const pickRoomImage = async () => {
    setShowSelectModal(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('写真へのアクセスが許可されていません。');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.length > 0) {
      setRoomImageUri(result.assets[0].uri);
    }
  };

  const takeRoomPhoto = async () => {
    setShowSelectModal(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('カメラへのアクセスが許可されていません。');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.length > 0) {
      setRoomImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.push("/listup")} style={styles.navButton}>
          <View style={styles.navContent}>
            <Image source={backnav} style={styles.navArrowIcon} />
            <View style={{ width: 20 }} />
            <Text style={styles.navButtonText}>戻る</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.navContent}>
            <Text style={styles.navButtonText}>追加</Text>
            <View style={{ width: 20 }} />
            <Image source={nextnav} style={styles.navArrowIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Title */}
        <View style={styles.titleRow}>
          <Image source={houseIcon} style={styles.titleIcon} />
          <Text style={styles.titleText}>物件情報</Text>
        </View>

        {/* Image */}
        <View style={styles.imageSliderContainer}>
          <TouchableOpacity style={styles.sliderArrowLeft}>
            <View style={styles.arrowCircle}>
              <Image source={backIcon} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowUploadText(true)} activeOpacity={0.8}>
            <Image
              source={roomImageUri ? { uri: roomImageUri } : defaultRoomImage}
              style={styles.roomImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sliderArrowRight}>
            <View style={styles.arrowCircle}>
              <Image source={nextIcon} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Upload Modals */}
        <Modal visible={showUploadText} transparent animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} onPressOut={() => setShowUp
