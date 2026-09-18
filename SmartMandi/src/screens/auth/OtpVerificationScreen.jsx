import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const OtpVerificationScreen = ({ mobileNumber, onBack, onVerify }) => {
  const { t } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(28);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleDigitChange = (text, index) => {
    if (text.length > 1) {
      const digits = text.replace(/[^0-9]/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>{t('verifyNumberTitle')}</Text>
        <Text style={styles.subtitle}>
          {t('enter6DigitCode')} +91 {mobileNumber || '98765 43210'}{' '}
          <Text style={styles.editLink} onPress={onBack}>
            {t('editText')}
          </Text>
        </Text>

        <View style={styles.otpGrid}>
          {otp.map((digit, idx) => {
            const isFocused = focusedIndex === idx;
            return (
              <View
                key={idx}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                  isFocused ? styles.otpBoxFocused : null,
                ]}
              >
                <TextInput
                  ref={(ref) => (inputRefs.current[idx] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={6}
                  value={digit}
                  onChangeText={(text) => handleDigitChange(text, idx)}
                  onKeyPress={(e) => handleKeyPress(e, idx)}
                  onFocus={() => setFocusedIndex(idx)}
                  placeholder=""
                  selectTextOnFocus
                />
              </View>
            );
          })}
        </View>

        <Text style={styles.timerText}>
          {t('resendCodeIn')}<Text style={styles.timerBold}> 00:{timer < 10 ? `0${timer}` : timer}</Text>
        </Text>

        <TouchableOpacity style={styles.verifyButton} onPress={onVerify} activeOpacity={0.85}>
          <Text style={styles.verifyButtonText}>{t('verifyAndContinue')}</Text>
        </TouchableOpacity>

        <Text style={styles.smsNote}>{t('didntReceiveSms')}</Text>
      </View>
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
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 32,
    lineHeight: 20,
  },
  editLink: {
    color: Colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.inputBg,
    borderWidth: 1.5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFilled: {
    backgroundColor: '#FFFFFF',
    borderColor: Colors.border,
  },
  otpBoxFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFFFF',
  },
  otpInput: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  timerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 28,
  },
  timerBold: {
    color: Colors.primary,
    fontWeight: '800',
  },
  verifyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  smsNote: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
