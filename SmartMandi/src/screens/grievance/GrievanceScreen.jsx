import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, CheckCircleIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../../components/common/BottomNav';

export const GrievanceScreen = ({ onNavigate, onBack }) => {
  const { grievances, addGrievance, activeTab, setActiveTab, mandis } = useApp();

  const [category, setCategory] = useState('Weighment Discrepancy');
  const [selectedMandi, setSelectedMandi] = useState('Azadpur Mandi');
  const [description, setDescription] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = [
    'Weighment Discrepancy',
    'Payment Delay',
    'Gate Pass Entry Issue',
    'Quality Assessment Dispute',
    'Mandi Staff Behavior',
  ];

  const handleSubmit = () => {
    if (!description.trim()) return;

    const newTicket = {
      id: 'GRV-' + Math.floor(1000 + Math.random() * 9000),
      mandiName: selectedMandi,
      issueCategory: category,
      description,
      dateSubmitted: 'Today',
      status: 'Open',
    };

    addGrievance(newTicket);
    setDescription('');
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack || (() => onNavigate('Home'))}>
            <ArrowLeftIcon size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Grievance & Support</Text>
          <View style={{ width: 24 }} />
        </View>

        {submittedSuccess && (
          <View style={styles.successBanner}>
            <CheckCircleIcon size={20} color={Colors.primary} />
            <Text style={styles.successText}>Grievance Ticket Submitted Successfully!</Text>
          </View>
        )}

        {/* Existing Tickets Section */}
        <Text style={styles.sectionTitle}>Your Grievance Tickets</Text>
        {grievances.map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketId}>{ticket.id}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      ticket.status === 'Resolved'
                        ? Colors.primaryLight
                        : ticket.status === 'Under Investigation'
                        ? Colors.warningBg
                        : Colors.inputBg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    {
                      color:
                        ticket.status === 'Resolved'
                          ? Colors.primary
                          : ticket.status === 'Under Investigation'
                          ? Colors.warning
                          : Colors.textPrimary,
                    },
                  ]}
                >
                  {ticket.status}
                </Text>
              </View>
            </View>

            <Text style={styles.ticketCategory}>{ticket.issueCategory}</Text>
            <Text style={styles.ticketMandi}>{ticket.mandiName} · {ticket.dateSubmitted}</Text>
            <Text style={styles.ticketDesc}>{ticket.description}</Text>
          </View>
        ))}

        {/* Submit New Ticket Section */}
        <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Raise a New Issue</Text>
        <View style={styles.formCard}>
          <Text style={styles.fieldLabel}>ISSUE CATEGORY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {categories.map((cat) => {
              const isSelected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catPill, isSelected && styles.catPillActive]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.catText, isSelected && styles.catTextActive]}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={styles.fieldLabel}>SELECT MANDI</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {mandis.map((m) => {
              const isSelected = selectedMandi === m.name;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={[styles.catPill, isSelected && styles.catPillActive]}
                  onPress={() => setSelectedMandi(m.name)}
                >
                  <Text style={[styles.catText, isSelected && styles.catTextActive]}>{m.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={styles.fieldLabel}>DESCRIPTION & DETAILS</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the issue (e.g. weighment rate discrepancy, gate token delay)..."
            placeholderTextColor={Colors.textMuted}
          />

          <TouchableOpacity
            style={[styles.submitBtn, !description.trim() && styles.disabledBtn]}
            onPress={handleSubmit}
            disabled={!description.trim()}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Submit Grievance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'Home') onNavigate('Home');
          else if (tab === 'Queue') onNavigate('LiveQueue');
          else if (tab === 'Payments') onNavigate('Payments');
          else if (tab === 'Profile') onNavigate('Profile');
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
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },
  successText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  ticketId: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  ticketCategory: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  ticketMandi: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  ticketDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: 8,
    marginTop: 4,
  },
  catScroll: {
    marginBottom: 14,
  },
  catPill: {
    backgroundColor: Colors.inputBg,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 8,
  },
  catPillActive: {
    backgroundColor: Colors.primary,
  },
  catText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  catTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  textArea: {
    backgroundColor: Colors.inputBg,
    borderRadius: 14,
    padding: 14,
    fontSize: 14,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
    height: 100,
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
