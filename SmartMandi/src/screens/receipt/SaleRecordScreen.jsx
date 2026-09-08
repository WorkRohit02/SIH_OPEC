import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const SaleRecordScreen = ({ onBack, onViewPayments }) => {
  const { saleRecord } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sale Record</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Sale Completed Badge */}
      <View style={styles.statusPill}>
        <Text style={styles.statusPillText}>✓ Sale Completed</Text>
      </View>

      {/* Weighment Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weighment Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>MANDI</Text>
          <Text style={styles.val}>{saleRecord.mandiName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CROP</Text>
          <Text style={styles.val}>{saleRecord.crop}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>TOKEN</Text>
          <Text style={styles.val}>{saleRecord.tokenNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>WEIGHED ON</Text>
          <Text style={styles.val}>{saleRecord.weighedAt}</Text>
        </View>
      </View>

      {/* Agreed Payout Calculation Box */}
      <View style={styles.payoutCard}>
        <Text style={styles.payoutLabel}>BOOKED QUANTITY</Text>
        <Text style={styles.payoutSubval}>{saleRecord.bookedQuantity} quintals</Text>

        <Text style={[styles.payoutLabel, { marginTop: 12 }]}>FINAL WEIGHED QUANTITY</Text>
        <Text style={styles.payoutBigVal}>{saleRecord.finalQuantity} quintals</Text>

        <Text style={[styles.payoutLabel, { marginTop: 12 }]}>AGREED RATE</Text>
        <Text style={styles.payoutSubval}>₹{saleRecord.agreedRate.toLocaleString()} / quintal</Text>

        <View style={styles.totalDivider} />

        <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
        <Text style={styles.totalAmount}>₹{saleRecord.totalAmount.toLocaleString()}</Text>
      </View>

      {/* Gross / Deductions breakdown */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>GROSS WEIGHT</Text>
          <Text style={styles.val}>{saleRecord.grossWeight} quintals</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>DEDUCTIONS (MOISTURE/IMPURITY)</Text>
          <Text style={styles.val}>{saleRecord.deductions} quintals</Text>
        </View>
        <View style={[styles.row, { borderTopWidth: 1, borderTopColor: Colors.borderLight, paddingTop: 8 }]}>
          <Text style={[styles.label, { fontWeight: '800', color: Colors.textPrimary }]}>Net Weight</Text>
          <Text style={[styles.val, { fontWeight: '800', color: Colors.primary }]}>{saleRecord.finalQuantity} quintals</Text>
        </View>
      </View>

      {/* Payment timeframe notice */}
      <View style={styles.noticeCard}>
        <Text style={styles.noticeIcon}>ℹ️</Text>
        <Text style={styles.noticeText}>Payment will be processed within 2-3 business days.</Text>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.disputeBtn}>
          <Text style={styles.disputeText}>⚠ Raise a Dispute</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentBtn} onPress={onViewPayments} activeOpacity={0.85}>
          <Text style={styles.paymentBtnText}>View Payment Status</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statusPill: {
    alignSelf: 'center',
    backgroundColor: Colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  statusPillText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  val: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  payoutCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  payoutLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
  },
  payoutSubval: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  payoutBigVal: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  totalDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 14,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primary,
    marginTop: 2,
  },
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  noticeIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  noticeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disputeBtn: {
    flex: 0.42,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disputeText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.danger,
  },
  paymentBtn: {
    flex: 0.54,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  paymentBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
