import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Colors } from '../../theme/colors';
import { BellIcon, GlobeIcon, CalendarIcon, ClockIcon, TrendUpIcon, InfoCircleIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../../components/common/BottomNav';

export const HomeScreen = ({ onNavigate }) => {
  const { user, activeBooking, mandis, activeTab, setActiveTab, selectedCrop, setSelectedCrop } = useApp();
  const [selectedCropFilter, setSelectedCropFilter] = useState(selectedCrop || 'Wheat');
  const [showUssdModal, setShowUssdModal] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const cropFilters = ['All Crops', 'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Vegetables'];

  const notificationsList = [
    {
      id: 'ussd-1',
      title: 'USSD Offline Booking Started 📱',
      desc: 'Dial *199# from any mobile phone to book slots offline without internet!',
      time: 'Just now',
      isNew: true
    },
    {
      id: 'slot-1',
      title: 'Mandi Gate Token Active',
      desc: 'Your token #TK-8492 for Ghazipur Mandi is confirmed.',
      time: '2 hours ago',
      isNew: false
    }
  ];

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
      {/* USSD Popup Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showUssdModal}
        onRequestClose={() => setShowUssdModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.ussdHeaderBadge}>
              <Text style={styles.ussdHeaderBadgeText}>OFFLINE USSD SERVICE</Text>
            </View>
            <Text style={styles.modalTitle}>Offline USSD Booking is Live! 📱</Text>
            <Text style={styles.modalDesc}>
              No internet connection? Dial our free USSD code on any phone to book slots, check prices & queue position offline!
            </Text>

            <View style={styles.ussdCodeBox}>
              <Text style={styles.ussdCodeLabel}>DIAL USSD CODE</Text>
              <Text style={styles.ussdCodeText}>*199#</Text>
              <Text style={styles.ussdCodeSub}>Works on all 2G / feature phones (Nokia, Samsung, Jio Phone)</Text>
            </View>

            <View style={styles.ussdStepsRow}>
              <Text style={styles.ussdStepText}>1. Dial *199#</Text>
              <Text style={styles.ussdStepText}>2. Select Mandi & Crop</Text>
              <Text style={styles.ussdStepText}>3. Get SMS Token</Text>
            </View>

            <TouchableOpacity 
              style={styles.modalBtn} 
              onPress={() => setShowUssdModal(false)}
              activeOpacity={0.85}
            >
              <Text style={styles.modalBtnText}>Got It & Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Notifications Drawer Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNotifications}
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { maxHeight: '80%' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.textPrimary }}>Notifications</Text>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <Text style={{ fontSize: 14, color: Colors.primary, fontWeight: '700' }}>Close</Text>
              </TouchableOpacity>
            </View>

            {notificationsList.map(n => (
              <TouchableOpacity 
                key={n.id}
                onPress={() => {
                  if (n.id === 'ussd-1') {
                    setShowNotifications(false);
                    setShowUssdModal(true);
                  }
                }}
                style={styles.notifItem}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ fontWeight: '800', fontSize: 14, color: Colors.primary }}>{n.title}</Text>
                  {n.isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>}
                </View>
                <Text style={{ fontSize: 13, color: Colors.textSecondary, marginBottom: 4 }}>{n.desc}</Text>
                <Text style={{ fontSize: 11, color: Colors.textMuted }}>{n.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

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
            <TouchableOpacity 
              style={styles.iconCircle}
              onPress={() => setShowNotifications(true)}
            >
              <BellIcon size={20} color={Colors.textPrimary} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <GlobeIcon size={20} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* USSD Offline Booking Callout Card */}
        <TouchableOpacity 
          style={styles.ussdBannerCard}
          onPress={() => setShowUssdModal(true)}
          activeOpacity={0.9}
        >
          <View style={styles.ussdBannerBadge}>
            <Text style={styles.ussdBannerBadgeText}>OFFLINE ACCESS</Text>
          </View>
          <Text style={styles.ussdBannerTitle}>Book Mandi Slot via USSD *199#</Text>
          <Text style={styles.ussdBannerSubtitle}>No internet required! Tap to learn how to book using feature phones.</Text>
        </TouchableOpacity>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  ussdHeaderBadge: {
    backgroundColor: '#E6F7EF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  ussdHeaderBadgeText: {
    color: '#00B060',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  ussdCodeBox: {
    width: '100%',
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#A7F3D0',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  ussdCodeLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#047857',
    letterSpacing: 1,
    marginBottom: 4,
  },
  ussdCodeText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#065F46',
    letterSpacing: 2,
    marginBottom: 4,
  },
  ussdCodeSub: {
    fontSize: 11,
    color: '#047857',
    textAlign: 'center',
    fontWeight: '500',
  },
  ussdStepsRow: {
    width: '100%',
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  ussdStepText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  modalBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  ussdBannerCard: {
    backgroundColor: '#047857',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  ussdBannerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  ussdBannerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  ussdBannerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  ussdBannerSubtitle: {
    color: '#E6F7EF',
    fontSize: 12,
    lineHeight: 16,
  },
  bellDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  notifItem: {
    width: '100%',
    backgroundColor: Colors.inputBg,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  newBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});
