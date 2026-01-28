import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { CalculatorColors, CalculatorSizes } from '@/constants/theme';

interface CalculatorDisplayProps {
  expression: string;
  resultPreview: string;
  currentValue: string;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  expression,
  resultPreview,
  currentValue,
}) => {
  const [copied, setCopied] = useState(false);

  const getFontSize = (value: string) => {
    const length = value.replace(/,/g, '').length;
    if (length > 9) return 50;
    if (length > 7) return 60;
    if (length > 5) return 70;
    return CalculatorSizes.fontSize.display;
  };

  const handleCopy = useCallback(async () => {
    const valueToCopy = currentValue.replace(/,/g, '');
    await Clipboard.setStringAsync(valueToCopy);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [currentValue]);

  return (
    <View style={styles.container}>
      {expression ? (
        <Text style={styles.expression} numberOfLines={1}>
          {expression}
        </Text>
      ) : (
        <View style={styles.expressionPlaceholder} />
      )}
      <Pressable onPress={handleCopy}>
        <Text
          style={[styles.display, { fontSize: getFontSize(currentValue) }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {currentValue}
        </Text>
        {copied && (
          <Text style={styles.copiedText}>Copiado</Text>
        )}
      </Pressable>
      {resultPreview ? (
        <Text style={styles.preview} numberOfLines={1}>
          {resultPreview}
        </Text>
      ) : (
        <View style={styles.previewPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: CalculatorSizes.displayPadding,
    paddingBottom: 20,
  },
  expression: {
    color: CalculatorColors.expressionText,
    fontSize: CalculatorSizes.fontSize.expression,
    fontWeight: '400',
    marginBottom: 10,
  },
  expressionPlaceholder: {
    height: CalculatorSizes.fontSize.expression + 10,
  },
  display: {
    color: CalculatorColors.displayText,
    fontWeight: '300',
  },
  preview: {
    color: CalculatorColors.previewText,
    fontSize: CalculatorSizes.fontSize.preview,
    fontWeight: '300',
    marginTop: 10,
  },
  previewPlaceholder: {
    height: CalculatorSizes.fontSize.preview + 10,
  },
  copiedText: {
    color: CalculatorColors.operatorButton,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 4,
  },
});
