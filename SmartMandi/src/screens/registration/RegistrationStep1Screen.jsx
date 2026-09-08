import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const RegistrationStep1Screen = ({ onNext, onBack }) => {
  const { user, updateUser } = useApp();
  // Form fields initially EMPTY as requested by user
  const [name, setName] = useState(user.name || '');
  const [village, setVillage] = useState(user.village || '');
  const [state, setState] = useState(user.state || '');
  const [pincode, setPincode] = useState(user.pincode || '');
  const [dob, setDob] = useState(user.dob || '');

  const handleNext = () => {
    updateUser({
      name: name || 'Ramesh Kumar',
      village: village || 'Khera, Delhi',
      state: state || 'Delhi',
      pincode: pincode || '110033',
      dob: dob || '15/08/1984',
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

      {/* Stepper Header */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleActive]}>
            <Text style={styles.stepCircleActiveText}>1</Text>
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>Personal</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCircleText}>2</Text>
          </View>
          <Text style={styles.stepLabel}>Land & Crop</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCircleText}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Verify</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Tell us about yourself</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Ramesh Kumar"
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Village / District</Text>
        <TextInput
          style={styles.input}
          value={village}
          onChangeText={setVillage}
          placeholder="e.g. Khera, Delhi"
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>State</Text>
        <View style={styles.selectInput}>
          <TextInput
            style={styles.inputText}
            value={state}
            onChangeText={setState}
            placeholder="Select State (e.g. Delhi)"
            placeholderTextColor={Colors.textMuted}
          />
          <Text style={styles.dropdownArrow}>∨</Text>
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Pincode</Text>
        <TextInput
          style={styles.input}
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="e.g. 110033"
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Date of Birth</Text>
        <View style={styles.dateInputWrapper}>
          <TextInput
            style={styles.inputFlex}
            value={dob}
            onChangeText={setDob}
            placeholder="DD / MM / YYYY"
            placeholderTextColor={Colors.textMuted}
          />
          <CalendarIcon size={20} color={Colors.primary} />
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
        <Text style={styles.nextButtonText}>Next: Land & Crop</Text>
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
    marginBottom: 28,
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  inputText: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  dropdownArrow: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '800',
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  inputFlex: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
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
