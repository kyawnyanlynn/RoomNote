import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("エラー", "メールアドレスとパスワードを入力してください。");
      return;
    }
    router.push("/");
    setEmail("");
    setPassword("");
  };

  return (
    <View className="flex-1 bg-[#6d8f2c] items-center justify-center p-5">
      <Text className="text-2xl text-white mb-8">サインイン</Text>

      <Text className="self-start text-white mb-1 mt-2">メールアドレス</Text>
      <TextInput
        className="w-full h-11 bg-white rounded-lg px-3 mb-2"
        placeholder="example@example.com"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
      />

      <Text className="self-start text-white mb-1 mt-2">パスワード</Text>
      <TextInput
        className="w-full h-11 bg-white rounded-lg px-3 mb-2"
        placeholder="●●●●●●"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        className="bg-[#f1b600] py-2 px-8 rounded-lg mt-5"
        onPress={handleLogin}
      >
        <Text className="text-[#333] font-bold">決定</Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/images/shapes.svg")}
        className="absolute bottom-8 w-[150px] h-10"
        resizeMode="contain"
      />
    </View>
  );
}
