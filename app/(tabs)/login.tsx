import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  // 状態管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ログインボタンが押されたときの処理
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("エラー", "メールアドレスとパスワードを入力してください。");
      return;
    }

    // （ここにAPIリクエストロジックを追加できます）

    // ホームページ（例：index.tsx）にリダイレクト
    router.push("/");
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>サインイン</Text>

      <Text style={styles.label}>メールアドレス</Text>
      <TextInput
        style={styles.input}
        placeholder="example@example.com"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>パスワード</Text>
      <TextInput
        style={styles.input}
        placeholder="●●●●●●"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>決定</Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/images/shapes.svg")} // 画像のパスを指定
        style={styles.bottomImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6d8f2c",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 30,
  },
  label: {
    alignSelf: "flex-start",
    color: "#fff",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f1b600",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: "#333",
    fontWeight: "bold",
  },
  bottomImage: {
    position: "absolute",
    bottom: 30,
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
});
