import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const SettingsScreen = ({ onBack, onNavigate }) => {
  const { settings, updateSettings, language, t } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settings')}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Language Section */}
      <Text style={styles.sectionHeader}>{t('language')}</Text>
      <View style={styles.cardGroup}>
        <TouchableOpacity style={styles.rowItem} onPress={() => onNavigate && onNavigate('LanguageSelect')}>
          <Text style={styles.rowLabel}>App Language</Text>
          <Text style={styles.rowVal}>{language} ›</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications Section */}
      <Text style={styles.sectionHeader}>Notifications</Text>
      <View style={styles.cardGroup}>
        <View style={styles.rowItem}>
          <Text style={styles.rowLabel}>Price Alerts</Text>
          <Switch
            value={settings.priceAlerts}
            onValueChange={(val) => updateSettings({ priceAlerts: val })}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.rowLabel}>Slot Reminders</Text>
          <Switch
            value={settings.slotReminders}
            onValueChange={(val) => updateSettings({ slotReminders: val })}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.rowLabel}>Payment Updates</Text>
          <Switch
            value={settings.paymentUpdates}
            onValueChange={(val) => updateSettings({ paymentUpdates: val })}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.rowLabel}>Grievance Updates</Text>
          <Switch
            value={settings.grievanceUpdates}
            onValueChange={(val) => updateSettings({ grievanceUpdates: val })}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[styles.rowItem, { borderBottomWidth: 0 }]}>
          <Text style={styles.rowLabel}>Promotional Messages</Text>
          <Switch
            value={settings.promotionalMessages}
            onValueChange={(val) => updateSettings({ promotionalMessages: val })}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* Preferences Section */}
      <Text style={styles.sectionHeader}>Preferences</Text>
      <View style={styles.cardGroup}>
        <TouchableOpacity style={styles.rowItem}>
          <Text style={styles.rowLabel}>Distance Unit</Text>
          <Text style={styles.rowVal}>Kilometers ›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.rowItem, { borderBottomWidth: 0 }]}>
          <Text style={styles.rowLabel}>Default Crop View</Text>
          <Text style={styles.rowVal}>Wheat ›</Text>
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionHeader}>Account</Text>
      <View style={styles.cardGroup}>
        <TouchableOpacity style={styles.rowItem}>
          <Text style={styles.rowLabel}>Change Mobile Number</Text>
          <Text style={styles.rowChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.rowItem, { borderBottomWidth: 0 }]}>
          <Text style={[styles.rowLabel, { color: Colors.danger }]}>Delete Account</Text>
          <Text style={styles.rowChevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <Text style={styles.sectionHeader}>About</Text>
      <View style={styles.cardGroup}>
        <View style={styles.rowItem}>
          <Text style={styles.rowLabel}>App Version 2.4.1</Text>
        </View>

        <TouchableOpacity style={styles.rowItem}>
          <Text style={styles.rowLabel}>Terms of Service</Text>
          <Text style={styles.rowChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.rowItem, { borderBottomWidth: 0 }]}>
          <Text style={styles.rowLabel}>Privacy Policy</Text>
          <Text style={styles.rowChevron}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.supportBtn}>
        <Text style={styles.supportText}>Contact Support</Text>
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
    paddingBottom: 40,
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
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textMuted,
    marginTop: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cardGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 16,
    overflow: 'hidden',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  rowVal: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  rowChevron: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  supportBtn: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  supportText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});
