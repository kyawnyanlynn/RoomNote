import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const userIcon = require("../../assets/images/mypage_icon.png");
const houseIcon = require("../../assets/images/home_icon.png");
const shapesImage = require("../../assets/images/shapes2.png");

const { width } = Dimensions.get("window");

const mainGreen = "#A2BC5A";
const lightYellow = "#FDF6E0";

export default function RoomListScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* 下部の背景 */}
      <View style={styles.bottomBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* ヘッダー */}
        <View style={styles.headerWrapper}>
          <Image source={userIcon} style={styles.userIconTop} />
          <View style={styles.header}>
            <Image source={houseIcon} style={styles.houseIcon} />
            <Text style={styles.headerText}>あなたの条件にあったお部屋</Text>
          </View>
        </View>

        {/* メッセージカード */}
        <View style={styles.messageCard}>
          <Text style={styles.messageText}>
            まだ物件の情報が登録されていません。
            {"\n"}下の＋ボタンから情報を追加してください。
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        {/* カラフルな図形 */}
        <Image source={shapesImage} style={styles.bottomImage} />

        {/* ＋ボタン */}
        <View style={styles.fabContainer}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => router.push("/addition")}
          >
            <Text style={styles.fabPlus}>＋</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomBackground: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: 160,
    backgroundColor: lightYellow,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    zIndex: 0,
  },
  headerWrapper: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  userIconTop: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  houseIcon: {
    width: 36,
    height: 30,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 22,
    fo
