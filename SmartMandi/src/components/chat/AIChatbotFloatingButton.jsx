import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/leaf_icon.png')}
            style={styles.leafImage}
            resizeMode="cover"
          />
          <View style={styles.pulseDot} />
        </View>
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
    bottom: 80, // Positioned right above the BottomNav bar
    right: 18,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.primary, // Dark green background
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: Colors.cardBgSecondary, // Cream accent border
    zIndex: 999,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leafImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  pulseDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FF66',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});
