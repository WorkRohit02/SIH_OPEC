import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../../components/common/BottomNav';

export const PaymentsScreen = ({ onNavigate }) => {
  const { payments, setActiveTab, t } = useApp();
  const [filter, setFilter] = useState('All');

  const filteredPayments = payments.filter((p) => {
    if (filter === 'Pending') return p.status === 'Pending';
    if (filter === 'Received') return p.status === 'Received';
    return true;
  });

  const filterTabs = [
    { key: 'All', label: t('all') },
    { key: 'Pending', label: t('pending') },
    { key: 'Received', label: t('received') },
  ];

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Text style={styles.screenTitle}>{t('payments')}</Text>

        {/* Metrics Cards Row */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>{t('pending')}</Text>
            <Text style={styles.metricVal}>₹12,400</Text>
            <Text style={styles.metricSub}>2 {t('transactions')}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>{t('received')}</Text>
            <Text style={[styles.metricVal, { color: Colors.primary }]}>₹1,84,200</Text>
            <Text style={styles.metricSub}>18 {t('transactions')}</Text>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterBar}>
          {filterTabs.map((tab) => {
            const isSelected = filter === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.filterTab, isSelected && styles.filterTabActive]}
                onPress={() => setFilter(tab.key)}
              >
                <Text style={[styles.filterTabText, isSelected && styles.filterTabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Transaction Cards List */}
        {filteredPayments.map((tx) => {
          const mandiTrans = 
            tx.mandiName?.includes('Azadpur') ? t('azadpurMandi') :
            tx.mandiName?.includes('Ghazipur') ? t('ghazipurMandi') :
            tx.mandiName?.includes('Najafgarh') ? t('najafgarhMandi') :
            tx.mandiName?.includes('Narela') ? t('narelaMandi') : tx.mandiName;

          return (
            <TouchableOpacity
              key={tx.id}
              style={styles.txCard}
              onPress={() => onNavigate('SaleRecord')}
              activeOpacity={0.85}
            >
              <View style={styles.txHeader}>
                <View style={styles.txIconBg}>
                  <Text style={styles.txIconText}>🌾</Text>
                </View>

                <View style={styles.txMeta}>
                  <Text style={styles.txTitle}>{mandiTrans}</Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </View>

              <View style={styles.txFooter}>
                <Text style={styles.txDetailText}>
                  {tx.quantityQuintals} {t('quintals')} - ₹{tx.ratePerQuintal}{t('perQuintal')}
                </Text>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.txAmount}>₹{tx.amount.toLocaleString()}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      { backgroundColor: tx.status === 'Received' ? Colors.primaryLight : Colors.warningBg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        { color: tx.status === 'Received' ? Colors.primary : Colors.warning },
                      ]}
                    >
                      {tx.status === 'Received' ? t('received') : t('pending')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <BottomNav
        currentTab="Payments"
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
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    flex: 0.48,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  metricSub: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  filterTabActive: {
    backgroundColor: '#FFFFFF',
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTabTextActive: {
    color: Colors.textPrimary,
    fontWeight: '800',
  },
  txCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  txHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  txIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  txIconText: {
    fontSize: 18,
  },
  txMeta: {
    flex: 1,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  txDate: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  chevron: {
    fontSize: 18,
    color: Colors.textMuted,
  },
  txFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  txDetailText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statusPill: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
});
