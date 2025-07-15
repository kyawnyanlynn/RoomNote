import React, { useEffect, useRef } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import FirstExplanation from "./firstExplanation";
import SecondExplanation from "./secondExplanation";
import ThirdExplanation from "./ThirdExplanation";

const { width } = Dimensions.get("window");

export default function ExplanationPager() {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    let page = 0;
    const timer = setInterval(() => {
      page++;
      if (page > 2) {
        clearInterval(timer);
        return;
      }
      scrollRef.current?.scrollTo({ x: width * page, animated: true });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#7A9B4A" }}
      scrollEventThrottle={16}
    >
      <View style={{ width, flex: 1 }}>
        <FirstExplanation />
      </View>
      <View style={{ width, flex: 1 }}>
        <SecondExplanation />
      </View>
      <View style={{ width, flex: 1 }}>
        <ThirdExplanation />
      </View>
    </ScrollView>
  );
}
