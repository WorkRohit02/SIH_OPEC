import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { useApp } from '../../context/AppContext';

export const LanguageSelectScreen = ({ onNext }) => {
  const { language, setLanguage } = useApp();
  const [selectedLang, setSelectedLang] = useState(language || 'Hindi');

  const languages = [
    { code: 'hi', name: 'हिंदी (Hindi)', label: 'Hindi' },
    { code: 'en', name: 'English', label: 'English' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', label: 'Punjabi' },
    { code: 'mr', name: 'मराठी (Marathi)', label: 'Marathi' },
    { code: 'te', name: 'తెలుగు (Telugu)', label: 'Telugu' },
    { code: 'ta', name: 'தமிழ் (Tamil)', label: 'Tamil' },
  ];

  const handleSelect = (langLabel) => {
    setSelectedLang(langLabel);
    setLanguage(langLabel);
  };

  return (
    <GradientBackground style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <View style={styles.logoWrapper}>
            <Image 
              source={require('../../assets/images/opec_logo.png')} 
              style={{ width: 64, height: 64, borderRadius: 32 }} 
            />
          </View>
          <Text style={styles.title}>OPEC</Text>
          <Text style={styles.subtitle}>Sell your crop. Track your queue. Get fair prices.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choose your language</Text>
          <View style={styles.grid}>
            {languages.map((lang) => {
              const isSelected = selectedLang === lang.label;
              return (
                <TouchableOpacity
                  key={lang.code}
                  style={[styles.langButton, isSelected ? styles.langButtonSelected : styles.langButtonUnselected]}
                  onPress={() => handleSelect(lang.label)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.langText, isSelected && styles.langTextSelected]}>
                    {lang.name} {isSelected ? ' ✓' : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={onNext} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={onNext} activeOpacity={0.7}>
            <Text style={styles.linkText}>I already have an account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 36,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoWrapper: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.88)',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    marginVertical: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2E20',
    marginBottom: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  langButton: {
    width: '48.5%',
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  langButtonSelected: {
    backgroundColor: '#176B3A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  langButtonUnselected: {
    backgroundColor: '#6F974F',
    opacity: 0.92,
  },
  langText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  langTextSelected: {
    fontWeight: '800',
  },
  primaryButton: {
    backgroundColor: '#176B3A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  linkText: {
    color: '#176B3A',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 20,
    height: 8,
    borderRadius: 4,
  },
});
