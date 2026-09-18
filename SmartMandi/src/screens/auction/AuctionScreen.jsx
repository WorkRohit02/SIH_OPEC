import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeftIcon } from '../../components/common/SvgIcons';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../../components/common/BottomNav';

export const AuctionScreen = ({ onBack, onNavigate }) => {
  const { setActiveTab } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [bidModalVisible, setBidModalVisible] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidSuccess, setBidSuccess] = useState(false);

  const auctions = [
    {
      id: 'AUC-101',
      mandiName: 'Azadpur Mandi',
      crop: 'Wheat (Grade A)',
      quantity: '50 Quintals',
      startingPrice: 2150,
      currentHighestBid: 2320,
      highestBidder: 'PQR Traders',
      totalBids: 14,
      timeLeft: '12m 45s',
      status: 'LIVE',
      seller: 'Ramesh Kumar (You)',
    },
    {
      id: 'AUC-102',
      mandiName: 'Ghazipur Mandi',
      crop: 'Basmati Rice',
      quantity: '35 Quintals',
      startingPrice: 3400,
      currentHighestBid: 3650,
      highestBidder: 'Delhi Grains Co.',
      totalBids: 22,
      timeLeft: '04m 10s',
      status: 'CLOSING SOON',
      seller: 'Suresh Patel',
    },
    {
      id: 'AUC-103',
      mandiName: 'Narela Mandi',
      crop: 'Mustard Seeds',
      quantity: '20 Quintals',
      startingPrice: 5300,
      currentHighestBid: 5580,
      highestBidder: 'AgroOil Corp',
      totalBids: 9,
      timeLeft: '28m 15s',
      status: 'LIVE',
      seller: 'Balwan Singh',
    },
  ];

  const filteredAuctions = selectedCrop === 'All'
    ? auctions
    : auctions.filter((a) => a.crop.toLowerCase().includes(selectedCrop.toLowerCase()));

  const handleOpenBid = (auction) => {
    setSelectedAuction(auction);
    setBidAmount(String(auction.currentHighestBid + 50));
    setBidSuccess(false);
    setBidModalVisible(true);
  };

  const handleConfirmBid = () => {
    setBidSuccess(true);
    setTimeout(() => {
      setBidModalVisible(false);
      setBidSuccess(false);
    }, 1500);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backBtn}>
            <ArrowLeftIcon size={22} color="#1A2E20" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live Mandi Auctions</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Live Banner */}
        <View style={styles.liveBanner}>
          <View style={styles.liveIndicator}>
            <View style={styles.redDot} />
            <Text style={styles.liveBannerText}>E-AUCTION PLATFORM LIVE</Text>
          </View>
          <Text style={styles.liveBannerSub}>Fair prices & competitive bids directly from verified buyers</Text>
        </View>

        {/* Crop Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['All', 'Wheat', 'Rice', 'Mustard'].map((c) => {
            const isSel = selectedCrop === c;
            return (
              <TouchableOpacity
                key={c}
                style={[styles.filterChip, isSel && styles.filterChipSelected]}
                onPress={() => setSelectedCrop(c)}
              >
                <Text style={[styles.filterChipText, isSel && styles.filterChipTextSelected]}>
                  {c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Auction Cards */}
        {filteredAuctions.map((auc) => (
          <View key={auc.id} style={styles.auctionCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.mandiTag}>{auc.mandiName} · {auc.id}</Text>
                <Text style={styles.cropTitle}>{auc.crop}</Text>
              </View>
              <View style={[styles.statusBadge, auc.status === 'CLOSING SOON' && styles.statusClosing]}>
                <Text style={styles.statusBadgeText}>{auc.status}</Text>
              </View>
            </View>

            <View style={styles.metaGrid}>
              <View style={styles.metaCell}>
                <Text style={styles.metaLabel}>QUANTITY</Text>
                <Text style={styles.metaValue}>{auc.quantity}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.metaLabel}>TIME LEFT</Text>
                <Text style={[styles.metaValue, { color: '#DC2626' }]}>⏱ {auc.timeLeft}</Text>
              </View>
            </View>

            <View style={styles.bidPriceRow}>
              <View>
                <Text style={styles.priceLabel}>Current Highest Bid</Text>
                <Text style={styles.priceValue}>₹{auc.currentHighestBid} <Text style={styles.pricePerQ}>/ quintal</Text></Text>
              </View>
              <TouchableOpacity
                style={styles.bidButton}
                onPress={() => handleOpenBid(auc)}
                activeOpacity={0.85}
              >
                <Text style={styles.bidButtonText}>Place Bid</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.footerText}>Starting: ₹{auc.startingPrice}/q</Text>
              <Text style={styles.footerText}>Seller: {auc.seller}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Place Bid Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={bidModalVisible}
        onRequestClose={() => setBidModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {bidSuccess ? (
              <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                <Text style={{ fontSize: 40, marginBottom: 10 }}>🎉</Text>
                <Text style={{ fontSize: 18, fontWeight: '800', color: '#176B3A' }}>Bid Placed Successfully!</Text>
                <Text style={{ fontSize: 13, color: '#5A665E', marginTop: 4 }}>Your bid of ₹{bidAmount}/quintal is registered.</Text>
              </View>
            ) : (
              <>
                <Text style={styles.modalHeaderTitle}>Place Bid for {selectedAuction?.crop}</Text>
                <Text style={styles.modalSubTitle}>Mandi: {selectedAuction?.mandiName}</Text>

                <View style={styles.bidInputBox}>
                  <Text style={styles.inputPrefix}>₹</Text>
                  <TextInput
                    style={styles.modalTextInput}
                    value={bidAmount}
                    onChangeText={setBidAmount}
                    keyboardType="numeric"
                  />
                  <Text style={styles.inputSuffix}>/ quintal</Text>
                </View>

                <Text style={styles.minBidNote}>Current Highest: ₹{selectedAuction?.currentHighestBid}/q</Text>

                <View style={styles.modalActionRow}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => setBidModalVisible(false)}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={handleConfirmBid}
                  >
                    <Text style={styles.confirmBtnText}>Submit Bid</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

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
    marginBottom: 16,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A2E20',
  },
  liveBanner: {
    backgroundColor: '#176B3A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  liveBannerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  liveBannerSub: {
    color: '#E6F7EF',
    fontSize: 13,
    fontWeight: '500',
  },
  filterScroll: {
    marginBottom: 18,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#EAE7DE',
    marginRight: 10,
  },
  filterChipSelected: {
    backgroundColor: '#176B3A',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5A665E',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  auctionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  mandiTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8A968D',
    marginBottom: 2,
  },
  cropTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A2E20',
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusClosing: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#166534',
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  metaCell: {},
  metaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9CA3AF',
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1F2937',
  },
  bidPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#176B3A',
  },
  pricePerQ: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  bidButton: {
    backgroundColor: '#176B3A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  bidButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    elevation: 8,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A2E20',
  },
  modalSubTitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
  },
  bidInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  inputPrefix: {
    fontSize: 20,
    fontWeight: '800',
    color: '#176B3A',
    marginRight: 6,
  },
  modalTextInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: '#1A2E20',
    paddingVertical: 12,
  },
  inputSuffix: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  minBidNote: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 20,
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flex: 0.45,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontWeight: '700',
    color: '#4B5563',
  },
  confirmBtn: {
    flex: 0.5,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#176B3A',
    alignItems: 'center',
  },
  confirmBtnText: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
