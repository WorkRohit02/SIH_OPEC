import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const ManageBookingScreen = ({ onBack, onConfirmReschedule }) => {
  const { activeBooking, setActiveBooking } = useApp();
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('9:00 AM');

  const dates = ['Tomorrow', 'Day After', 'In 3 Days', 'In 4 Days'];
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM Full'];

  const handleConfirm = () => {
    if (activeBooking) {
      setActiveBooking({
        ...activeBooking,
        date: selectedDate,
        timeSlot: selectedTime,
        status: 'Rescheduled',
      });
    }
    onConfirmReschedule();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Booking Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.mandiName}>{activeBooking?.mandiName || 'Azadpur Mandi'}</Text>
        <Text style={styles.cropText}>
          {activeBooking?.crop || 'Wheat'} · {activeBooking?.quantityQuintals || 25} quintals
        </Text>
        <Text style={styles.metaText}>📅 {activeBooking?.date || 'Mon, 12 June'} · {activeBooking?.timeSlot || '9:00 AM'}</Text>
        <Text style={styles.metaText}>📄 Booking ID {activeBooking?.id || '#SM-88213'}</Text>

        <View style={styles.actionTabs}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]}>
            <Text style={styles.tabTextActive}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Select New Date */}
      <Text style={styles.sectionSubtitle}>Select New Date</Text>
      <View style={styles.dateRow}>
        {dates.map((d) => (
          <TouchableOpacity
            key={d}
            style={[styles.datePill, selectedDate === d && styles.datePillActive]}
            onPress={() => setSelectedDate(d)}
          >
            <Text style={[styles.dateText, selectedDate === d && styles.dateTextActive]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Select New Time Slot */}
      <Text style={styles.sectionSubtitle}>Select New Time Slot</Text>
      <View style={styles.timeGrid}>
        {times.map((t) => {
          const isFull = t.includes('Full');
          const isSelected = selectedTime === t;
          return (
            <TouchableOpacity
              key={t}
              style={[
                styles.timeBtn,
                isSelected && styles.timeBtnActive,
                isFull && styles.timeBtnFull,
              ]}
              onPress={() => !isFull && setSelectedTime(t)}
              disabled={isFull}
            >
              <Text style={[styles.timeText, isSelected && styles.timeTextActive, isFull && styles.timeTextFull]}>
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Notice Banner */}
      <View style={styles.noticeBox}>
        <Text style={styles.noticeIcon}>ℹ️</Text>
        <Text style={styles.noticeText}>
          You can reschedule up to 2 times per booking. This is your 1st reschedule.
        </Text>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
        <Text style={styles.confirmBtnText}>Confirm Reschedule</Text>
      </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  mandiName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cropText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  actionTabs: {
    flexDirection: 'row',
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: Colors.inputBg,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  tabTextActive: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePill: {
    flex: 0.22,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  datePillActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  dateText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  dateTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeBtn: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  timeBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  timeBtnFull: {
    backgroundColor: Colors.inputBg,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  timeTextActive: {
    color: Colors.primary,
  },
  timeTextFull: {
    color: Colors.textMuted,
  },
  noticeBox: {
    flexDirection: 'row',
    backgroundColor: Colors.warningBg,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FBE8D3',
  },
  noticeIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: Colors.warning,
    fontWeight: '600',
    lineHeight: 16,
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
