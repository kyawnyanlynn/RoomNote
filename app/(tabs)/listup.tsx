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
const shapesImage = require("../../assets/images/shapes.png");
const roomImage = require("../../assets/images/room_sample.jpg");
const editIcon = require("../../assets/images/edit_icon.png");

const { width } = Dimensions.get("window");

const mainGreen = "#A2BC5A";
const lightYellow = "#FDF6E0";
const yellow = "#E7C75F";
const tagBorder = "#E7C75F";
const CARD_HEIGHT = 140;

export default function RoomListScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Bottom background */}
      <View style={styles.bottomBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => router.push("/conditionScreen")}>
            <Image source={userIcon} style={styles.userIconTop} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Image source={houseIcon} style={styles.houseIcon} />
            <Text style={styles.headerText}>あなたの条件にあったお部屋</Text>
          </View>
        </View>

        {/* Message Card */}
        <View style={styles.messageCard}>
          <View style={styles.cardRow}>
            <View style={styles.roomImageContainer}>
              <Image source={roomImage} style={styles.roomImage} />
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>79</Text>
              </View>
            </View>
            <View style={styles.tagsContainer}>
              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>日当たりがいい</Text>
                </View>
              </View>
              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>静か</Text>
                </View>
              </View>
              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>ゴミ捨て場</Text>
                </View>
                <TouchableOpacity
                  style={styles.editIconContainer}
                  onPress={() => router.push("/addition")}
                >
                  <Image source={editIcon} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* Shapes image */}
        <View style={styles.shapesRow}>
          <Image source={shapesImage} style={styles.shapesImage} />
        </View>

        {/* FAB */}
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab}>
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
    width,
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
    fontWeight: "500",
    color: "#222",
    marginLeft: 8,
  },
  messageCard: {
    backgroundColor: lightYellow,
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 32,
    padding: 16,
    height: CARD_HEIGHT,
    justifyContent: "center",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "stretch",
    height: "100%",
  },
  roomImageContainer: {
    height: "100%",
    aspectRatio: 4 / 3,
    position: "relative",
    justifyContent: "center",
  },
  roomImage: {
    height: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 8,
    width: undefined,
  },
  scoreBadge: {
    position: "absolute",
    bottom: -8,
    left: 112,
    width: 40,
    height: 48,
    backgroundColor: yellow,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  tagsContainer: {
    flex: 1,
    marginLeft: 24,
    justifyContent: "center",
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  tag: {
    borderWidth: 2,
    borderColor: tagBorder,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  tagText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
  },
  editIconContainer: {
    marginLeft: 8,
    padding: 4,
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: tagBorder,
  },
  shapesRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    marginTop: 0,
  },
  shapesImage: {
    width: 160,
    height: 40,
    resizeMode: "contain",
  },
  fabContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  fab: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: mainGreen,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  fabPlus: {
    fontSize: 48,
    color: "#fff",
    lineHeight: 54,
  },
});
