import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { signInWithPhoneNumber } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "../../lib/firebaseConfig";

console.log("Auth and DB initialized:", auth, db);

const screenHeight = Dimensions.get("window").height;

// 手机号校验函数（只允许数字，9～15位）
const isValidPhoneNumber = (number: string): boolean => {
  const cleaned = number.replace(/\D/g, ""); // 去除非数字字符
  return cleaned.length >= 9 && cleaned.length <= 15;
};

// 可爱的角色组件
const Character = ({ type }: { type: "tree" | "flower" }) => {
  const source =
    type === "tree"
      ? require("../../assets/images/character.png")
      : require("../../assets/images/character-yellow.png");
  return (
    <Image
      source={source}
      style={{
        width: 48,
        height: 48,
        marginHorizontal: 8,
        resizeMode: "contain",
      }}
    />
  );
};

// 聊天气泡组件
const Message = ({
  sender,
  children,
  character,
}: {
  sender: "bot" | "user";
  children: React.ReactNode;
  character?: "tree" | "flower";
}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: sender === "bot" ? "flex-start" : "flex-end",
      alignItems: "flex-start",
      marginVertical: 6,
      marginHorizontal: 12,
    }}
  >
    {sender === "bot" && character && (
      <View style={{ marginRight: 8, marginTop: 2 }}>
        <Character type={character} />
      </View>
    )}
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxWidth: "75%",
        borderWidth: 0.5,
        borderColor: "#000",
      }}
    >
      <Text style={{ fontSize: 15 }}>{children}</Text>
    </View>
    {sender === "user" && character && (
      <View style={{ marginLeft: 8, marginTop: 2 }}>
        <Character type={character} />
      </View>
    )}
  </View>
);

