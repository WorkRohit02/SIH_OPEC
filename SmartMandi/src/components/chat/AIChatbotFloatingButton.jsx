import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { AIChatbotModal } from './AIChatbotModal';

export const AIChatbotFloatingButton = ({ onNavigate }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.botIcon}>🤖</Text>
          <View style={styles.pulseDot} />
        </View>
        <Text style={styles.buttonLabel}>Kisan AI</Text>
      </TouchableOpacity>

      <AIChatbotModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 80, // Positioned above the BottomNav bar
    right: 18,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    zIndex: 999,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 8,
  },
  botIcon: {
    fontSize: 18,
  },
  pulseDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF66',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.3,
  },
});
