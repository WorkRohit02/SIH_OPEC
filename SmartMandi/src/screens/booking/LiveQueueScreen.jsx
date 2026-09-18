import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';
import { queueActivities } from '../../data/mockData';
import { BottomNav } from '../../components/common/BottomNav';

export const LiveQueueScreen = ({ onBack, onReschedule, onNavigate }) => {
  const { activeBooking, setActiveTab, t } = useApp();

  const token = activeBooking?.tokenNumber || '#042';

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack}>
            <ArrowLeftIcon size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('trackQueue')}</Text>
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeDot}>● </Text>
            <Text style={styles.liveBadgeText}>{t('live')}</Text>
          </View>
        </View>

        {/* Main Queue Card */}
        <View style={styles.queueCard}>
          <Text style={styles.tokenLabel}>{t('yourToken').toUpperCase()}</Text>
          <Text style={styles.tokenNumber}>{token}</Text>

          <View style={styles.positionRow}>
            <Text style={styles.positionLabel}>{t('positionInQueue').toUpperCase()}</Text>
            <Text style={styles.positionPercent}>15%</Text>
          </View>

          <Text style={styles.positionVal}>{t('sixthOf40')}</Text>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '15%' }]} />
          </View>

          <View style={styles.waitRow}>
            <View>
              <Text style={styles.waitLabel}>{t('estimatedWait').toUpperCase()}</Text>
              <Text style={styles.waitVal}>~35 min</Text>
            </View>

            <View style={styles.updatingBadge}>
              <Text style={styles.updatingDot}>● </Text>
              <Text style={styles.updatingText}>{t('updatingLive')}</Text>
            </View>
          </View>
        </View>

        {/* Queue Timeline */}
        <Text style={styles.sectionTitle}>{t('queueTimeline')}</Text>
        <View style={styles.timelineCard}>
          {queueActivities.map((act, idx) => (
            <View key={act.id} style={[styles.timelineItem, idx === queueActivities.length - 1 && styles.noBorder]}>
              <View style={[styles.timelineIconCircle, act.status === 'called' ? styles.circleGreen : styles.circleCheck]}>
                <Text style={styles.circleText}>{act.status === 'called' ? '→' : '✓'}</Text>
              </View>

              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>
                  {t('token')} {act.tokenNumber} {act.status === 'called' ? t('called') : t('arrived')}
                </Text>
                <Text style={styles.timelineTime}>{act.timeAgo}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Mandi Gate Info */}
        <View style={styles.mandiGateCard}>
          <Text style={styles.mandiGateText}>
            {t('azadpurMandi')} · 45% {t('capacity')} · {t('gate2Open')}
          </Text>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.rescheduleBtn} onPress={onReschedule}>
          <Text style={styles.rescheduleText}>{t('cancelRescheduleSlot')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.notifiedBtn}>
          <Text style={styles.notifiedText}>{t('getNotifiedWhenCalled')}</Text>
        </TouchableOpacity>
      </ScrollView>

      {onNavigate && (
        <BottomNav
          currentTab="Queue"
          onSelectTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'Home') onNavigate('Home');
            else if (tab === 'Queue') onNavigate('LiveQueue');
            else if (tab === 'Payments') onNavigate('Payments');
            else if (tab === 'More') onNavigate('MoreServices');
          }}
        />
      )}
    </View>
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentGoldLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  liveBadgeDot: {
    color: Colors.accentGold,
    fontSize: 10,
  },
  liveBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.accentGold,
  },
  queueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    elevation: 3,
  },
  tokenLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 4,
  },
  tokenNumber: {
    fontSize: 40,
    fontWeight: '900',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  positionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  positionPercent: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  positionVal: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.inputBg,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  waitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  waitLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  waitVal: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  updatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updatingDot: {
    color: Colors.primary,
    fontSize: 10,
  },
  updatingText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  timelineIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  circleGreen: {
    backgroundColor: Colors.primaryLight,
  },
  circleCheck: {
    backgroundColor: '#E2E8F0',
  },
  circleText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  timelineTime: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  mandiGateCard: {
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  mandiGateText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  rescheduleBtn: {
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  rescheduleText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  notifiedBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  notifiedText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
