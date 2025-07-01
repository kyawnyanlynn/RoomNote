import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const yellow = '#E7C75F';

const backIcon = require('../../assets/images/back_icon.png');
const nextIcon = require('../../assets/images/next_icon.png');
const backnav = require('../../assets/images/nav_back.png');
const nextnav = require('../../assets/images/nav_next.png');
const houseIcon = require('../../assets/images/add_door.png');
const roomImage = require('../../assets/images/room_sample2.jpg');

export default function PropertyDetailScreen() {
  // タグの状態
  const [meritTags, setMeritTags] = useState(['日当たりがいい', '周りが静か', 'スーパーが近い', '家具を配置しやすそう', 'バス・トイレが綺麗']);
  const [demeritTags, setDemeritTags] = useState(['換気しづらい', '川が近い', '病院が遠い', 'ゴミ捨て場が汚い', '隣人がうるさい']);
  const [selectedMerit, setSelectedMerit] = useState<number[]>([]);
  const [selectedDemerit, setSelectedDemerit] = useState<number[]>([]);

  // 追加用
  const [isAddingMerit, setIsAddingMerit] = useState(false);
  const [isAddingDemerit, setIsAddingDemerit] = useState(false);
  const [newMerit, setNewMerit] = useState('');
  const [newDemerit, setNewDemerit] = useState('');

  const toggleMerit = (idx: number) => {
    setSelectedMerit(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleDemerit = (idx: number) => {
    setSelectedDemerit(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const addMeritTag = () => {
    if (newMerit.trim() !== '') {
      setMeritTags([...meritTags, newMerit.trim()]);
      setNewMerit('');
      setIsAddingMerit(false);
    }
  };

  const addDemeritTag = () => {
    if (newDemerit.trim() !== '') {
      setDemeritTags([...demeritTags, newDemerit.trim()]);
      setNewDemerit('');
      setIsAddingDemerit(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 上部ナビゲーション */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.navContent}>
            <Image source={backnav} style={styles.navArrowIcon} />
            <View style={{ width: 20 }} /> {/* スペース追加 */}
            <Text style={styles.navButtonText}>戻る</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.navContent}>
            <Text style={styles.navButtonText}>追加</Text>
            <View style={{ width: 20 }} /> {/* スペース追加 */}
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
          <Image
            source={roomImage}
            style={styles.roomImage}
          />
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
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsAddingMerit(true)}
            >
              <Text style={styles.addButtonText}>＋</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagsRow}>
            {meritTags.map((tag, idx) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedMerit.includes(idx) && styles.tagYellowBorder,
                ]}
                onPress={() => toggleMerit(idx)}
                activeOpacity={0.7}
              >
                <Text style={styles.tagText}>{tag}</Text>
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
              <TouchableOpacity style={styles.addTagOkButton} onPress={addMeritTag}>
                <Text style={styles.addTagOkText}>追加</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addTagCancelButton} onPress={() => { setIsAddingMerit(false); setNewMerit(''); }}>
                <Text style={styles.addTagCancelText}>キャンセル</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* デメリット */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.square} />
            <Text style={styles.sectionTitle}>デメリット</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsAddingDemerit(true)}
            >
              <Text style={styles.addButtonText}>＋</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagsRow}>
            {demeritTags.map((tag, idx) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedDemerit.includes(idx) && styles.tagYellowBorder,
                ]}
                onPress={() => toggleDemerit(idx)}
                activeOpacity={0.7}
              >
                <Text style={styles.tagText}>{tag}</Text>
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
              <TouchableOpacity style={styles.addTagOkButton} onPress={addDemeritTag}>
                <Text style={styles.addTagOkText}>追加</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addTagCancelButton} onPress={() => { setIsAddingDemerit(false); setNewDemerit(''); }}>
                <Text style={styles.addTagCancelText}>キャンセル</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 備考 */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.triangle}>▲</Text>
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

const IMAGE_HORIZONTAL_MARGIN = 0+ 36 + 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  navButton: {
    backgroundColor: '#94B74B',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 2,
  },
  navArrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    margin: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginLeft: 32,
    marginBottom: 8,
  },
  titleIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#222',
  },
  imageSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 0, // ← 画像を最大化するため余白をなくす
    marginBottom: 16,
    marginTop: 8,
    position: 'relative', // ← 重なりを許可
  },
  roomImage: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginHorizontal: 32, // ← 画像を最大化するため余白をなくす
    width: width,        // ← 画面幅いっぱいに
    height: undefined,
    maxWidth: width,     // ← 画面幅いっぱいに
  },
  sliderArrowLeft: {
    position: 'absolute',
    left: 8,
    top: '50%',
    zIndex: 2,
    transform: [{ translateY: -18 }],
  },
  sliderArrowRight: {
    position: 'absolute',
    right: 8,
    top: '50%',
    zIndex: 2,
    transform: [{ translateY: -18 }],
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: yellow,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  arrowIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    opacity: 0.9,
  },
  section: {
    marginHorizontal: 32,
    marginTop: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: yellow,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: yellow,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  addTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  addTagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addTagCancelButton: {
    backgroundColor: '#eee',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addTagCancelText: {
    color: '#888',
    fontWeight: 'bold',
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
    fontWeight: '500',
    color: '#222',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  tagYellowBorder: {
    borderColor: yellow,
  },
  tagText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  memoInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ddd',
    minHeight: 48,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#222',
  },
});
