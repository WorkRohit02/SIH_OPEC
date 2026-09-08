import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const RegistrationStep2Screen = ({ onNext, onBack }) => {
  const { user, updateUser } = useApp();

  const availableCrops = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Mustard', 'Pulses', 'Other'];
  
  // Initially empty land size and empty crop selection as requested
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [landSize, setLandSize] = useState('');
  const [landUnit, setLandUnit] = useState('Acres');
  const [customCropName, setCustomCropName] = useState('');

  const [cropDetails, setCropDetails] = useState({});

  const toggleCrop = (crop) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter((c) => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
      if (!cropDetails[crop]) {
        setCropDetails((prev) => ({
          ...prev,
          [crop]: { qty: '', date: '' },
        }));
      }
    }
  };

  const handleNext = () => {
    const finalCrops = selectedCrops.map((c) => {
      const isOther = c === 'Other';
      const cropName = isOther ? (customCropName || 'Vegetables/Other') : c;
      return {
        cropName,
        expectedQuintals: parseInt(cropDetails[c]?.qty || '15', 10),
        harvestDate: cropDetails[c]?.date || '15 Oct 2024',
      };
    });

    updateUser({
      landSize: parseFloat(landSize) || 5,
      landUnit,
      crops: finalCrops.length > 0 ? finalCrops : [{ cropName: 'Wheat', expectedQuintals: 25, harvestDate: '12 June 2024' }],
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
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>Land & Crop</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCircleText}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Verify</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your land and crops</Text>
      <Text style={styles.sectionSubtitle}>SELECT YOUR CROPS (CHOOSE ALL THAT APPLY)</Text>

      {/* Crop Pills Selection */}
      <View style={styles.cropGrid}>
        {availableCrops.map((crop) => {
          const isSelected = selectedCrops.includes(crop);
          return (
            <TouchableOpacity
              key={crop}
              style={[styles.cropChip, isSelected ? styles.cropChipSelected : styles.cropChipUnselected]}
              onPress={() => toggleCrop(crop)}
              activeOpacity={0.8}
            >
              <Text style={styles.cropChipIcon}>{crop === 'Other' ? '🥦' : '🌾'}</Text>
              <Text style={[styles.cropChipText, isSelected && styles.cropChipTextSelected]}>
                {crop} {isSelected ? ' ✓' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Custom Other Crop / Vegetable Input Field */}
      {selectedCrops.includes('Other') && (
        <View style={styles.otherInputWrapper}>
          <Text style={styles.otherInputLabel}>Enter Custom Crop or Vegetable Name</Text>
          <TextInput
            style={styles.otherInput}
            value={customCropName}
            onChangeText={setCustomCropName}
            placeholder="e.g. Tomato, Potato, Onion, Spinach"
            placeholderTextColor={Colors.textMuted}
          />
        </View>
      )}

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

      {/* Per Crop Details */}
      {selectedCrops.length > 0 && <Text style={styles.sectionSubtitle}>PER-CROP DETAILS</Text>}

      {selectedCrops.map((crop) => {
        const title = crop === 'Other' ? (customCropName || 'Other / Vegetables') : crop;
        return (
          <View key={crop} style={styles.cropDetailCard}>
            <View style={styles.cropCardHeader}>
              <Text style={styles.cropCardTitle}>{title}</Text>
              <Text style={styles.dropdownIcon}>∨</Text>
            </View>

            <View style={styles.cropField}>
              <Text style={styles.cropFieldLabel}>Expected Quantity (quintals)</Text>
              <TextInput
                style={styles.cropInput}
                value={cropDetails[crop]?.qty || ''}
                onChangeText={(text) =>
                  setCropDetails((prev) => ({
                    ...prev,
                    [crop]: { ...prev[crop], qty: text },
                  }))
                }
                keyboardType="number-pad"
                placeholder="e.g. 25"
                placeholderTextColor={Colors.textMuted}
              />
            </View>

            <View style={styles.cropField}>
              <Text style={styles.cropFieldLabel}>Expected Harvest Date</Text>
              <View style={styles.dateWrapper}>
                <TextInput
                  style={styles.cropInputFlex}
                  value={cropDetails[crop]?.date || ''}
                  onChangeText={(text) =>
                    setCropDetails((prev) => ({
                      ...prev,
                      [crop]: { ...prev[crop], date: text },
                    }))
                  }
                  placeholder="e.g. 12 June 2024"
                  placeholderTextColor={Colors.textMuted}
                />
                <CalendarIcon size={18} color={Colors.primary} />
              </View>
            </View>
          </View>
        );
      })}

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
