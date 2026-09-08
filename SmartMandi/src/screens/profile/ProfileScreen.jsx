import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../../components/common/BottomNav';

export const ProfileScreen = ({ onNavigate, onLogout }) => {
  const { user, activeTab, setActiveTab } = useApp();

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.screenTitle}>Profile</Text>
          <TouchableOpacity style={styles.editCircle}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name ? user.name.split(' ').map((n) => n[0]).join('') : 'RK'}
            </Text>
          </View>

          <Text style={styles.userName}>{user.name || 'Ramesh Kumar'}</Text>
          <Text style={styles.userPhone}>{user.phone || '+91 98765 43210'}</Text>

          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedBadgeText}>✓ Verified Farmer</Text>
          </View>
        </View>

        {/* Stats Row (3 Cards) */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{user.crops?.length || 3}</Text>
            <Text style={styles.statLabel}>Registered Crops</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{user.totalSalesCount || 18}</Text>
            <Text style={styles.statLabel}>Total Sales</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{user.memberSinceYear || 2023}</Text>
            <Text style={styles.statLabel}>Member Since</Text>
          </View>
        </View>

        {/* Farm Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardSectionTitle}>Farm Details</Text>
            <TouchableOpacity>
              <Text style={styles.editLinkText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Village / District</Text>
            <Text style={styles.infoVal}>{user.village || 'Khera, Delhi'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Land Size</Text>
            <Text style={styles.infoVal}>{user.landSize || 6.5} {user.landUnit || 'acres'}</Text>
          </View>

          <Text style={[styles.infoLabel, { marginTop: 8, marginBottom: 8 }]}>Registered Crops</Text>
          <View style={styles.cropsPillsRow}>
            {user.crops?.length > 0 ? (
              user.crops.map((c) => (
                <View key={c.cropName} style={styles.cropPill}>
                  <Text style={styles.cropIcon}>🌾</Text>
                  <Text style={styles.cropPillText}>{c.cropName}</Text>
                </View>
              ))
            ) : (
              <View style={styles.cropPill}>
                <Text style={styles.cropIcon}>🌾</Text>
                <Text style={styles.cropPillText}>Wheat</Text>
              </View>
            )}
          </View>
        </View>

        {/* Documents Card */}
        <Text style={styles.sectionHeaderTitle}>Documents</Text>
        <View style={styles.card}>
          <View style={styles.docRow}>
            <Text style={styles.docIcon}>📄</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.docName}>{user.documentName || 'Land Ownership Record'}</Text>
            </View>
            <View style={styles.docVerifiedBadge}>
              <Text style={styles.docVerifiedText}>Verified</Text>
            </View>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Text style={styles.viewDocText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Links */}
        <Text style={styles.sectionHeaderTitle}>Account</Text>
        <View style={styles.cardNoPadding}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🌐</Text>
            <Text style={styles.menuLabel}>Language</Text>
            <Text style={styles.menuVal}>— Hindi ›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuLabel}>Notification Preferences</Text>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => onNavigate('Settings')}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuLabel}>Settings</Text>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => onNavigate('Grievance')}>
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuLabel}>Help & Grievances</Text>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <Text style={styles.menuIcon}>📄</Text>
            <Text style={styles.menuLabel}>Terms & Privacy</Text>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.85}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'Home') onNavigate('Home');
          else if (tab === 'Queue') onNavigate('LiveQueue');
          else if (tab === 'Payments') onNavigate('Payments');
          else if (tab === 'Grievance') onNavigate('Grievance');
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
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  editCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 14,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 10,
  },
  verifiedBadge: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  verifiedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 0.31,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statNum: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  editLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  infoVal: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  cropsPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 6,
  },
  cropIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  cropPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  docName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  docVerifiedBadge: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  docVerifiedText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
  viewDocText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  cardNoPadding: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  menuVal: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  menuChevron: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  logoutBtn: {
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
});
