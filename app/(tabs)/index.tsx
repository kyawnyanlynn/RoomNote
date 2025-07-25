import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
import "../../global.css"; // Keep if needed for web

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/firstExplanation");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center p-4 bg-[#6d8f2c]">
      <Image
        source={require("../../assets/images/homePage_logo.png")}
        className="w-[300px] h-[300px] mb-6"
        resizeMode="contain"
      />
    </View>
  );
}
