import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

export const GradientBackground = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Background SVG gradient */}
      <View style={styles.background} pointerEvents="none">
        <Svg height="100%" width="100%" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="languageScreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#1B5E3C" stopOpacity="1" />
              <Stop offset="20%" stopColor="#2E7D45" stopOpacity="1" />
              <Stop offset="40%" stopColor="#4C8C4A" stopOpacity="1" />
              <Stop offset="60%" stopColor="#7A9A4D" stopOpacity="1" />
              <Stop offset="78%" stopColor="#C4C97A" stopOpacity="1" />
              <Stop offset="90%" stopColor="#EDE9A8" stopOpacity="1" />
              <Stop offset="100%" stopColor="#F7F3C8" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#languageScreenGradient)" />
        </Svg>
      </View>

      {/* Screen content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
});

