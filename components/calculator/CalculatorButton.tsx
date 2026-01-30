import { CalculatorColors, CalculatorSizes } from "@/constants/theme";
import { ButtonVariant } from "@/types/calculator";
import * as Haptics from "expo-haptics";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text } from "react-native";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = (width - CalculatorSizes.buttonSpacing * 5) / 4;

interface CalculatorButtonProps {
  label: string;
  onPress: () => void;
  variant: ButtonVariant;
  wide?: boolean;
  isActive?: boolean;
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onPress,
  variant,
  wide = false,
  isActive = false,
}) => {
  const handlePress = () => {
    Haptics.selectionAsync();
    onPress();
  };

  const getBackgroundColor = () => {
    if (variant === "operator" && isActive) {
      return CalculatorColors.operatorButtonActive;
    }
    switch (variant) {
      case "number":
        return CalculatorColors.numberButton;
      case "operator":
        return CalculatorColors.operatorButton;
      case "function":
        return CalculatorColors.functionButton;
    }
  };

  const getTextColor = () => {
    if (variant === "operator" && isActive) {
      return CalculatorColors.operatorTextActive;
    }
    switch (variant) {
      case "number":
        return CalculatorColors.numberText;
      case "operator":
        return CalculatorColors.operatorText;
      case "function":
        return CalculatorColors.functionText;
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          width: wide
            ? BUTTON_SIZE * 2 + CalculatorSizes.buttonSpacing
            : BUTTON_SIZE,
          opacity: pressed ? 0.7 : 1,
        },
        wide && styles.wideButton,
      ]}
    >
      <Text style={[styles.text, { color: getTextColor() }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  wideButton: {
    alignItems: "center",
  },
  text: {
    fontSize: CalculatorSizes.fontSize.button,
    fontWeight: "500",
  },
});
