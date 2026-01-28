import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalculatorButton } from './CalculatorButton';
import { Operator, ButtonConfig } from '@/types/calculator';
import { CalculatorSizes } from '@/constants/theme';

interface CalculatorKeypadProps {
  onNumberPress: (num: string) => void;
  onOperatorPress: (op: Operator) => void;
  onEqualsPress: () => void;
  onClearPress: () => void;
  onDeletePress: () => void;
  onToggleSignPress: () => void;
  onDecimalPress: () => void;
  activeOperator: Operator;
}

const buttonRows: ButtonConfig[][] = [
  [
    { label: 'C', value: 'clear', variant: 'function' },
    { label: '+/-', value: 'toggle', variant: 'function' },
    { label: 'del', value: 'delete', variant: 'function' },
    { label: '÷', value: '÷', variant: 'operator' },
  ],
  [
    { label: '7', value: '7', variant: 'number' },
    { label: '8', value: '8', variant: 'number' },
    { label: '9', value: '9', variant: 'number' },
    { label: 'x', value: 'x', variant: 'operator' },
  ],
  [
    { label: '4', value: '4', variant: 'number' },
    { label: '5', value: '5', variant: 'number' },
    { label: '6', value: '6', variant: 'number' },
    { label: '-', value: '-', variant: 'operator' },
  ],
  [
    { label: '1', value: '1', variant: 'number' },
    { label: '2', value: '2', variant: 'number' },
    { label: '3', value: '3', variant: 'number' },
    { label: '+', value: '+', variant: 'operator' },
  ],
  [
    { label: '0', value: '0', variant: 'number', wide: true },
    { label: '.', value: '.', variant: 'number' },
    { label: '=', value: '=', variant: 'operator' },
  ],
];

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  onNumberPress,
  onOperatorPress,
  onEqualsPress,
  onClearPress,
  onDeletePress,
  onToggleSignPress,
  onDecimalPress,
  activeOperator,
}) => {
  const handleButtonPress = (button: ButtonConfig) => {
    switch (button.value) {
      case 'clear':
        onClearPress();
        break;
      case 'toggle':
        onToggleSignPress();
        break;
      case 'delete':
        onDeletePress();
        break;
      case '=':
        onEqualsPress();
        break;
      case '.':
        onDecimalPress();
        break;
      case '+':
      case '-':
      case 'x':
      case '÷':
        onOperatorPress(button.value as Operator);
        break;
      default:
        onNumberPress(button.value);
    }
  };

  return (
    <View style={styles.container}>
      {buttonRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((button) => (
            <CalculatorButton
              key={button.value}
              label={button.label}
              variant={button.variant}
              wide={button.wide}
              isActive={
                button.variant === 'operator' &&
                button.value !== '=' &&
                activeOperator === button.value
              }
              onPress={() => handleButtonPress(button)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CalculatorSizes.buttonSpacing,
    paddingBottom: CalculatorSizes.buttonSpacing,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: CalculatorSizes.buttonSpacing,
  },
});
