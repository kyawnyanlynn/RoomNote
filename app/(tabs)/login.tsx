import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
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
  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string; character?: "tree" | "flower" }[]
  >([]);
  const scrollRef = useRef<ScrollView>(null);

  // 自动滚动到底部
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, [messages]);

  // 初始消息
  useEffect(() => {
    setMessages([]); // 清空历史消息
    const greetMsgs = [
      { sender: "bot", text: "こんにちは！お部屋探しでお困りですか？", character: "tree" as const },
      { sender: "bot", text: "RoomNoteがあなたのお部屋探しをしっかりサポートします！", character: "tree" as const },
      { sender: "bot", text: "ログインするために、電話番号を教えていただけますか？", character: "tree" as const },
    ];
    let idx = 0;
    const showNext = () => {
      if (idx < greetMsgs.length) {
        const msg = greetMsgs[idx];
        if (msg) {
          setMessages((prev) => [...prev, msg]);
        }
        idx++;
        if (idx < greetMsgs.length) {
          setTimeout(showNext, 600);
        }
      }
    };
    showNext();
  }, []);

  const [phone, setPhone] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("JP");
  const [callingCode, setCallingCode] = useState("81");

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handleSendPhoneNumber = async () => {
    const fullNumber = `+${callingCode}${phoneInput}`;
    if (phoneInput.trim() === "") return;

    if (!isValidPhoneNumber(phoneInput)) {
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

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: fullNumber, character: "flower" },
      {
        sender: "bot",
        text: fullNumber.endsWith("0")
          ? "おかえりなさい！確認コードをSMSに送信しました。"
          : "確認コードをSMSで送信しました。",
        character: "tree",
      },
    ]);

    setPhoneInput("");
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
          <View style={{ marginTop: 12, paddingHorizontal: 20, paddingBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 6, borderWidth: 1, borderColor: "#000", paddingHorizontal: 12 }}>
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
              <TextInput
                style={{ fontSize: 18, color: "#000", flex: 1 }}
                placeholder="00-0000-0000"
                keyboardType="phone-pad"
                value={phoneInput}
                onChangeText={setPhoneInput}
              />
              <TouchableOpacity
                onPress={handleSendPhoneNumber}
              >
                <MaterialIcons name="arrow-forward-ios" size={20} color="#6d8f2c" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
