import React from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function ExplanationPager() {
  return (
    <View style={{ flex: 1, backgroundColor: "#74952F" }}>
      {/* 固定タイトル */}
      <View style={{ alignItems: "center", marginTop: 88, marginBottom: 10 }}>
        <Text className="text-white text-2xl font-bold">アプリの使い方</Text>
      </View>
      {/* 横スクロール部分 */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
      >
        {/* 1ページ目 */}
        <ScrollView
          style={{ width, flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 bg-[#74952F] items-center justify-start pt-4 relative">
            <View className="bg-white rounded-3xl w-[90%] px-6 pt-8 pb-10 items-center">
              <Text className="absolute left-6 top-6 text-[72px] font-bold text-[#E6F0C2] opacity-100 z-0">
                01
              </Text>
              <View className="w-full items-center mt-2 mb-1 z-10 ">
                <Image
                  source={require("../../assets/images/explanation_1.png")}
                  className="h-[400px] mt-8"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-black text-xl font-medium text-left mt-0">
                お部屋選びで重視している条件を選択する
              </Text>
            </View>
            <View className="flex-row items-center justify-center mt-8 space-x-4 gap-3">
              <View className="w-3 h-3 bg-[#EAC43D] rounded-md" />
              <Image
                source={require("../../assets/images/whiteTriangle.png")}
                className="w-4 h-3"
              />
              <View className="w-2.5 h-3.5 bg-white rounded-t-full rounded-b-none" />
            </View>
          </View>
        </ScrollView>
        {/* 2ページ目 */}
        <ScrollView
          style={{ width, flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 bg-[#74952F] items-center justify-start pt-4 relative">
            <View className="bg-white rounded-3xl w-[90%] px-6 pt-8 pb-10 items-center">
              <Text className="absolute left-6 top-6 text-[72px] font-bold text-[#E6F0C2] opacity-100 z-0">
                02
              </Text>
              <View className="w-full items-center mt-2 mb-1 z-10 ">
                <Image
                  source={require("../../assets/images/explanation_2.png")}
                  className="h-[400px] mt-8"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-black text-xl font-medium text-left mt-0">
                条件に合ったお部屋を自動でリストアップ！
              </Text>
            </View>
            <View className="flex-row items-center justify-center mt-8 space-x-4 gap-3">
              <View className="w-3 h-3 bg-white rounded-md" />
              <Image
                source={require("../../assets/images/yellowTriangle.png")}
                className="w-4 h-3"
              />
              <View className="w-2.5 h-3.5 bg-white rounded-t-full rounded-b-none" />
            </View>
          </View>
        </ScrollView>
        {/* 3ページ目 */}
        <ScrollView
          style={{ width, flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            paddingBottom: 40, // ボタンの下に余白
          }}
        >
          <View className="flex-1 bg-[#74952F] items-center justify-start pt-4 relative">
            <View className="bg-white rounded-3xl w-[90%] px-6 pt-8 pb-10 items-center">
              <Text className="absolute left-6 top-6 text-[72px] font-bold text-[#E6F0C2] opacity-100 z-0">
                03
              </Text>
              <View className="w-full items-center mt-2 mb-1 z-10 ">
                <Image
                  source={require("../../assets/images/explanation_3.png")}
                  className="h-[400px] mt-8"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-black text-xl font-medium text-left mt-0">
                あなたの条件とのマッチ度で 点数を表示！
              </Text>
            </View>
            <View className="flex-row items-center justify-center mt-8 space-x-4 gap-3">
              <View className="w-3 h-3 bg-white rounded-md" />
              <Image
                source={require("../../assets/images/whiteTriangle.png")}
                className="w-4 h-3"
              />
              <View className="w-2.5 h-3.5 bg-[#EAC43D] rounded-t-full rounded-b-none" />
            </View>
            {/* ログインボタン（中央揃え・下に配置） */}
            <View
              style={{
                width: 200,
                height: 60,
                backgroundColor: "#fff",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 32,
                marginBottom: 80, // ← ここを40に変更
                position: "relative",
              }}
            >
              <Text style={{ color: "#222", fontSize: 20, fontWeight: "bold" }}>
                ログイン
              </Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
