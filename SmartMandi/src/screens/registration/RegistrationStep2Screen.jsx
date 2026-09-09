import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const RegistrationStep2Screen = ({ onNext, onBack }) => {
  const { updateUser } = useApp();

  const [landSize, setLandSize] = useState('');
  const [landUnit, setLandUnit] = useState('Acres');

  const handleNext = () => {
    updateUser({
      landSize: parseFloat(landSize) || 5,
      landUnit,
    });
    onNext();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registration</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Stepper */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleDone]}>
            <Text style={styles.stepDoneCheck}>✓</Text>
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelDone]}>Personal</Text>
        </View>

        <View style={[styles.stepLine, styles.stepLineActive]} />

        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleActive]}>
            <Text style={styles.stepCircleActiveText}>2</Text>
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>Land Details</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCircleText}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Verify</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your land details</Text>

      {/* Land Size Section */}
      <Text style={styles.sectionSubtitle}>LAND SIZE</Text>
      <View style={styles.landRow}>
        <View style={styles.landInputWrapper}>
          <Text style={styles.landInputLabel}>Total land size</Text>
          <TextInput
            style={styles.landInput}
            value={landSize}
            onChangeText={setLandSize}
            keyboardType="decimal-pad"
            placeholder="e.g. 6.5"
            placeholderTextColor={Colors.textMuted}
          />
        </View>

        <View style={styles.unitToggleContainer}>
          <TouchableOpacity
            style={[styles.unitButton, landUnit === 'Acres' && styles.unitButtonActive]}
            onPress={() => setLandUnit('Acres')}
          >
            <Text style={[styles.unitButtonText, landUnit === 'Acres' && styles.unitButtonTextActive]}>Acres</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitButton, landUnit === 'Hectares' && styles.unitButtonActive]}
            onPress={() => setLandUnit('Hectares')}
          >
            <Text style={[styles.unitButtonText, landUnit === 'Hectares' && styles.unitButtonTextActive]}>Hectares</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
        <Text style={styles.nextButtonText}>Next: Verification</Text>
        <ArrowRightIcon size={20} color="#FFFFFF" />
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
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  stepCircleDone: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  stepDoneCheck: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  stepCircleText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  stepCircleActiveText: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
    fontWeight: '600',
  },
  stepLabelDone: {
    color: Colors.primary,
    fontWeight: '700',
  },
  stepLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
    marginTop: -16,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 12,
    marginTop: 8,
  },
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  cropChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 10,
    borderWidth: 1.5,
  },
  cropChipSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: Colors.primary,
  },
  cropChipUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: Colors.borderLight,
  },
  cropChipIcon: {
    marginRight: 6,
    fontSize: 14,
  },
  cropChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  cropChipTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
  otherInputWrapper: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
  },
  otherInputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 6,
  },
  otherInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  landRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  landInputWrapper: {
    flex: 1,
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  landInputLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '700',
  },
  landInput: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    paddingVertical: 2,
  },
  unitToggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBg,
    borderRadius: 20,
    padding: 4,
  },
  unitButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  unitButtonActive: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  unitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  unitButtonTextActive: {
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  cropDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cropCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cropCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  dropdownIcon: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '800',
  },
  cropField: {
    marginBottom: 12,
  },
  cropFieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  cropInput: {
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  cropInputFlex: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
});
