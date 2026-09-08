import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const BookSlotScreen = ({ mandiName: initialMandiName = 'Azadpur Mandi', onBack, onConfirm }) => {
  const { mandis, setActiveBooking } = useApp();

  const [selectedMandi, setSelectedMandi] = useState(
    mandis.find((m) => m.name === initialMandiName) || mandis[0]
  );
  const [showMandiDropdown, setShowMandiDropdown] = useState(false);

  // Multi-crop selection or specific crops
  const availableCrops = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Vegetables'];
  const [selectedCrops, setSelectedCrops] = useState(['Wheat']);

  // DYNAMIC FUTURE DATES (STRICTLY AFTER TODAY'S DATE)
  const getFutureDates = () => {
    const datesList = [];
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 1; i <= 4; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);

      const dayName = days[futureDate.getDay()];
      const dayNum = futureDate.getDate();
      const monthName = months[futureDate.getMonth()];

      const label = i === 1 ? `Tomorrow (${dayName} ${dayNum})` : `${dayName} ${dayNum} ${monthName}`;
      const val = `${dayName}, ${dayNum} ${monthName}`;

      datesList.push({ label, val, dayNum, dayName });
    }
    return datesList;
  };

  const futureDates = getFutureDates();
  const [selectedDate, setSelectedDate] = useState(futureDates[0].val);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('9:00 AM');
  const [quantity, setQuantity] = useState(25);
  const [vehicleNumber, setVehicleNumber] = useState('DL-01-AB-1234');

  const timeSlots = [
    { time: '9:00 AM', status: 'available' },
    { time: '10:00 AM', status: 'available' },
    { time: '11:00 AM', status: 'available' },
    { time: '12:00 PM', status: 'available' },
    { time: '1:00 PM', status: 'available' },
    { time: '2:00 PM', status: 'full' },
  ];

  const toggleCropSelection = (crop) => {
    if (selectedCrops.includes(crop)) {
      if (selectedCrops.length > 1) {
        setSelectedCrops(selectedCrops.filter((c) => c !== crop));
      }
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleBooking = () => {
    const newBooking = {
      id: '#SM-' + Math.floor(10000 + Math.random() * 90000),
      mandiId: selectedMandi.id,
      mandiName: selectedMandi.name,
      crop: selectedCrops.join(', '),
      quantityQuintals: quantity,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      tokenNumber: '#042',
      vehicleNumber: vehicleNumber || 'DL-01-AB-1234',
      status: 'Confirmed',
      queuePosition: 6,
      totalInQueue: 40,
      estimatedWaitMins: 35,
    };
    setActiveBooking(newBooking);
    onConfirm(newBooking);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book a Slot</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Choose Specific Mandi Dropdown */}
      <Text style={styles.sectionSubtitle}>SELECT MANDI</Text>
      <TouchableOpacity
        style={styles.mandiDropdownSelector}
        onPress={() => setShowMandiDropdown(!showMandiDropdown)}
        activeOpacity={0.85}
      >
        <View>
          <Text style={styles.mandiDropdownTitle}>{selectedMandi.name}</Text>
          <Text style={styles.mandiDropdownSub}>{selectedMandi.address} ({selectedMandi.distanceKm} km)</Text>
        </View>
        <Text style={styles.dropdownArrow}>{showMandiDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showMandiDropdown && (
        <View style={styles.dropdownMenu}>
          {mandis.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.dropdownItem, selectedMandi.id === m.id && styles.dropdownItemActive]}
              onPress={() => {
                setSelectedMandi(m);
                setShowMandiDropdown(false);
              }}
            >
              <Text style={[styles.dropdownItemText, selectedMandi.id === m.id && styles.dropdownItemTextActive]}>
                {m.name} — {m.distanceKm} km (₹{m.currentPricePerQuintal}/qtl)
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Select Multiple Crops */}
      <Text style={styles.sectionSubtitle}>SELECT CROPS (CHOOSE ALL THAT APPLY)</Text>
      <View style={styles.cropRow}>
        {availableCrops.map((c) => {
          const isSelected = selectedCrops.includes(c);
          return (
            <TouchableOpacity
              key={c}
              style={[styles.cropPill, isSelected && styles.cropPillActive]}
              onPress={() => toggleCropSelection(c)}
            >
              <Text style={[styles.cropText, isSelected && styles.cropTextActive]}>
                {c} {isSelected ? ' ✓' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Dynamic Future Dates (AFTER TODAY'S DATE) */}
      <Text style={styles.sectionSubtitle}>SELECT BOOKING DATE (FUTURE DATES)</Text>
      <View style={styles.dateRow}>
        {futureDates.map((d) => {
          const isSelected = selectedDate === d.val;
          return (
            <TouchableOpacity
              key={d.val}
              style={[styles.datePill, isSelected && styles.datePillActive]}
              onPress={() => setSelectedDate(d.val)}
            >
              <Text style={[styles.dateTextLabel, isSelected && styles.dateTextActive]}>{d.dayName}</Text>
              <Text style={[styles.dateTextNum, isSelected && styles.dateTextActive]}>{d.dayNum}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Select Time Slot */}
      <Text style={styles.sectionSubtitle}>SELECT TIME SLOT</Text>
      <View style={styles.slotGrid}>
        {timeSlots.map((slot) => {
          const isSelected = selectedTimeSlot === slot.time;
          const isFull = slot.status === 'full';
          return (
            <TouchableOpacity
              key={slot.time}
              style={[
                styles.slotBtn,
                isSelected && styles.slotBtnActive,
                isFull && styles.slotBtnFull,
              ]}
              onPress={() => !isFull && setSelectedTimeSlot(slot.time)}
              disabled={isFull}
            >
              <Text style={[styles.slotText, isSelected && styles.slotTextActive, isFull && styles.slotTextFull]}>
                {slot.time} {isFull ? ' Full' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Quantity Counter */}
      <Text style={styles.sectionSubtitle}>QUANTITY FOR THIS TRIP</Text>
      <View style={styles.qtyContainer}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtyVal}>{quantity}</Text>

        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>

        <Text style={styles.qtyUnit}>quintals</Text>
      </View>

      {/* Vehicle Number (optional) */}
      <Text style={styles.sectionSubtitle}>VEHICLE NUMBER (OPTIONAL)</Text>
      <TextInput
        style={styles.vehicleInput}
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
        placeholder="e.g. DL-01-AB-1234"
        placeholderTextColor={Colors.textMuted}
      />

      {/* Summary Box */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryMandi}>{selectedMandi.name} · {selectedCrops.join(', ')}</Text>
        <Text style={styles.summaryQty}>Date: {selectedDate} | Quantity: {quantity} quintals</Text>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleBooking} activeOpacity={0.85}>
        <Text style={styles.confirmBtnText}>Confirm Booking</Text>
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
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 14,
  },
  mandiDropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    marginBottom: 10,
  },
  mandiDropdownTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  mandiDropdownSub: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  dropdownArrow: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '800',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 14,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  dropdownItemActive: {
    backgroundColor: Colors.primaryLight,
  },
  dropdownItemText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  dropdownItemTextActive: {
    fontWeight: '800',
    color: Colors.primary,
  },
  cropRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  cropPill: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cropPillActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  cropText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  cropTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  datePill: {
    flex: 0.23,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  datePillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dateTextLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  dateTextNum: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  dateTextActive: {
    color: '#FFFFFF',
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  slotBtn: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  slotBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  slotBtnFull: {
    backgroundColor: Colors.inputBg,
  },
  slotText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  slotTextActive: {
    color: Colors.primary,
  },
  slotTextFull: {
    color: Colors.textMuted,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 10,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: Colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  qtyVal: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  qtyUnit: {
    fontSize: 14,
    color: Colors.textMuted,
    marginRight: 16,
  },
  vehicleInput: {
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  summaryMandi: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  summaryQty: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
