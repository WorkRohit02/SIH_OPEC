import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';

export const MandiMapScreen = ({ onBack, onNavigate }) => {
  const { mandis } = useApp();
  const [selectedMandi, setSelectedMandi] = useState(mandis[2] || mandis[0]);

  return (
    <View style={styles.container}>
      {/* Top Bar Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mandi Map</Text>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.listViewText}>List View</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Row Overlay */}
      <View style={styles.filterOverlay}>
        <View style={styles.filterPill}>
          <Text style={styles.filterText}>Crop: Wheat ∨</Text>
        </View>
        <View style={styles.filterPill}>
          <Text style={styles.filterText}>Distance ∨</Text>
        </View>
      </View>

      {/* Simulated Interactive Map Grid */}
      <View style={styles.mapArea}>
        <View style={styles.mapRoadVertical} />
        <View style={styles.mapRoadHorizontal1} />
        <View style={styles.mapRoadHorizontal2} />

        <View style={[styles.mapBlock, { top: 60, left: 30 }]} />
        <View style={[styles.mapBlock, { top: 60, right: 30 }]} />
        <View style={[styles.mapBlock, { top: 220, left: 30 }]} />
        <View style={[styles.mapBlock, { top: 220, right: 30 }]} />

        {/* Marker 1: Azadpur Mandi */}
        <TouchableOpacity
          style={[styles.mapPinContainer, { top: 80, left: 140 }]}
          onPress={() => setSelectedMandi(mandis[0])}
        >
          <View style={[styles.pinCircle, styles.pinGreen]}>
            <Text style={styles.pinPrice}>₹2,150</Text>
          </View>
          <Text style={styles.pinLabel}>Azadpur Mandi</Text>
        </TouchableOpacity>

        {/* Marker 2: Ghazipur Mandi */}
        <TouchableOpacity
          style={[styles.mapPinContainer, { top: 120, right: 40 }]}
          onPress={() => setSelectedMandi(mandis[1])}
        >
          <View style={[styles.pinCircle, styles.pinGold]}>
            <Text style={styles.pinPrice}>₹2,180</Text>
          </View>
          <Text style={styles.pinLabel}>Ghazipur Mandi</Text>
        </TouchableOpacity>

        {/* Marker 3: Narela Mandi */}
        <TouchableOpacity
          style={[styles.mapPinContainer, { top: 380, left: 70 }]}
          onPress={() => setSelectedMandi(mandis[2])}
        >
          <View style={[styles.pinCircle, styles.pinGreen, styles.pinActive]}>
            <Text style={styles.pinPrice}>₹2,095</Text>
          </View>
          <Text style={styles.pinLabel}>Narela Mandi</Text>
        </TouchableOpacity>

        {/* Marker 4: Okhla Mandi */}
        <TouchableOpacity
          style={[styles.mapPinContainer, { top: 420, right: 60 }]}
          onPress={() => setSelectedMandi(mandis[3])}
        >
          <View style={[styles.pinCircle, styles.pinGold]}>
            <Text style={styles.pinPrice}>₹2,130</Text>
          </View>
          <Text style={styles.pinLabel}>Okhla Mandi</Text>
        </TouchableOpacity>

        {/* User Location Blue Dot */}
        <View style={[styles.userLocationDot, { top: 450, left: 180 }]}>
          <View style={styles.userLocationInner} />
        </View>

        {/* Active Mandi Callout Card */}
        {selectedMandi && (
          <View style={styles.calloutCard}>
            <Text style={styles.calloutTitle}>{selectedMandi.name}</Text>
            <Text style={styles.calloutPrice}>Wheat ₹{selectedMandi.currentPricePerQuintal.toLocaleString()}/quintal</Text>
            <Text style={styles.calloutCapacity}>{selectedMandi.capacityPercent}% - {selectedMandi.capacityLevel}</Text>

            <TouchableOpacity
              style={styles.viewDetailsBtn}
              onPress={() => onNavigate('MandiDetail', { mandi: selectedMandi })}
              activeOpacity={0.85}
            >
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Recenter Button */}
        <TouchableOpacity style={styles.recenterBtn}>
          <Text style={styles.recenterIcon}>🎯</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  listViewText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  filterOverlay: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterPill: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginRight: 10,
    elevation: 1,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  mapArea: {
    flex: 1,
    backgroundColor: '#EBE8DE',
    position: 'relative',
    overflow: 'hidden',
  },
  mapRoadVertical: {
    position: 'absolute',
    left: '45%',
    top: 0,
    bottom: 0,
    width: 14,
    backgroundColor: '#DCD6C5',
    transform: [{ rotate: '-15deg' }],
  },
  mapRoadHorizontal1: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#DCD6C5',
  },
  mapRoadHorizontal2: {
    position: 'absolute',
    top: 340,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#DCD6C5',
  },
  mapBlock: {
    position: 'absolute',
    width: 110,
    height: 100,
    backgroundColor: '#DDD8C7',
    borderRadius: 8,
  },
  mapPinContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinCircle: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  pinGreen: {
    backgroundColor: Colors.primary,
  },
  pinGold: {
    backgroundColor: Colors.accentGold,
  },
  pinActive: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pinPrice: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  pinLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  userLocationDot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userLocationInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  calloutCard: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 240,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  calloutPrice: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  calloutCapacity: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
    marginBottom: 12,
  },
  viewDetailsBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  recenterBtn: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  recenterIcon: {
    fontSize: 20,
  },
});
