import { Slot } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CalculatorColors } from "@/constants/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <StatusBar style="light" />
        <View style={styles.content}>
          <Slot />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CalculatorColors.background,
  },
  content: {
    flex: 1,
  },
});
