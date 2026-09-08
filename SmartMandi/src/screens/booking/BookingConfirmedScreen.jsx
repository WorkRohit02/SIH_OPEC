import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { BellIcon } from '../../components/common/SvgIcons';

export const BookingConfirmedScreen = ({ booking, onViewGatePass, onGoHome }) => {
  const b = booking || {
    mandiName: 'Azadpur Mandi',
    crop: 'Wheat',
    quantityQuintals: 25,
    date: 'Mon, 12 June',
    timeSlot: '9:00 AM',
    id: '#SM-88213',
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.centerSection}>
        <View style={styles.checkWrapper}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your slot at {b.mandiName} has been reserved.</Text>

        <View style={styles.detailsCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mandi</Text>
            <Text style={styles.valBold}>{b.mandiName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Crop</Text>
            <Text style={styles.val}>{b.crop}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Quantity</Text>
            <Text style={styles.val}>{b.quantityQuintals} quintals</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.val}>{b.date}, {b.timeSlot}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Booking ID</Text>
            <Text style={styles.val}>{b.id}</Text>
          </View>
        </View>

        <View style={styles.reminderCard}>
          <BellIcon size={20} color={Colors.primary} />
          <Text style={styles.reminderText}>You'll get a reminder 1 hour before your slot.</Text>
        </View>
      </View>

      <View style={styles.btnSection}>
        <TouchableOpacity style={styles.gatePassBtn} onPress={onViewGatePass} activeOpacity={0.85}>
          <Text style={styles.qrIcon}>📱</Text>
          <Text style={styles.gatePassText}>View Gate Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeBtn} onPress={onGoHome} activeOpacity={0.85}>
          <Text style={styles.homeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  centerSection: {
    alignItems: 'center',
  },
  checkWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
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
    marginBottom: 24,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  val: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  valBold: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  reminderCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  reminderText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 10,
    fontWeight: '600',
  },
  btnSection: {
    width: '100%',
  },
  gatePassBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  qrIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  gatePassText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  homeBtn: {
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeText: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
});
