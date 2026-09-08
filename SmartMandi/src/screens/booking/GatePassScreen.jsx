import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, QrCodeGraphic, BarcodeGraphic } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const GatePassScreen = ({ onBack }) => {
  const { user, activeBooking } = useApp();

  const booking = activeBooking || {
    mandiName: 'Azadpur Mandi',
    crop: 'Wheat',
    quantityQuintals: 25,
    date: '12 Jun 2024',
    timeSlot: '9:00 AM',
    tokenNumber: '#042',
    vehicleNumber: 'Not added',
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gate Pass</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Ticket Card */}
      <View style={styles.ticketCard}>
        <View style={styles.ticketHeader}>
          <Text style={styles.brandTitle}>Smart Mandi</Text>
          <View style={styles.confirmedPill}>
            <Text style={styles.confirmedPillText}>Confirmed</Text>
          </View>
        </View>

        {/* QR Code Container */}
        <View style={styles.qrContainer}>
          <QrCodeGraphic size={150} />
        </View>

        <Text style={styles.tokenTitle}>Token {booking.tokenNumber}</Text>

        <View style={styles.detailsGrid}>
          <View style={styles.gridCol}>
            <Text style={styles.gridLabel}>FARMER</Text>
            <Text style={styles.gridVal}>{user.name || 'Ramesh Kumar'}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridLabel}>MANDI</Text>
            <Text style={styles.gridVal}>{booking.mandiName}</Text>
          </View>

          <View style={styles.gridCol}>
            <Text style={styles.gridLabel}>CROP</Text>
            <Text style={styles.gridVal}>{booking.crop}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridLabel}>QUANTITY</Text>
            <Text style={styles.gridVal}>{booking.quantityQuintals} quintals</Text>
          </View>

          <View style={styles.gridCol}>
            <Text style={styles.gridLabel}>SLOT TIME</Text>
            <Text style={styles.gridVal}>{booking.timeSlot}, {booking.date}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridLabel}>VEHICLE</Text>
            <Text style={styles.gridVal}>{booking.vehicleNumber || 'Not added'} <Text style={styles.addText}>Add</Text></Text>
          </View>
        </View>

        {/* Barcode */}
        <View style={styles.barcodeContainer}>
          <BarcodeGraphic width={220} height={40} />
        </View>

        {/* Instruction Callout */}
        <View style={styles.instructionBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.instructionText}>
            Present this pass at the mandi entry gate. Keep your phone charged or take a screenshot.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadText}>Download PDF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  confirmedPill: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  confirmedPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  tokenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  gridCol: {
    width: '48%',
    marginBottom: 12,
  },
  gridLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  gridVal: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  addText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  barcodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  instructionBox: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  infoIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  instructionText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareBtn: {
    flex: 0.46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  shareText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  downloadBtn: {
    flex: 0.5,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
