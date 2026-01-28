import React, { useState, useCallback } from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { CalculatorColors } from '@/constants/theme';

const NEQUI_NUMBER = '3228449181';

interface DonationModalProps {
  visible: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ visible, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = useCallback(async () => {
    await Clipboard.setStringAsync(NEQUI_NUMBER);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.emoji}>🎮</Text>
          <Text style={styles.title}>¡Ayuda al desarrollador!</Text>
          <Text style={styles.message}>
            Si te gusta esta app, considera hacer una pequeña donación para que pueda comprarme el Resident Evil 9 Requiem 🧟
          </Text>
          <Pressable style={styles.nequiContainer} onPress={handleCopyNumber}>
            <Text style={styles.nequiLabel}>Nequi (toca para copiar):</Text>
            <Text style={styles.nequiNumber}>{NEQUI_NUMBER}</Text>
            {copied && <Text style={styles.copiedText}>¡Copiado!</Text>}
          </Pressable>
          <Text style={styles.thanks}>¡Gracias por tu apoyo! 🙏</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 16,
  },
  title: {
    color: CalculatorColors.displayText,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    color: CalculatorColors.expressionText,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  nequiContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  nequiLabel: {
    color: CalculatorColors.operatorButton,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  nequiNumber: {
    color: CalculatorColors.displayText,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 2,
  },
  thanks: {
    color: CalculatorColors.expressionText,
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: CalculatorColors.operatorButton,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: CalculatorColors.operatorText,
    fontSize: 16,
    fontWeight: '600',
  },
  copiedText: {
    color: '#4CD964',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});
