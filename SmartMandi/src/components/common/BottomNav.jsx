import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

export const BottomNav = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { key: 'Home', label: 'Home', icon: '🏠' },
    { key: 'Queue', label: 'Queue', icon: '🕒' },
    { key: 'Payments', label: 'Payments', icon: '💳' },
    { key: 'Grievance', label: 'Grievance', icon: 'ℹ️' },
    { key: 'Profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => onSelectTab(tab.key)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <Text style={[styles.iconText, isActive && styles.activeIconText]}>{tab.icon}</Text>
            </View>
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  activeTabButton: {},
  iconContainer: {
    width: 38,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: Colors.primaryLight,
  },
  iconText: {
    fontSize: 16,
  },
  activeIconText: {
    color: Colors.primary,
  },
  tabLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
