import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import {
  Dimensions,
  Image,
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

const backIcon = require("../../assets/images/back_icon.png"); // スライダーの左矢印
const nextIcon = require("../../assets/images/next_icon.png"); // スライダーの右矢印
const backnav = require("../../assets/images/nav_back.png"); // navの左矢印
const nextnav = require("../../assets/images/nav_next.png"); // navの右矢印
const houseIcon = require("../../assets/images/home_icon.png"); // 家アイコン
const roomImage = require("../../assets/images/room_sample2.jpg"); // 部屋画像

export default function PropertyDetailScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 上部ナビゲーション */}
      <View style={styles.topNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/listup")}
        >
          <View style={styles.navContent}>
            <Image source={backnav} style={styles.navArrowIcon} />
            <Text style={styles.navButtonText}>戻る</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.navContent}>
            <Text style={styles.navButtonText}>追加</Text>
            <Image source={nextnav} style={styles.navArrowIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* タイトル */}
        <View style={styles.titleRow}>
          <Image source={houseIcon} style={styles.titleIcon} />
          <Text style={styles.titleText}>物件情報</Text>
        </View>

        {/* 画像とスライダー */}
        <View style={styles.imageSliderContainer}>
          <TouchableOpacity style={styles.sliderArrowLeft}>
            <View style={styles.arrowCircle}>
              <Image source={backIcon} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={{ flex: 1 }}>
            <Image
              source={selectedImage ? { uri: selectedImage } : roomImage}
              style={styles.roomImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sliderArrowRight}>
            <View style={styles.arrowCircle}>
              <Image source={nextIcon} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        </View>

        {/* メリット */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.dot} />
            <Text style={styles.sectionTitle}>メリット</Text>
          </View>
          <View style={styles.tagsRow}>
            <View style={[styles.tag, styles.tagYellowBorder]}>
              <Text style={[styles.tagText, styles.tagYellowText]}>
                日当たりがいい
              </Text>
            </View>
            <View style={[styles.tag, styles.tagYellowBorder]}>
              <Text style={[styles.tagText, styles.tagYellowText]}>
                周りが静か
              </Text>
            </View>
          </View>
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>スーパーが近い</Text>
            </View>
          </View>
        </View>

        {/* デメリット */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.triangle}>▲</Text>
            <Text style={styles.sectionTitle}>デメリット</Text>
          </View>
          <View style={styles.tagsRow}>
            <View style={[styles.tag, styles.tagYellowBorder]}>
              <Text style={[styles.tagText, styles.tagYellowText]}>
                換気しづらい
              </Text>
            </View>
            <View style={[styles.tag, styles.tagYellowBorder]}>
              <Text style={[styles.tagText, styles.tagYellowText]}>
                うるさい
              </Text>
            </View>
          </View>
          <View style={styles.tagsRow}>
            <View style={[styles.tag, styles.tagYellowBorder]}>
              <Text style={[styles.tagText, styles.tagYellowText]}>
                病院が遠い
              </Text>
            </View>
          </View>
        </View>

        {/* 備考 */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.square} />
            <Text style={styles.sectionTitle}>備考</Text>
          </View>
          <TextInput
            style={styles.memoInput}
            placeholder=""
            placeholderTextColor="#bbb"
            multiline
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const IMAGE_HORIZONTAL_MARGIN = 24 + 36 + 8;

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
    backgroundColor: mainGreen,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  navContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 18,
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
    marginTop: 12,
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
    marginHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },
  roomImage: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginHorizontal: 8,
    width: undefined,
    height: undefined,
    maxWidth: width - IMAGE_HORIZONTAL_MARGIN * 2,
  },
  sliderArrowLeft: {
    marginRight: 8,
  },
  sliderArrowRight: {
    marginLeft: 8,
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: yellow,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
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
  tagYellowText: {
    color: "#222222",
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
});
