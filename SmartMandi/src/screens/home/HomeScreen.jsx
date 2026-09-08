import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { BellIcon, GlobeIcon, CalendarIcon, ClockIcon, TrendUpIcon, InfoCircleIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../../components/common/BottomNav';

export const HomeScreen = ({ onNavigate }) => {
  const { user, activeBooking, mandis, activeTab, setActiveTab, selectedCrop, setSelectedCrop } = useApp();
  const [selectedCropFilter, setSelectedCropFilter] = useState(selectedCrop || 'Wheat');

  const cropFilters = ['All Crops', 'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Vegetables'];

  const handleSelectCrop = (crop) => {
    setSelectedCropFilter(crop);
    setSelectedCrop(crop === 'All Crops' ? 'Wheat' : crop);
  };

  const handleQuickAction = (action) => {
    if (action === 'Book a Slot') onNavigate('BookSlot', { mandi: mandis[0], initialCrop: selectedCropFilter });
    else if (action === 'Check Prices') onNavigate('PriceTrends', { crop: selectedCropFilter });
    else if (action === 'Track Queue') onNavigate('LiveQueue');
    else if (action === 'Raise Issue') onNavigate('Grievance');
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        {/* Top User Header */}
        <View style={styles.topHeader}>
          <View style={styles.userSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name ? user.name.split(' ').map((n) => n[0]).join('') : 'RK'}
              </Text>
            </View>
            <View>
              <Text style={styles.greeting}>Namaste, {user.name || 'Ramesh Kumar'}</Text>
              <Text style={styles.location}>{user.village || 'Khera, Delhi'}</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle}>
              <BellIcon size={20} color={Colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <GlobeIcon size={20} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Crop Filter Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {cropFilters.map((crop) => {
            const isSelected = selectedCropFilter === crop;
            return (
              <TouchableOpacity
                key={crop}
                style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                onPress={() => handleSelectCrop(crop)}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                  {crop}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Featured Upcoming Slot Card (Dynamically reflecting active slot / selected crop) */}
        {activeBooking && (
          <View style={styles.upcomingCard}>
            <Text style={styles.upcomingBadgeText}>Upcoming Slot</Text>
            <Text style={styles.upcomingTitle}>
              {activeBooking.mandiName} — {selectedCropFilter !== 'All Crops' ? selectedCropFilter : activeBooking.crop}
            </Text>

            <View style={styles.upcomingMetaRow}>
              <View style={styles.metaItem}>
                <CalendarIcon size={16} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{activeBooking.date} · {activeBooking.timeSlot}</Text>
              </View>
            </View>

            <View style={styles.upcomingFooter}>
              <View style={styles.tokenTag}>
                <Text style={styles.tokenTagText}>Token {activeBooking.tokenNumber}</Text>
              </View>

              <TouchableOpacity
                style={styles.gatePassBtn}
                onPress={() => onNavigate('GatePass')}
                activeOpacity={0.85}
              >
                <Text style={styles.gatePassBtnText}>View Gate Pass</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Recommended Mandis Section with DYNAMIC Crop Pricing */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recommended Mandis for You</Text>
          <TouchableOpacity onPress={() => onNavigate('FindMandi', { crop: selectedCropFilter })}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mandiScroll}>
          {mandis.map((mandi) => {
            const cropKey = selectedCropFilter === 'All Crops' ? 'Wheat' : selectedCropFilter;
            const dynamicPrice = mandi.cropPrices?.[cropKey] || mandi.currentPricePerQuintal;

            return (
              <TouchableOpacity
                key={mandi.id}
                style={styles.mandiCard}
                onPress={() => onNavigate('MandiDetail', { mandi, crop: cropKey })}
                activeOpacity={0.85}
              >
                <View style={styles.mandiCardTop}>
                  <Text style={styles.mandiName}>{mandi.name}</Text>
                  <Text style={styles.mandiDistance}>{mandi.distanceKm} km</Text>
                </View>

                <Text style={styles.mandiPrice}>
                  {cropKey}{' '}
                  <Text style={styles.mandiPriceBold}>₹{dynamicPrice.toLocaleString()}/quintal</Text>
                </Text>

                <View style={styles.capacitySection}>
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
                  <View style={styles.capacityMeta}>
                    <Text style={styles.capacityLabel}>Capacity</Text>
                    <Text
                      style={[
                        styles.capacityValue,
                        { color: mandi.capacityLevel === 'Busy' ? Colors.warning : Colors.primary },
                      ]}
                    >
                      {mandi.capacityLevel}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Quick Actions Grid */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          <TouchableOpacity style={styles.quickCard} onPress={() => handleQuickAction('Book a Slot')}>
            <View style={styles.quickIconBg}>
              <CalendarIcon size={24} color={Colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Book a Slot</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={() => handleQuickAction('Check Prices')}>
            <View style={styles.quickIconBg}>
              <TrendUpIcon size={24} color={Colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Check Prices</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={() => handleQuickAction('Track Queue')}>
            <View style={styles.quickIconBg}>
              <ClockIcon size={24} color={Colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Track Queue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={() => handleQuickAction('Raise Issue')}>
            <View style={styles.quickIconBg}>
              <InfoCircleIcon size={24} color={Colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Raise Issue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'Queue') onNavigate('LiveQueue');
          else if (tab === 'Payments') onNavigate('Payments');
          else if (tab === 'Grievance') onNavigate('Grievance');
          else if (tab === 'Profile') onNavigate('Profile');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 24,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  location: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filterScroll: {
    marginBottom: 20,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.inputBg,
  },
  filterChipSelected: {
    backgroundColor: Colors.textPrimary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  upcomingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  upcomingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 6,
  },
  upcomingTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  upcomingMetaRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 6,
    fontWeight: '600',
  },
  upcomingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenTag: {
    backgroundColor: Colors.inputBg,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tokenTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  gatePassBtn: {
    backgroundColor: Colors.inputBg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  gatePassBtnText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  mandiScroll: {
    marginBottom: 24,
  },
  mandiCard: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginRight: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    elevation: 2,
  },
  mandiCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mandiName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  mandiDistance: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  mandiPrice: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  mandiPriceBold: {
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  capacitySection: {
    width: '100%',
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
  capacityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  capacityLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  capacityValue: {
    fontSize: 10,
    fontWeight: '800',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 10,
  },
  quickCard: {
    width: '48%',
    backgroundColor: Colors.cardBgSecondary,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  quickIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
