import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const userIcon = require('../../assets/images/mypage_icon.png');
const houseIcon = require('../../assets/images/home_icon.png');
const shapesImage = require('../../assets/images/shapes.png');
const roomImage = require('../../assets/images/room_sample.jpg'); // 部屋の画像をassetsに追加してください
const editIcon = require('../../assets/images/edit_icon.png'); // ペンのアイコン画像をassetsに追加してください

const { width } = Dimensions.get('window');

const mainGreen = '#A2BC5A';
const lightYellow = '#FDF6E0';
const yellow = '#E7C75F';
const tagBorder = '#E7C75F';

export default function RoomListScreen() {
  return (
    <View style={styles.container}>
      {/* 下部の背景 */}
      <View style={styles.bottomBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Image source={houseIcon} style={styles.houseIcon} />
          <Text style={styles.headerText}>あなたの条件にあったお部屋</Text>
          <Image source={userIcon} style={styles.userIcon} />
        </View>

        {/* メッセージカード部分 */}
        <View style={styles.messageCard}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            {/* 部屋画像とスコア */}
            <View>
              <Image source={roomImage} style={styles.roomImage} />
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>79</Text>
              </View>
            </View>
            {/* タグと編集アイコン */}
            <View style={styles.tagsContainer}>
              <View style={styles.tagRow}>
                <View style={styles.tag}><Text style={styles.tagText}>日当たりがいい</Text></View>
              </View>
              <View style={styles.tagRow}>
                <View style={styles.tag}><Text style={styles.tagText}>静か</Text></View>
              </View>
              <View style={styles.tagRow}>
                <View style={styles.tag}><Text style={styles.tagText}>ゴミ捨て場</Text></View>
                <TouchableOpacity style={styles.editIconContainer}>
                  <Image source={editIcon} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* カラフルな図形（PNG画像） */}
        {/* <View style={styles.shapesRow}>
          <Image source={shapesImage} style={styles.shapesImage} />
        </View> */}

        {/* ＋ボタン */}
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
    backgroundColor: '#fff',
  },
  bottomBackground: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 160,
    backgroundColor: lightYellow,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    zIndex: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  houseIcon: {
    width: 36,
    height: 30,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#222',
    marginLeft: 8,
  },
  userIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginLeft: 'auto',
  },
  messageCard: {
    backgroundColor: lightYellow,
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 32,
    padding: 16,
  },
  roomImage: {
    width: 120,
    height: 90,
    borderRadius: 8,
  },
  scoreBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: yellow,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  tagsContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    borderWidth: 2,
    borderColor: tagBorder,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  tagText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  editIconContainer: {
    marginLeft: 4,
    padding: 4,
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: tagBorder,
  },
  shapesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 0,
  },
  shapesImage: {
    width: 160,
    height: 40,
    resizeMode: 'contain',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fab: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: mainGreen,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  fabPlus: {
    fontSize: 48,
    color: '#fff',
    lineHeight: 54,
  },
});