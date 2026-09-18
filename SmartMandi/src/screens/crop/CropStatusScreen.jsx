import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../../components/common/BottomNav';

export const CropStatusScreen = ({ onBack, onNavigate }) => {
  const { setActiveTab, t } = useApp();

  const steps = [
    { title: t('registered'), status: t('completed'), state: 'completed' },
    { title: t('slotConfirmed'), status: t('completed'), state: 'completed' },
    { title: t('arrivedAtMandi'), status: t('completed'), state: 'completed' },
    { title: t('weighing'), status: t('inProgress'), state: 'in_progress' },
    { title: t('qualityCheck'), status: t('waiting'), state: 'waiting' },
    { title: t('payment'), status: t('waiting'), state: 'waiting' },
  ];

  const renderIcon = (state) => {
    if (state === 'completed') {
      return (
        <View style={styles.completedIconCircle}>
          <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '900' }}>✓</Text>
        </View>
      );
    } else if (state === 'in_progress') {
      return (
        <View style={styles.inProgressIconCircle}>
          <Text style={{ color: '#0E5C36', fontSize: 14, fontWeight: '900' }}>➔</Text>
        </View>
      );
    }
    return <View style={styles.waitingIconCircle} />;
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backBtn}>
            <ArrowLeftIcon size={22} color="#1A2E20" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('cropStatus')}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Top Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.cropNameTitle}>Wheat</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>{t('quantity')}</Text>
              <Text style={styles.metaValue}>42 quintals</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>{t('mandi')}</Text>
              <Text style={styles.metaValue}>Azadpur Mandi</Text>
            </View>
          </View>
        </View>

        {/* Progress Header */}
        <Text style={styles.progressHeaderTitle}>{t('currentProgress')}</Text>

        {/* Vertical Timeline */}
        <View style={styles.timelineContainer}>
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            const isInProgress = step.state === 'in_progress';
            const isCompleted = step.state === 'completed';

            return (
              <View key={step.title} style={styles.timelineStepRow}>
                <View style={styles.timelineLeftColumn}>
                  {renderIcon(step.state)}
                  {!isLast && (
                    <View
                      style={[
                        styles.timelineConnectorLine,
                        isCompleted && styles.connectorCompleted,
                      ]}
                    />
                  )}
                </View>

                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitleText,
                      isInProgress && styles.textInProgress,
                      step.state === 'waiting' && styles.textWaitingTitle,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={[
                      styles.stepStatusText,
                      isInProgress && styles.textStatusInProgress,
                      step.state === 'waiting' && styles.textWaitingStatus,
                    ]}
                  >
                    {step.status}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Info Callout Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoIconWrapper}>
            <Text style={{ color: '#0E5C36', fontSize: 16, fontWeight: '800' }}>ⓘ</Text>
          </View>
          <Text style={styles.infoBoxText}>{t('weighingInProgress')}</Text>
        </View>

        {/* Footer Timestamp */}
        <Text style={styles.lastUpdatedText}>{t('lastUpdated')}</Text>
      </ScrollView>

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
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A2E20',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  cropNameTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A2E20',
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  metaCol: {
    marginRight: 40,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  progressHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8A968D',
    letterSpacing: 1,
    marginBottom: 18,
  },
  timelineContainer: {
    marginBottom: 24,
    paddingLeft: 4,
  },
  timelineStepRow: {
    flexDirection: 'row',
    minHeight: 58,
  },
  timelineLeftColumn: {
    width: 32,
    alignItems: 'center',
  },
  completedIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1B723E',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  inProgressIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1B723E',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  waitingIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F8F6F0',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    zIndex: 2,
  },
  timelineConnectorLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 2,
  },
  connectorCompleted: {
    backgroundColor: '#BCE0CA',
  },
  stepContent: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  stepTitleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A2E20',
  },
  stepStatusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 2,
  },
  textInProgress: {
    color: '#0E5C36',
    fontWeight: '900',
  },
  textStatusInProgress: {
    color: '#0E5C36',
    fontWeight: '700',
  },
  textWaitingTitle: {
    color: '#6B7280',
    fontWeight: '600',
  },
  textWaitingStatus: {
    color: '#9CA3AF',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  infoIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(27, 114, 62, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoBoxText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0E5C36',
    lineHeight: 18,
  },
  lastUpdatedText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 10,
  },
});
