import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, TrendUpIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const ComparePricesScreen = ({ onBack, onViewTrends }) => {
  const { mandis } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compare Prices</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filter & Sort Bar */}
      <View style={styles.filterRow}>
        <View style={styles.filterPill}>
          <Text style={styles.filterText}>Wheat ∨</Text>
        </View>
        <View style={styles.sortPill}>
          <Text style={styles.sortText}>Sort: Price (High to Low) ∨</Text>
        </View>
      </View>

      {/* Comparison Table Card */}
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={[styles.colHeader, { flex: 1.2 }]}>Mandi</Text>
          <Text style={[styles.colHeader, { flex: 1, textAlign: 'right' }]}>Price/Quintal</Text>
          <Text style={[styles.colHeader, { flex: 0.8, textAlign: 'right' }]}>Distance</Text>
          <Text style={[styles.colHeader, { flex: 0.8, textAlign: 'right' }]}>Wait</Text>
        </View>

        {mandis.map((m) => {
          const isBestMatch = m.name.includes('Azadpur');
          return (
            <View key={m.id} style={[styles.tableRow, isBestMatch && styles.bestMatchRow]}>
              <View style={{ flex: 1.2 }}>
                <Text style={styles.mandiName}>{m.name}</Text>
                {isBestMatch && (
                  <View style={styles.bestMatchBadge}>
                    <Text style={styles.bestMatchText}>Best Match</Text>
                  </View>
                )}
              </View>

              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.priceText}>₹{m.currentPricePerQuintal.toLocaleString()}</Text>
                <Text style={[styles.changeText, { color: m.priceChangePercent >= 0 ? Colors.primary : Colors.danger }]}>
                  {m.priceChangePercent >= 0 ? `↑ +${m.priceChangePercent}%` : `↓ ${m.priceChangePercent}%`}
                </Text>
              </View>

              <Text style={[styles.rowText, { flex: 0.8, textAlign: 'right' }]}>{m.distanceKm} km</Text>
              <Text style={[styles.rowText, { flex: 0.8, textAlign: 'right' }]}>~{m.travelTimeMins} min ›</Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.viewTrendsBtn} onPress={onViewTrends} activeOpacity={0.85}>
        <TrendUpIcon size={18} color={Colors.primary} />
        <Text style={styles.viewTrendsText}>View Price Trends Chart</Text>
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterPill: {
    backgroundColor: Colors.inputBg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sortPill: {
    backgroundColor: Colors.inputBg,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  sortText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBg,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  colHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  bestMatchRow: {
    backgroundColor: Colors.primaryLight,
  },
  mandiName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  bestMatchBadge: {
    backgroundColor: '#D1E7DD',
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginTop: 4,
  },
  bestMatchText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primary,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  rowText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  viewTrendsBtn: {
    backgroundColor: Colors.cardBgSecondary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTrendsText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginLeft: 8,
  },
});
