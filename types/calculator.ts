export type ButtonVariant = 'number' | 'operator' | 'function';

export type Operator = '+' | '-' | 'x' | '÷' | null;

export interface ButtonConfig {
  label: string;
  value: string;
  variant: ButtonVariant;
  wide?: boolean;
}

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operator: Operator;
  isNewNumber: boolean;
  expression: string;
}

export interface UseCalculatorReturn {
  displayValue: string;
  expression: string;
  resultPreview: string;
  onNumberPress: (num: string) => void;
  onOperatorPress: (op: Operator) => void;
  onEqualsPress: () => void;
  onClearPress: () => void;
  onDeletePress: () => void;
  onToggleSignPress: () => void;
  onDecimalPress: () => void;
  activeOperator: Operator;
}
