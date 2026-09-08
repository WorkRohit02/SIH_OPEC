import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';

export const OtpVerificationScreen = ({ mobileNumber, onBack, onVerify }) => {
  // OTP blocks initially EMPTY as requested by user
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(28);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDigitChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Verify your number</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to +91 {mobileNumber || '98765 43210'}{' '}
          <Text style={styles.editLink} onPress={onBack}>
            Edit
          </Text>
        </Text>

        <View style={styles.otpGrid}>
          {otp.map((digit, idx) => {
            const isFocused = idx === 0 && !digit;
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
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleDigitChange(text, idx)}
                  placeholder=""
                />
              </View>
            );
          })}
        </View>

        <Text style={styles.timerText}>
          Resend code in<Text style={styles.timerBold}> 00:{timer < 10 ? `0${timer}` : timer}</Text>
        </Text>

        <TouchableOpacity style={styles.verifyButton} onPress={onVerify} activeOpacity={0.85}>
          <Text style={styles.verifyButtonText}>Verify & Continue</Text>
        </TouchableOpacity>

        <Text style={styles.smsNote}>Didn't receive the code? Check your SMS inbox.</Text>
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
