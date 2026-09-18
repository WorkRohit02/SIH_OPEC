import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../../components/common/BottomNav';

export const MoreServicesScreen = ({ onNavigate }) => {
  const { setActiveTab, t } = useApp();

  const sections = [
    {
      title: t('mandiCategory'),
      items: [
        { label: t('bookSlot'), icon: '📅', screen: 'BookSlot' },
        { label: t('findMandi'), icon: '📍', screen: 'FindMandi' },
        { label: t('procurementCalendar'), icon: '🗓️', screen: 'PriceTrends' },
        { label: t('mandiInfo'), icon: '🌾', screen: 'FindMandi' },
        { label: t('mspPrices'), icon: '📈', screen: 'PriceTrends' },
      ],
    },
    {
      title: t('activityCategory'),
      items: [
        { label: t('trackQueue'), icon: '🕒', screen: 'LiveQueue' },
        { label: t('cropStatus'), icon: '🌾', screen: 'CropStatus' },
        { label: t('liveAuctions'), icon: '⚖️', screen: 'Auction' },
        { label: t('previousBookings'), icon: '📑', screen: 'LiveQueue' },
        { label: t('myGatePass'), icon: '🎫', screen: 'GatePass' },
        { label: t('paymentHistory'), icon: '💵', screen: 'Payments' },
      ],
    },
    {
      title: t('helpCategory'),
      items: [
        { label: t('voiceAssistant'), icon: '🎙️', action: () => onNavigate('Home') },
        { label: t('help'), icon: '❓', screen: 'Grievance' },
        { label: t('contactSupport'), icon: '📞', screen: 'Grievance' },
        { label: t('reportProblem'), icon: '⚠️', screen: 'Grievance' },
      ],
    },
    {
      title: t('settingsCategory'),
      items: [
        { label: t('language'), icon: '🌐', screen: 'LanguageSelect' },
        { label: t('notifications'), icon: '🔔', screen: 'Settings' },
        { label: t('profile'), icon: '👤', screen: 'Profile' },
        { label: t('settings'), icon: '⚙️', screen: 'Settings' },
      ],
    },
  ];

  const handleItemPress = (item) => {
    if (item.action) {
      item.action();
    } else if (item.screen) {
      onNavigate(item.screen);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Text style={styles.headerTitle}>{t('moreServices')}</Text>

        {sections.map((section) => (
          <View key={section.title} style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            <View style={styles.cardGroup}>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.rowItem,
                    idx === section.items.length - 1 && { borderBottomWidth: 0 },
                  ]}
                  onPress={() => handleItemPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.rowLeft}>
                    <Text style={styles.rowIcon}>{item.icon}</Text>
                    <Text style={styles.rowLabel}>{item.label}</Text>
                  </View>
                  <Text style={styles.rowChevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Offline USSD Card */}
        <View style={styles.ussdCard}>
          <Text style={styles.ussdTitle}>{t('offlineAccess')}</Text>
          <Text style={styles.ussdDesc}>{t('ussdSub')}</Text>
          <TouchableOpacity onPress={() => onNavigate('Home')}>
            <Text style={styles.ussdLink}>{t('howItWorks')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Voice Mic Button */}
      <TouchableOpacity
        style={styles.floatingMicBtn}
        onPress={() => onNavigate('Home')}
        activeOpacity={0.85}
      >
        <Text style={{ fontSize: 24, color: '#FFFFFF' }}>🎙️</Text>
      </TouchableOpacity>

      <BottomNav
        currentTab="More"
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
    backgroundColor: '#F8F6F0',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1A2E20',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8A968D',
    marginBottom: 8,
    letterSpacing: 1,
  },
  cardGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    fontSize: 16,
    marginRight: 14,
    width: 22,
    textAlign: 'center',
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2E20',
  },
  rowChevron: {
    fontSize: 18,
    color: '#B0B8B2',
    fontWeight: '600',
  },
  ussdCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  ussdTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A2E20',
    marginBottom: 4,
  },
  ussdDesc: {
    fontSize: 13,
    color: '#5A665E',
    marginBottom: 10,
  },
  ussdLink: {
    fontSize: 14,
    fontWeight: '800',
    color: '#176B3A',
  },
  floatingMicBtn: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#176B3A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
});
