import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const MobileLoginScreen = ({ onBack, onSendOtp, onKisanId }) => {
  const { t } = useApp();
  const [mobileNumber, setMobileNumber] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <ArrowLeftIcon size={24} color={Colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.topSection}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/images/opec_logo.png')}
            style={{ width: 64, height: 64, borderRadius: 32 }}
          />
        </View>
        <Text style={styles.title}>{t('enterMobileTitle')}</Text>
        <Text style={styles.subtitle}>{t('enterMobileSubtitle')}</Text>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputRow}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+91</Text>
          </View>
          <TextInput
            style={styles.mobileInput}
            placeholder={t('enter10Digit')}
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
            maxLength={10}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>
        <Text style={styles.helperText}>{t('smsVerificationHelper')}</Text>

        <TouchableOpacity
          style={[styles.sendOtpButton, !mobileNumber && styles.disabledBtn]}
          onPress={() => onSendOtp(mobileNumber || '9876543210')}
          activeOpacity={0.85}
        >
          <Text style={styles.sendOtpText}>{t('sendOtp')}</Text>
          <ArrowRightIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t('orText')}</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.kisanIdButton} onPress={onKisanId} activeOpacity={0.85}>
          <Text style={styles.kisanIcon}>💳</Text>
          <Text style={styles.kisanIdText}>{t('continueKisanId')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.legalFooter}>
        {t('byContinuing')} <Text style={styles.legalLink}>{t('termsOfService')}</Text> {t('andText')}{' '}
        <Text style={styles.legalLink}>{t('privacyPolicy')}</Text>.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  backButton: {
    marginBottom: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 8,
  },
  countryCode: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  mobileInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  helperText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  sendOtpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledBtn: {
    opacity: 0.7,
  },
  sendOtpText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  kisanIdButton: {
    backgroundColor: '#F3EFE6',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  kisanIcon: {
    marginRight: 10,
    fontSize: 18,
  },
  kisanIdText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  legalFooter: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 20,
  },
  legalLink: {
    textDecorationLine: 'underline',
  },
});
