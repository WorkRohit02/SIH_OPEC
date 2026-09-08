import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/common/SvgIcons';

export const PriceTrendsScreen = ({ onBack, onViewComparison, initialCrop = 'Wheat' }) => {
  const [activeRange, setActiveRange] = useState('30D');
  const [selectedCrop, setSelectedCrop] = useState(initialCrop);
  const [showCropDropdown, setShowCropDropdown] = useState(false);

  const availableCrops = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Mustard', 'Pulses', 'Tomato', 'Potato', 'Onion'];
  const ranges = ['7D', '30D', '3M', '1Y'];

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Price Trends</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Crop / Mandi Filter row with Functional Dropdown */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.filterPill}
          onPress={() => setShowCropDropdown(!showCropDropdown)}
        >
          <Text style={styles.filterText}>CROP: {selectedCrop} {showCropDropdown ? '▲' : '∨'}</Text>
        </TouchableOpacity>

        <View style={styles.filterPillSecondary}>
          <Text style={styles.filterTextSec}>All Nearby Mandi ∨</Text>
        </View>
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

      {/* 30-Day Trend Multi-Line Chart Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>30-Day Price Trend ({selectedCrop}) —</Text>
        <Text style={styles.cardSubtitle}>Price per quintal</Text>

        <View style={styles.chartContainer}>
          <View style={styles.yAxis}>
            <Text style={styles.yAxisText}>₹2,250</Text>
            <Text style={styles.yAxisText}>₹2,150</Text>
            <Text style={styles.yAxisText}>₹2,050</Text>
            <Text style={styles.yAxisText}>₹1,900</Text>
          </View>

          <View style={styles.chartCanvas}>
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />

            {/* Azadpur Green Line */}
            <View style={[styles.trendLine, { top: 35, borderTopColor: Colors.primary }]} />
            {/* Ghazipur Dark Green Line */}
            <View style={[styles.trendLine, { top: 25, borderTopColor: Colors.primaryDark }]} />
            {/* Narela Gray Line */}
            <View style={[styles.trendLine, { top: 55, borderTopColor: Colors.textMuted }]} />
          </View>
        </View>

        <View style={styles.xAxis}>
          <Text style={styles.xAxisText}>12 Jun</Text>
          <Text style={styles.xAxisText}>19 Jun</Text>
          <Text style={styles.xAxisText}>26 Jun</Text>
          <Text style={styles.xAxisText}>11 Jul</Text>
        </View>

        {/* Legend Row */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <Text style={styles.legendDotGreen}>● </Text>
            <Text style={styles.legendText}>Azadpur Mandi</Text>
          </View>
          <View style={styles.legendItem}>
            <Text style={styles.legendDotDark}>● </Text>
            <Text style={styles.legendText}>Ghazipur Mandi</Text>
          </View>
          <View style={styles.legendItem}>
            <Text style={styles.legendDotGray}>● </Text>
            <Text style={styles.legendText}>Narela Mandi</Text>
          </View>
        </View>

        {/* Price Badges */}
        <View style={styles.priceBadgesRow}>
          <View style={styles.priceBadgeItem}>
            <Text style={styles.badgeLabel}>Azadpur</Text>
            <Text style={styles.badgeVal}>₹2,150</Text>
          </View>
          <View style={styles.priceBadgeItem}>
            <Text style={styles.badgeLabel}>Ghazipur</Text>
            <Text style={styles.badgeVal}>₹2,180</Text>
          </View>
          <View style={styles.priceBadgeItem}>
            <Text style={styles.badgeLabel}>Narela</Text>
            <Text style={styles.badgeVal}>₹2,095</Text>
          </View>
        </View>
      </View>

      {/* Best time to sell callout card */}
      <View style={styles.tipCard}>
        <Text style={styles.tipIcon}>💡</Text>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Best time to sell ({selectedCrop})</Text>
          <Text style={styles.tipBody}>
            {selectedCrop} prices are trending upward at Ghazipur Mandi. Consider waiting 2-3 days for a potentially better rate.
          </Text>
        </View>
      </View>

      {/* Range Pills */}
      <View style={styles.rangeRow}>
        {ranges.map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.rangePill, activeRange === r && styles.rangePillActive]}
            onPress={() => setActiveRange(r)}
          >
            <Text style={[styles.rangeText, activeRange === r && styles.rangeTextActive]}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.compLinkBtn} onPress={onViewComparison}>
        <Text style={styles.compLinkText}>View full comparison table</Text>
        <ArrowRightIcon size={16} color={Colors.primary} />
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
  filterRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterPill: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  filterPillSecondary: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  filterTextSec: {
    fontSize: 13,
    color: Colors.textSecondary,
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
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 140,
    marginBottom: 8,
  },
  yAxis: {
    justifyContent: 'space-between',
    marginRight: 10,
    paddingVertical: 4,
  },
  yAxisText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  chartCanvas: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
  gridLine: {
    height: 1,
    backgroundColor: Colors.borderLight,
    width: '100%',
  },
  trendLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 2.5,
    transform: [{ rotate: '-8deg' }],
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 45,
    marginBottom: 16,
  },
  xAxisText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDotGreen: {
    color: Colors.primary,
    fontSize: 14,
  },
  legendDotDark: {
    color: Colors.primaryDark,
    fontSize: 14,
  },
  legendDotGray: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  legendText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  priceBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceBadgeItem: {
    flex: 0.3,
    backgroundColor: Colors.inputBg,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
  },
  badgeLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  badgeVal: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  tipBody: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rangePill: {
    flex: 0.22,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  rangePillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rangeText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  rangeTextActive: {
    color: '#FFFFFF',
  },
  compLinkBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginRight: 6,
  },
});