export default function LoginScreen() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const reset = searchParams.reset === "true";
  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string; character?: "tree" | "flower" }[]
  >([]);
  const scrollRef = useRef<ScrollView>(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("JP");
  const [callingCode, setCallingCode] = useState("81");
  const [showNextButton, setShowNextButton] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fakeVerifier = {
    type: "recaptcha",
    verify: () => Promise.resolve("test-verification-code"),
    _reset: () => {}, // 添加空的 _reset 方法，避免 TypeError
  };

  // 自动滚动到底部
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useFocusEffect(
    useCallback(() => {
      if (reset) {
        resetChat();
        setTimeout(() => {
          showGreeting();
        }, 100);
      }
    }, [reset])
  );

  const resetChat = () => {
    setMessages([]);
    setShowNextButton(false);
    setPhoneNumber("");
    setVerificationCode("");
    setConfirmationResult(null);
  };

  const showGreeting = () => {
    const greetMsgs = [
      { sender: "bot", text: "こんにちは！お部屋探しでお困りですか？", character: "tree" as const },
      { sender: "bot", text: "RoomNoteがあなたのお部屋探しをしっかりサポートします！", character: "tree" as const },
      { sender: "bot", text: "ログインするために、電話番号を教えていただけますか？", character: "tree" as const },
    ];

    let idx = 0;
    const showNext = () => {
      if (idx < greetMsgs.length) {
        const msg = greetMsgs[idx];
        setMessages((prev) => [...prev, msg]);
        idx++;
        if (idx < greetMsgs.length) {
          setTimeout(showNext, 600);
        }
      }
    };
    showNext();
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handleSubmit = async () => {
    if (confirmationResult) {
      try {
        const result = await confirmationResult.confirm(verificationCode.trim());
        const user = result.user;

        setMessages((prev) => [...prev, { sender: "user", text: verificationCode.trim(), character: "flower" }]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "ログインに成功しました！",
              character: "tree",
            },
          ]);
          setTimeout(() => {
            setShowNextButton(true); // 延迟显示按钮
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }, 800);
        }, 800);

        setConfirmationResult(null);

        // 写入 Firestore
        const userDocRef = doc(db, "users", user.phoneNumber || user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            createdAt: new Date(),
          });
        }

      } catch (e) {
        console.error("確認失敗:", e);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "確認コードが正しくありません。もう一度お試しください。",
            character: "tree",
          },
        ]);
      }

      setVerificationCode("");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "すみません、電話番号の形式が正しくないようです💦もう一度ご確認いただけますか？",
          character: "tree",
        },
      ]);
      return;
    }

    const fullNumber = `+${callingCode}${phoneNumber.trim()}`;

    try {
      const userDocRef = doc(db, "users", fullNumber);
      const userDocSnap = await getDoc(userDocRef);
      const isNewUser = !userDocSnap.exists();

      const result = await signInWithPhoneNumber(auth, fullNumber, fakeVerifier);
      setConfirmationResult(result);

      setMessages((prev) => [...prev, { sender: "user", text: fullNumber, character: "flower" }]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: isNewUser
              ? "新規アカウントを作成しました。確認コードをSMSで送信しました。"
              : "お帰りなさい！確認コードをSMSに送信しました。",
            character: "tree",
          },
        ]);
      }, 800); // 延迟 800ms 回复
    } catch (error) {
      console.error("SMS送信エラー:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "エラーが発生しました。もう一度お試しください。",
          character: "tree",
        },
      ]);
    }

    setPhoneNumber("");
  };

  return (
    <>
      <View id="recaptcha-container" />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#74952F" }}
        edges={["top", "left", "right"]}
      >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View
          style={{
            height: screenHeight * 0.80,
            width: "92%",
            backgroundColor: "#FFFFF2",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            overflow: "visible",
            alignSelf: "center",
          }}
        >
          <View style={{ position: "absolute", top: 20, alignSelf: "center", zIndex: 10 }}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{
                width: 160,
                height: 48,
                resizeMode: "contain",
              }}
            />
          </View>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              paddingTop: 80,
              paddingHorizontal: 12,
              paddingBottom: 100,
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg, idx) => {
              if (!msg) return null;
              const isFirstOfGroup = idx === 0 || messages[idx - 1].sender !== msg.sender;
              const isUser = msg.sender === "user";

              return (
                <View
                  key={idx}
                  style={{
                    flexDirection: isUser ? "row-reverse" : "row",
                    alignItems: "flex-start",
                    marginTop: idx > 0 && messages[idx - 1].sender !== msg.sender ? 16 : 4,
                    marginBottom: 4,
                    marginLeft: isUser ? 30 : 0,
                    marginRight: isUser ? 0 : 30,
                  }}
                >
                  {msg.character && (
                    <View
                      style={{
                        marginHorizontal: 1,
                        marginTop: 2,
                        opacity: isFirstOfGroup ? 1 : 0,
                      }}
                    >
                      <Character type={msg.character} />
                    </View>
                  )}
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 24,
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      maxWidth: "75%",
                      borderWidth: 0.5,
                      borderColor: "#000",
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>{msg.text}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          {showNextButton && auth.currentUser && (
            <Animated.View
              style={{
                opacity: fadeAnim,
                alignSelf: "center",
                marginBottom: 40,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#94B74B",
                  paddingVertical: 14,
                  paddingHorizontal: 28,
                  borderRadius: 24,
                }}
                onPress={async () => {
                  const user = auth.currentUser;
                  if (!user) return;

                  const prefDoc = await getDoc(doc(db, "userPreferences", user.uid));
                  if (prefDoc.exists()) {
                    router.replace("/list"); // 偏好已存在，跳转列表页
                  } else {
                    router.replace("/conditionScreen"); // 无偏好，跳转设定页
                  }
                }}
              >
                <Text style={{ color: "#fff", fontSize: 18 }}>次に移動</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          {!showNextButton && !auth.currentUser && (
            <View style={{ marginTop: 12, paddingHorizontal: 20, paddingBottom: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 6, borderWidth: 1, borderColor: "#000", paddingHorizontal: 12 }}>
                {!confirmationResult && (
                  <>
                    <CountryPicker
                      countryCode={countryCode}
                      withFilter
                      withFlag
                      withCallingCode
                      withEmoji
                      withModal
                      onSelect={onSelect}
                    />
                    <Text style={{ marginLeft: 6, fontSize: 16 }}>+{callingCode}</Text>
                  </>
                )}
                <TextInput
                  style={{ fontSize: 18, color: "#000", flex: 1, paddingVertical: 12, height: 48 }}
                  placeholder={confirmationResult ? "確認コード" : "00-0000-0000"}
                  keyboardType="phone-pad"
                  value={confirmationResult ? verificationCode : phoneNumber}
                  onChangeText={confirmationResult ? setVerificationCode : setPhoneNumber}
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                >
                  <MaterialIcons name="arrow-forward-ios" size={20} color="#94B74B" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
