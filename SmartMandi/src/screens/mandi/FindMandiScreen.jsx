import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const FindMandiScreen = ({ onBack, onNavigate, initialCrop = 'Wheat' }) => {
  const { mandis } = useApp();
  const [viewMode, setViewMode] = useState('List');
  const [selectedCrop, setSelectedCrop] = useState(initialCrop);
  const [showCropDropdown, setShowCropDropdown] = useState(false);

  const availableCrops = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Mustard', 'Pulses', 'Tomato', 'Potato', 'Onion'];

  const handleToggleView = (mode) => {
    setViewMode(mode);
    if (mode === 'Map') {
      onNavigate('MandiMap');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find a Mandi</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* View Switcher Bar */}
      <View style={styles.viewToggleContainer}>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'List' && styles.toggleBtnActive]}
          onPress={() => handleToggleView('List')}
        >
          <Text style={[styles.toggleText, viewMode === 'List' && styles.toggleTextActive]}>List View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'Map' && styles.toggleBtnActive]}
          onPress={() => handleToggleView('Map')}
        >
          <Text style={[styles.toggleText, viewMode === 'Map' && styles.toggleTextActive]}>Map View</Text>
        </TouchableOpacity>
      </View>

      {/* Filters Row */}
      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[styles.filterPill, styles.filterPillActive]}
          onPress={() => setShowCropDropdown(!showCropDropdown)}
        >
          <Text style={styles.filterPillTextActive}>Crop: {selectedCrop} {showCropDropdown ? '▲' : '∨'}</Text>
        </TouchableOpacity>

        <View style={styles.filterPill}>
          <Text style={styles.filterPillText}>Distance: &lt;10km ∨</Text>
        </View>

        <TouchableOpacity style={styles.iconPill}>
          <Text style={styles.iconPillText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Crop Selection Dropdown Menu */}
      {showCropDropdown && (
        <View style={styles.cropDropdownMenu}>
          <ScrollView style={{ maxHeight: 180 }}>
            {availableCrops.map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.cropDropdownItem, selectedCrop === c && styles.cropDropdownItemActive]}
                onPress={() => {
                  setSelectedCrop(c);
                  setShowCropDropdown(false);
                }}
              >
                <Text style={[styles.cropDropdownText, selectedCrop === c && styles.cropDropdownTextActive]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Mandi Cards List */}
      {mandis.map((mandi) => {
        const cropPrice = mandi.cropPrices?.[selectedCrop] || mandi.currentPricePerQuintal;

        return (
          <TouchableOpacity
            key={mandi.id}
            style={styles.card}
            onPress={() => onNavigate('MandiDetail', { mandi, crop: selectedCrop })}
            activeOpacity={0.85}
          >
            <View style={styles.cardHeader}>
              <View style={styles.mandiNameRow}>
                <Text style={styles.mandiTitle}>{mandi.name}</Text>
                {mandi.verified && <CheckCircleIcon size={16} color={Colors.primary} />}
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>

            <Text style={styles.distanceText}>📍 {mandi.distanceKm} km</Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceText}>
                {selectedCrop} <Text style={styles.priceBold}>₹{cropPrice.toLocaleString()}/quintal</Text>
              </Text>
              <View style={styles.timeRow}>
                <ClockIcon size={14} color={Colors.textMuted} />
                <Text style={styles.timeText}>~{mandi.travelTimeMins} min</Text>
              </View>
            </View>

            <View style={styles.capacityTrack}>
              <View
                style={[
                  styles.capacityFill,
                  {
                    width: `${mandi.capacityPercent}%`,
                    backgroundColor: mandi.capacityLevel === 'Busy' ? Colors.warning : Colors.primary,
                  },
                ]}
              />
            </View>

            <Text
              style={[
                styles.capacityStatus,
                { color: mandi.capacityLevel === 'Busy' ? Colors.warning : Colors.textSecondary },
              ]}
            >
              {mandi.capacityLevel} capacity
            </Text>
          </TouchableOpacity>
        );
      })}
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
  viewToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  toggleBtnActive: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  filterPillTextActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  iconPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPillText: {
    fontSize: 14,
  },
  cropDropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 16,
    padding: 8,
    elevation: 3,
  },
  cropDropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cropDropdownItemActive: {
    backgroundColor: Colors.primaryLight,
  },
  cropDropdownText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  cropDropdownTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  mandiNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mandiTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginRight: 6,
  },
  chevron: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  distanceText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 14,
    color: Colors.primary,
  },
  priceBold: {
    fontWeight: '800',
    fontSize: 15,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  capacityTrack: {
    height: 6,
    backgroundColor: Colors.inputBg,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  capacityFill: {
    height: '100%',
    borderRadius: 3,
  },
  capacityStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
});
