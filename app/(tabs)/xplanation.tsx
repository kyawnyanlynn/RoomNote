import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import ExplanationPager from "./ExplanationPager";

export default function Explanation() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <ExplanationPager />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7A9B4A",
  },
});
