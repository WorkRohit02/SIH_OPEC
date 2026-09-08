import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowRightIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const RegistrationSuccessScreen = ({ onGoHome, onEditDetails }) => {
  const { user } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.centerSection}>
        <View style={styles.checkWrapper}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
        </View>

        <Text style={styles.title}>Registration Successful!</Text>
        <Text style={styles.subtitle}>
          Your details have been submitted. Verification usually takes 24-48 hours.
        </Text>

        <View style={styles.summaryCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.docIcon}>📄</Text>
            <Text style={styles.docName}>Land Ownership Record</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Under Review</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user.name || 'Ramesh Kumar'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Village</Text>
            <Text style={styles.infoValue}>{user.village || 'Khera, Delhi'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Registered Crops</Text>
            <Text style={styles.infoValue}>
              {user.crops?.length > 0 ? user.crops.map((c) => c.cropName).join(', ') : 'Wheat, Rice, Cotton'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.goHomeBtn} onPress={onGoHome} activeOpacity={0.85}>
          <Text style={styles.goHomeText}>Go to Home</Text>
          <ArrowRightIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.editBtn} onPress={onEditDetails}>
          <Text style={styles.editText}>Edit Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  centerSection: {
    alignItems: 'center',
  },
  checkWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  docIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  docName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statusBadge: {
    backgroundColor: Colors.badgeReviewBg,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.badgeReviewText,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bottomSection: {
    width: '100%',
    marginTop: 20,
  },
  goHomeBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  goHomeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  editBtn: {
    alignItems: 'center',
  },
  editText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
