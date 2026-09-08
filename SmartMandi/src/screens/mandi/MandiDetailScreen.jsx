import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon, CheckCircleIcon } from '../../components/common/SvgIcons';

export const MandiDetailScreen = ({ mandi, crop = 'Wheat', onBack, onBookSlot }) => {
  const currentMandi = mandi || {
    name: 'Azadpur Mandi',
    verified: true,
    address: 'Azadpur, New Delhi, Delhi 110033',
    rating: 4.3,
    reviewCount: 128,
    currentPricePerQuintal: 2150,
    priceChangePercent: 3.2,
    capacityLevel: 'Moderate',
    phone: '011-2765-4321',
  };

  const cropPrice = currentMandi.cropPrices?.[crop] || currentMandi.currentPricePerQuintal;

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        {/* Top Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack}>
            <ArrowLeftIcon size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentMandi.name}</Text>
          <TouchableOpacity>
            <Text style={styles.heartIcon}>♡</Text>
          </TouchableOpacity>
        </View>

        {/* Mandi Primary Card */}
        <View style={styles.primaryCard}>
          <View style={styles.nameRow}>
            <Text style={styles.mandiTitle}>{currentMandi.name}</Text>
            {currentMandi.verified && <CheckCircleIcon size={18} color={Colors.primary} />}
          </View>
          <Text style={styles.addressText}>{currentMandi.address}</Text>
          <Text style={styles.ratingText}>
            <Text style={styles.ratingStar}>★ </Text>
            <Text style={styles.ratingBold}>{currentMandi.rating}</Text> ({currentMandi.reviewCount} reviews)
          </Text>
        </View>

        {/* Crop Selector Badge */}
        <View style={styles.cropSelector}>
          <Text style={styles.cropSelectorText}>{crop} ∨</Text>
        </View>

        {/* Price History Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Price History ({crop})</Text>
          <View style={styles.chartHeader}>
            <Text style={styles.chartPrice}>₹{cropPrice.toLocaleString()}</Text>
          </View>

          {/* Line Chart Visual Representation */}
          <View style={styles.lineChartArea}>
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.sparklinePath} />
            <View style={[styles.sparklineDot, { top: 20, right: 10 }]} />
          </View>

          <View style={styles.chartFooter}>
            <Text style={styles.chartTime}>7 days ago</Text>
            <Text style={styles.chartTime}>Today</Text>
          </View>
          <Text style={styles.trendSuccessText}>Up {currentMandi.priceChangePercent}% this week</Text>
        </View>

        {/* Capacity Trend Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Capacity Trend</Text>

          <View style={styles.barChartContainer}>
            <View style={styles.barCol}>
              <View style={[styles.barFill, { height: 35 }]} />
              <Text style={styles.barLabel}>Mon</Text>
            </View>
            <View style={styles.barCol}>
              <View style={[styles.barFill, { height: 45 }]} />
              <Text style={styles.barLabel}>Tue</Text>
            </View>
            <View style={styles.barCol}>
              <View style={[styles.barFill, { height: 50 }]} />
              <Text style={styles.barLabel}>Wed</Text>
            </View>
            <View style={styles.barCol}>
              <View style={[styles.barFill, { height: 55 }]} />
              <Text style={styles.barLabel}>Thu</Text>
            </View>
            <View style={styles.barCol}>
              <View style={[styles.barFill, styles.barFillActive, { height: 45 }]}>
                <Text style={styles.barBadgeText}>45%</Text>
              </View>
              <Text style={[styles.barLabel, styles.barLabelActive]}>Today</Text>
            </View>
          </View>

          <Text style={styles.capacityText}>
            Current capacity:<Text style={styles.capacityBold}> {currentMandi.capacityLevel}</Text>
          </Text>
        </View>

        {/* Arrival Rules */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Arrival Rules</Text>
          <View style={styles.ruleItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.ruleText}>Gates open 6:00 AM – 6:00 PM</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.ruleText}>Bring original land record and Kisan ID</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.ruleText}>Quality check mandatory before weighment</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.ruleText}>Token issued on arrival; no same-day walk-ins after 4 PM</Text>
          </View>
        </View>

        {/* Mandi Office Contact */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mandi Office</Text>
          <Text style={styles.contactText}>📞 {currentMandi.phone}</Text>
          <Text style={styles.contactText}>📍 Office Block A, Gate 2</Text>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.subBtn}>
              <Text style={styles.subBtnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subBtn}>
              <Text style={styles.subBtnText}>Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Farmer Reviews */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Farmer Reviews</Text>

          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Suresh P.</Text>
              <Text style={styles.reviewDate}>3 days ago</Text>
            </View>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.reviewComment}>Fast weighment, fair price</Text>
          </View>

          <View style={[styles.reviewItem, { borderBottomWidth: 0 }]}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Anita D.</Text>
              <Text style={styles.reviewDate}>1 week ago</Text>
            </View>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.reviewComment}>Queue moved quickly today</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bookSlotBtn} onPress={onBookSlot} activeOpacity={0.85}>
          <Text style={styles.bookSlotText}>Book a Slot</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 90,
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
  heartIcon: {
    fontSize: 22,
    color: Colors.textPrimary,
  },
  primaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  mandiTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginRight: 6,
  },
  addressText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  ratingStar: {
    color: Colors.accentGold,
  },
  ratingBold: {
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  cropSelector: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  cropSelectorText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  chartHeader: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  chartPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  lineChartArea: {
    height: 90,
    backgroundColor: '#FAF8F2',
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 8,
  },
  gridLine: {
    height: 1,
    backgroundColor: Colors.borderLight,
    width: '100%',
  },
  sparklinePath: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 30,
    height: 40,
    borderTopWidth: 3,
    borderTopColor: Colors.primary,
    transform: [{ rotate: '-12deg' }],
  },
  sparklineDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  chartTime: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  trendSuccessText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 14,
    paddingBottom: 10,
  },
  barCol: {
    alignItems: 'center',
  },
  barFill: {
    width: 28,
    backgroundColor: Colors.inputBg,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barFillActive: {
    backgroundColor: Colors.primary,
  },
  barBadgeText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  barLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 6,
  },
  barLabelActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  capacityText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  capacityBold: {
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 8,
  },
  ruleText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  contactText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  subBtn: {
    flex: 0.48,
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  subBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  reviewItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  reviewDate: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  stars: {
    fontSize: 12,
    color: Colors.accentGold,
    marginBottom: 4,
  },
  reviewComment: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  bookSlotBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookSlotText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
