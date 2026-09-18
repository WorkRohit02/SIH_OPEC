import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { Colors } from '../../theme/colors';
import { BellIcon, GlobeIcon, CalendarIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../../components/common/BottomNav';

export const HomeScreen = ({ onNavigate }) => {
  const { 
    user, 
    activeBooking, 
    mandis, 
    activeTab, 
    setActiveTab, 
    selectedCrop, 
    setSelectedCrop, 
    hasSeenUssdModal, 
    setHasSeenUssdModal, 
    language, 
    setLanguage, 
    isTranslating,
    t 
  } = useApp();

  const [selectedCropFilter, setSelectedCropFilter] = useState(selectedCrop || 'Wheat');
  const [showUssdModal, setShowUssdModal] = useState(!hasSeenUssdModal);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleCloseUssdModal = () => {
    setShowUssdModal(false);
    setHasSeenUssdModal(true);
  };

  const cropFilters = [
    { key: 'All Crops', labelKey: 'allCrops' },
    { key: 'Wheat', labelKey: 'wheat' },
    { key: 'Rice', labelKey: 'rice' },
    { key: 'Cotton', labelKey: 'cotton' },
    { key: 'Sugarcane', labelKey: 'sugarcane' },
    { key: 'Maize', labelKey: 'maize' },
    { key: 'Vegetables', labelKey: 'vegetables' },
  ];

  const languagesList = [
    { code: 'hi', name: 'हिंदी (Hindi)', label: 'Hindi' },
    { code: 'en', name: 'English', label: 'English' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', label: 'Punjabi' },
    { code: 'mr', name: 'मराठी (Marathi)', label: 'Marathi' },
    { code: 'te', name: 'తెలుగు (Telugu)', label: 'Telugu' },
    { code: 'ta', name: 'தமிழ் (Tamil)', label: 'Tamil' },
  ];

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

  const handleSelectCrop = (cropKey) => {
    setSelectedCropFilter(cropKey);
    setSelectedCrop(cropKey === 'All Crops' ? 'Wheat' : cropKey);
  };

  const handleSelectLanguageFromDropdown = (langLabel) => {
    setLanguage(langLabel);
    setShowLangDropdown(false);
  };

  return (
    <View style={styles.outerContainer}>
      {/* USSD Popup Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showUssdModal}
        onRequestClose={handleCloseUssdModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.ussdHeaderBadge}>
              <Text style={styles.ussdHeaderBadgeText}>{t('offlineUssdService')}</Text>
            </View>
            <Text style={styles.modalTitle}>{t('ussdModalTitle')}</Text>
            <Text style={styles.modalDesc}>
              {t('ussdModalDesc')}
            </Text>

            <View style={styles.ussdCodeBox}>
              <Text style={styles.ussdCodeLabel}>{t('dialUssdCode')}</Text>
              <Text style={styles.ussdCodeText}>*199#</Text>
              <Text style={styles.ussdCodeSub}>{t('ussdWorksOn')}</Text>
            </View>

            <View style={styles.ussdStepsRow}>
              <Text style={styles.ussdStepText}>{t('ussdStep1')}</Text>
              <Text style={styles.ussdStepText}>{t('ussdStep2')}</Text>
              <Text style={styles.ussdStepText}>{t('ussdStep3')}</Text>
            </View>

            <TouchableOpacity 
              style={styles.modalBtn} 
              onPress={handleCloseUssdModal}
              activeOpacity={0.85}
            >
              <Text style={styles.modalBtnText}>{t('gotItContinue')}</Text>
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
              <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.textPrimary }}>{t('notifications')}</Text>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <Text style={{ fontSize: 14, color: Colors.primary, fontWeight: '700' }}>{t('close')}</Text>
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
                  {n.isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>{t('new')}</Text></View>}
                </View>
                <Text style={{ fontSize: 13, color: Colors.textSecondary, marginBottom: 4 }}>{n.desc}</Text>
                <Text style={{ fontSize: 11, color: Colors.textMuted }}>{n.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Language Selection Dropdown Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLangDropdown}
        onRequestClose={() => setShowLangDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.dropdownModalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowLangDropdown(false)}
        >
          <View style={styles.langDropdownCard}>
            <View style={styles.langDropdownHeader}>
              <Text style={styles.langDropdownTitle}>{t('selectLanguage')}</Text>
              <TouchableOpacity onPress={() => setShowLangDropdown(false)}>
                <Text style={{ fontSize: 14, color: Colors.textMuted, fontWeight: '700' }}>✕</Text>
              </TouchableOpacity>
            </View>

            {languagesList.map((langItem) => {
              const isSelected = language === langItem.label;
              return (
                <TouchableOpacity
                  key={langItem.code}
                  style={[styles.langOptionItem, isSelected && styles.langOptionItemActive]}
                  onPress={() => handleSelectLanguageFromDropdown(langItem.label)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.langOptionText, isSelected && styles.langOptionTextActive]}>
                    {langItem.name}
                  </Text>
                  {isSelected && <Text style={styles.checkmarkText}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        {/* Top User Header */}
        <View style={styles.topHeader}>
          <View style={styles.userSection}>
            <Image
              source={require('../../assets/images/opec_logo.png')}
              style={{ width: 44, height: 44, borderRadius: 22, marginRight: 10 }}
            />
            <View>
              {/* OPEC word is preserved untranslated */}
              <Text style={{ fontSize: 10, fontWeight: '800', color: Colors.primary, letterSpacing: 0.5 }}>OPEC</Text>
              <Text style={styles.greeting}>{t('welcome')}, {user.name || 'Ramesh Kumar'}</Text>
              <Text style={styles.location}>{user.village || 'Khera, Delhi'}</Text>
            </View>
          </View>

          <View style={styles.headerIcons}>
            {/* Bell Icon */}
            <TouchableOpacity 
              style={styles.iconCircle}
              onPress={() => setShowNotifications(true)}
            >
              <BellIcon size={20} color={Colors.textPrimary} />
              <View style={styles.bellDot} />
            </TouchableOpacity>

            {/* Language Selector Dropdown Trigger Button */}
            <TouchableOpacity 
              style={styles.langPillButton} 
              onPress={() => setShowLangDropdown(true)}
              activeOpacity={0.8}
            >
              <GlobeIcon size={18} color={Colors.primary} />
              <Text style={styles.langPillText}>{language}</Text>
              <Text style={styles.langPillArrow}>{isTranslating ? '⏳' : '▼'}</Text>
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
            <Text style={styles.ussdBannerBadgeText}>{t('offlineAccess')}</Text>
          </View>
          <Text style={styles.ussdBannerTitle}>{t('bookMandiViaUssd')}</Text>
          <Text style={styles.ussdBannerSubtitle}>{t('noInternetRequired')}</Text>
        </TouchableOpacity>

        {/* Dynamic Crop Filter Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {cropFilters.map((cropObj) => {
            const isSelected = selectedCropFilter === cropObj.key;
            return (
              <TouchableOpacity
                key={cropObj.key}
                style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                onPress={() => handleSelectCrop(cropObj.key)}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                  {t(cropObj.labelKey)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Featured Upcoming Slot Card */}
        {activeBooking && (
          <View style={styles.upcomingCard}>
            <Text style={styles.upcomingBadgeText}>{t('upcomingSlot')}</Text>
            <Text style={styles.upcomingTitle}>
              {(activeBooking.mandiName?.includes('Azadpur') ? t('azadpurMandi') : activeBooking.mandiName?.includes('Ghazipur') ? t('ghazipurMandi') : activeBooking.mandiName)} — {selectedCropFilter !== 'All Crops' ? (t(selectedCropFilter.toLowerCase()) || selectedCropFilter) : (t(activeBooking.crop.toLowerCase()) || activeBooking.crop)}
            </Text>

            <View style={styles.upcomingMetaRow}>
              <View style={styles.metaItem}>
                <CalendarIcon size={16} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{activeBooking.date ? activeBooking.date.replace('Tomorrow', t('tomorrow')).replace('Today', t('today')) : ''} · {activeBooking.timeSlot}</Text>
              </View>
            </View>

            <View style={styles.upcomingFooter}>
              <View style={styles.tokenTag}>
                <Text style={styles.tokenTagText}>{t('token')} {activeBooking.tokenNumber}</Text>
              </View>

              <TouchableOpacity
                style={styles.gatePassBtn}
                onPress={() => onNavigate('GatePass')}
                activeOpacity={0.85}
              >
                <Text style={styles.gatePassBtnText}>{t('viewGatePass')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Recommended Mandis Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>{t('recommendedMandis')}</Text>
          <TouchableOpacity onPress={() => onNavigate('FindMandi', { crop: selectedCropFilter })}>
            <Text style={styles.seeAllText}>{t('seeAll')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mandiScroll}>
          {mandis.map((mandi) => {
            const cropKey = selectedCropFilter === 'All Crops' ? 'Wheat' : selectedCropFilter;
            const dynamicPrice = mandi.cropPrices?.[cropKey] || mandi.currentPricePerQuintal;

            const translatedMandiName = 
              mandi.name?.includes('Azadpur') ? t('azadpurMandi') :
              mandi.name?.includes('Ghazipur') ? t('ghazipurMandi') :
              mandi.name?.includes('Najafgarh') ? t('najafgarhMandi') :
              mandi.name?.includes('Narela') ? t('narelaMandi') : mandi.name;

            return (
              <TouchableOpacity
                key={mandi.id}
                style={styles.mandiCard}
                onPress={() => onNavigate('MandiDetail', { mandi, crop: cropKey })}
                activeOpacity={0.85}
              >
                <View style={styles.mandiCardTop}>
                  <Text style={styles.mandiName}>{translatedMandiName}</Text>
                  <Text style={styles.mandiDistance}>{mandi.distanceKm} km</Text>
                </View>

                <Text style={styles.mandiPrice}>
                  {t(cropKey.toLowerCase()) || cropKey}{' '}
                  <Text style={styles.mandiPriceBold}>₹{dynamicPrice.toLocaleString()}{t('perQuintal')}</Text>
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
                    <Text style={styles.capacityLabel}>{t('capacity')}</Text>
                    <Text
                      style={[
                        styles.capacityValue,
                        { color: mandi.capacityLevel === 'Busy' ? Colors.warning : Colors.primary },
                      ]}
                    >
                      {mandi.capacityLevel === 'Busy' ? t('busy') : t('available')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'Home') onNavigate('Home');
          else if (tab === 'Queue') onNavigate('LiveQueue');
          else if (tab === 'Payments') onNavigate('Payments');
          else if (tab === 'More') onNavigate('MoreServices');
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
    flex: 1,
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
    alignItems: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  langPillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7EF',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  langPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginLeft: 5,
    marginRight: 4,
  },
  langPillArrow: {
    fontSize: 10,
    color: Colors.primary,
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
    backgroundColor: Colors.primary,
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

  /* Language Dropdown Modal Overlay & Styles */
  dropdownModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  langDropdownCard: {
    width: 240,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  langDropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  langDropdownTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  langOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  langOptionItemActive: {
    backgroundColor: '#E6F7EF',
  },
  langOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  langOptionTextActive: {
    fontWeight: '800',
    color: Colors.primary,
  },
  checkmarkText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
});
