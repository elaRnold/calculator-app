import { useState, useCallback, useMemo } from 'react';
import { Operator, CalculatorState, UseCalculatorReturn } from '@/types/calculator';

const MAX_DIGITS = 9;

const calculate = (a: string, b: string, op: Operator): string => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) return 'Error';

  let result: number;
  switch (op) {
    case '+':
      result = numA + numB;
      break;
    case '-':
      result = numA - numB;
      break;
    case 'x':
      result = numA * numB;
      break;
    case '÷':
      if (numB === 0) return 'Error';
      result = numA / numB;
      break;
    default:
      return b;
  }

  const resultStr = String(result);
  if (resultStr.length > 12) {
    return result.toPrecision(8);
  }
  return resultStr;
};

const formatNumber = (value: string): string => {
  if (value === 'Error') return value;

  const num = parseFloat(value);
  if (isNaN(num)) return '0';

  if (value.includes('.') && value.endsWith('.')) {
    return value;
  }

  if (value.includes('.')) {
    const [intPart, decPart] = value.split('.');
    const formattedInt = parseInt(intPart).toLocaleString('en-US');
    return `${formattedInt}.${decPart}`;
  }

  return num.toLocaleString('en-US');
};

export const useCalculator = (): UseCalculatorReturn => {
  const [state, setState] = useState<CalculatorState>({
    currentValue: '0',
    previousValue: '',
    operator: null,
    isNewNumber: true,
    expression: '',
  });

  const onNumberPress = useCallback((num: string) => {
    setState((prev) => {
      if (prev.isNewNumber) {
        return {
          ...prev,
          currentValue: num,
          isNewNumber: false,
        };
      }

      if (prev.currentValue.replace(/[^0-9]/g, '').length >= MAX_DIGITS) {
        return prev;
      }

      if (prev.currentValue === '0' && num !== '0') {
        return {
          ...prev,
          currentValue: num,
        };
      }

      if (prev.currentValue === '0' && num === '0') {
        return prev;
      }

      return {
        ...prev,
        currentValue: prev.currentValue + num,
      };
    });
  }, []);

  const onOperatorPress = useCallback((op: Operator) => {
    setState((prev) => {
      if (prev.operator && !prev.isNewNumber) {
        const result = calculate(prev.previousValue, prev.currentValue, prev.operator);
        return {
          currentValue: result,
          previousValue: result,
          operator: op,
          isNewNumber: true,
          expression: `${result} ${op}`,
        };
      }

      return {
        ...prev,
        previousValue: prev.currentValue,
        operator: op,
        isNewNumber: true,
        expression: `${prev.currentValue} ${op}`,
      };
    });
  }, []);

  const onEqualsPress = useCallback(() => {
    setState((prev) => {
      if (!prev.operator || !prev.previousValue) {
        return prev;
      }

      const result = calculate(prev.previousValue, prev.currentValue, prev.operator);
      return {
        currentValue: result,
        previousValue: '',
        operator: null,
        isNewNumber: true,
        expression: '',
      };
    });
  }, []);

  const onClearPress = useCallback(() => {
    setState({
      currentValue: '0',
      previousValue: '',
      operator: null,
      isNewNumber: true,
      expression: '',
    });
  }, []);

  const onDeletePress = useCallback(() => {
    setState((prev) => {
      if (prev.isNewNumber || prev.currentValue === '0' || prev.currentValue === 'Error') {
        return {
          ...prev,
          currentValue: '0',
          isNewNumber: true,
        };
      }

      const newValue = prev.currentValue.slice(0, -1);
      return {
        ...prev,
        currentValue: newValue === '' || newValue === '-' ? '0' : newValue,
      };
    });
  }, []);

  const onToggleSignPress = useCallback(() => {
    setState((prev) => {
      if (prev.currentValue === '0' || prev.currentValue === 'Error') {
        return prev;
      }

      const newValue = prev.currentValue.startsWith('-')
        ? prev.currentValue.slice(1)
        : `-${prev.currentValue}`;

      return {
        ...prev,
        currentValue: newValue,
      };
    });
  }, []);

  const onDecimalPress = useCallback(() => {
    setState((prev) => {
      if (prev.currentValue.includes('.')) {
        return prev;
      }

      if (prev.isNewNumber) {
        return {
          ...prev,
          currentValue: '0.',
          isNewNumber: false,
        };
      }

      return {
        ...prev,
        currentValue: prev.currentValue + '.',
      };
    });
  }, []);

  const resultPreview = useMemo(() => {
    if (!state.operator || !state.previousValue || state.isNewNumber) {
      return '';
    }
    const preview = calculate(state.previousValue, state.currentValue, state.operator);
    return formatNumber(preview);
  }, [state.operator, state.previousValue, state.currentValue, state.isNewNumber]);

  const displayExpression = useMemo(() => {
    if (!state.expression) return '';

    if (!state.isNewNumber && state.operator) {
      return `${state.previousValue} ${state.operator} ${state.currentValue}`;
    }
    return state.expression;
  }, [state.expression, state.previousValue, state.operator, state.currentValue, state.isNewNumber]);

  return {
    displayValue: formatNumber(state.currentValue),
    expression: displayExpression,
    resultPreview,
    onNumberPress,
    onOperatorPress,
    onEqualsPress,
    onClearPress,
    onDeletePress,
    onToggleSignPress,
    onDecimalPress,
    activeOperator: state.isNewNumber ? state.operator : null,
  };
};
