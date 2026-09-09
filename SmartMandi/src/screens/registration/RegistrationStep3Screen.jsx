import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, CheckCircleIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const RegistrationStep3Screen = ({ onSubmit, onBack }) => {
  const { updateUser } = useApp();
  const [docType, setDocType] = useState('Land');
  const [uploadedFile, setUploadedFile] = useState('land_record_khera.pdf');
  const [confirmed, setConfirmed] = useState(true);

  const handleSubmit = () => {
    updateUser({
      documentUploaded: true,
      documentName: uploadedFile || 'land_record_khera.pdf',
      verificationStatus: 'Under Review',
    });
    onSubmit();
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

      {/* Stepper (2 Steps) */}
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
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>Verify</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Verify your identity</Text>
      <Text style={styles.sectionSubtitle}>Upload one document to confirm your land or identity</Text>

      {/* Document Type Selector */}
      <View style={styles.docTabs}>
        <TouchableOpacity
          style={[styles.docTab, docType === 'Land' && styles.docTabActive]}
          onPress={() => setDocType('Land')}
        >
          <Text style={styles.docTabIcon}>📄</Text>
          <Text style={[styles.docTabText, docType === 'Land' && styles.docTabTextActive]}>
            Land Ownership Record
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.docTab, docType === 'Kisan' && styles.docTabActive]}
          onPress={() => setDocType('Kisan')}
        >
          <Text style={styles.docTabIcon}>💳</Text>
          <Text style={[styles.docTabText, docType === 'Kisan' && styles.docTabTextActive]}>Kisan ID Card</Text>
        </TouchableOpacity>
      </View>

      {/* Upload Drop Zone */}
      <TouchableOpacity
        style={styles.uploadDropZone}
        onPress={() => setUploadedFile('land_record_khera.pdf')}
        activeOpacity={0.8}
      >
        <Text style={styles.uploadIcon}>☁️</Text>
        <Text style={styles.uploadTextPrimary}>Tap to upload photo or PDF</Text>
        <Text style={styles.uploadTextSecondary}>Max size 5MB - JPG, PNG or PDF</Text>
      </TouchableOpacity>

      {/* Uploaded File Preview */}
      {uploadedFile && (
        <View style={styles.fileItemCard}>
          <Text style={styles.fileTypeIcon}>📄</Text>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName}>{uploadedFile}</Text>
            <Text style={styles.fileSize}>2.1 MB</Text>
          </View>
          <CheckCircleIcon size={20} color={Colors.primary} />
          <TouchableOpacity onPress={() => setUploadedFile(null)} style={styles.trashBtn}>
            <Text style={styles.trashIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Confirmation Checkbox */}
      <TouchableOpacity style={styles.checkboxRow} onPress={() => setConfirmed(!confirmed)}>
        <View style={[styles.checkbox, confirmed && styles.checkboxChecked]}>
          {confirmed && <Text style={styles.checkmarkText}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>I confirm this document is authentic and belongs to me.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.submitButton, !confirmed && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!confirmed}
        activeOpacity={0.85}
      >
        <Text style={styles.submitButtonText}>Submit for Verification</Text>
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
  stepCircleActiveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
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
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  docTabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  docTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  docTabActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  docTabIcon: {
    marginRight: 6,
    fontSize: 16,
  },
  docTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  docTabTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  uploadDropZone: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  uploadTextPrimary: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  uploadTextSecondary: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  fileItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  fileTypeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  fileSize: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  trashBtn: {
    marginLeft: 12,
  },
  trashIcon: {
    fontSize: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
