import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { CalculatorDisplay } from "@/components/calculator/CalculatorDisplay";
import { CalculatorKeypad } from "@/components/calculator/CalculatorKeypad";
import { DonationModal } from "@/components/calculator/DonationModal";
import { useCalculator } from "@/hooks/useCalculator";
import { CalculatorColors } from "@/constants/theme";

const DONATION_CHANCE = 0.15; // 15% de probabilidad

export default function CalculatorScreen() {
  const [showDonation, setShowDonation] = useState(false);

  const {
    displayValue,
    expression,
    resultPreview,
    onNumberPress,
    onOperatorPress,
    onEqualsPress,
    onClearPress,
    onDeletePress,
    onToggleSignPress,
    onDecimalPress,
    activeOperator,
  } = useCalculator();

  const handleEqualsPress = useCallback(() => {
    onEqualsPress();
    if (Math.random() < DONATION_CHANCE) {
      setShowDonation(true);
    }
  }, [onEqualsPress]);

  return (
    <View style={styles.container}>
      <CalculatorDisplay
        expression={expression}
        resultPreview={resultPreview}
        currentValue={displayValue}
      />
      <CalculatorKeypad
        onNumberPress={onNumberPress}
        onOperatorPress={onOperatorPress}
        onEqualsPress={handleEqualsPress}
        onClearPress={onClearPress}
        onDeletePress={onDeletePress}
        onToggleSignPress={onToggleSignPress}
        onDecimalPress={onDecimalPress}
        activeOperator={activeOperator}
      />
      <DonationModal
        visible={showDonation}
        onClose={() => setShowDonation(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CalculatorColors.background,
  },
});
