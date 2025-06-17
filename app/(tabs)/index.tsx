import { useRouter } from "expo-router";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import "../../global.css"; // Import global styles if needed

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/Background.png")} // Put your image path here
      style={styles.background}
      resizeMode="cover" // or "contain" if you prefer
    >
      <View style={styles.container}>
        <Text style={styles.logo}>ルームノート</Text>
        <Image
          source={require("../../assets/images/HomePage_Door.svg")} // Use PNG/JPG for <Image>
          style={styles.image}
          resizeMode="contain"
        />
        <Text className="text-blue-800">もう忘れない！</Text>
        <Text style={styles.subtitle}>記録も比較も全部ここに。</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.3)", // optional overlay for contrast
  },
  logo: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
});
