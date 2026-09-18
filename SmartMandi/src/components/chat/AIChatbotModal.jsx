import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { useApp } from '../../context/AppContext';

export const AIChatbotModal = ({ visible, onClose, onNavigate }) => {
  const { user, mandis, selectedCrop, t } = useApp();
  const scrollViewRef = useRef(null);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getWelcomeText = () =>
    `${t('welcome')}, ${user?.name || 'Kisan Ji'}! 🙏 ${t('opecSubtitle')}\nHow can I help you today with crop prices, slot booking, live queues, or mandi info?`;

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: getWelcomeText(),
      time: 'Just now',
    },
  ]);

  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === '1' ? { ...msg, text: getWelcomeText() } : msg))
    );
  }, [t]);

  const quickQuestions = [
    { id: 'price', text: t('wheatPriceQuestion') || '🌾 Wheat price today?' },
    { id: 'book', text: t('howToBookQuestion') || '🚜 How to book a slot?' },
    { id: 'queue', text: t('liveQueueQuestion') || '🕒 Live queue status' },
    { id: 'mandi', text: t('nearestMandiQuestion') || '📍 Nearest Mandi details' },
    { id: 'grievance', text: t('fileGrievanceQuestion') || '❓ File a grievance' },
  ];

  const handleSend = (textToSend, explicitIntent) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = generateAIResponse(query, explicitIntent);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply.text,
        action: aiReply.action,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 800);
  };

  const generateAIResponse = (query, explicitIntent) => {
    const q = query.toLowerCase();

    // 1. Price Query / Intent
    if (
      explicitIntent === 'price' ||
      q.includes('price') ||
      q.includes('rate') ||
      q.includes('wheat') ||
      q.includes('crop') ||
      q.includes('दाम') ||
      q.includes('मूल्य') ||
      q.includes('भाव') ||
      q.includes('ਕੀਮਤ') ||
      q.includes('दर') ||
      q.includes('ధర') ||
      q.includes('விலை')
    ) {
      const mandi = mandis[0] || { name: 'Azadpur Mandi', currentPricePerQuintal: 2280 };
      const price = mandi.cropPrices?.[selectedCrop || 'Wheat'] || mandi.currentPricePerQuintal;
      const cropTrans = t((selectedCrop || 'Wheat').toLowerCase()) || (selectedCrop || 'Wheat');
      const mandiTrans = mandi.name?.includes('Azadpur') ? t('azadpurMandi') : mandi.name;

      return {
        text: `📊 **${cropTrans} ${t('checkPrices')}**:\n\n• **${mandiTrans}**: ₹${price}${t('perQuintal')} (High Demand 📈)\n• **${t('najafgarhMandi')}**: ₹${price - 30}${t('perQuintal')}\n• **${t('narelaMandi')}**: ₹${price + 20}${t('perQuintal')}\n\nPrices are forecasted to rise by 2-3% tomorrow!`,
        action: { label: t('compareAllPricesBtn') || 'Compare All Mandi Prices', screen: 'PriceTrends' },
      };
    }

    // 2. Booking Slot Query / Intent
    if (
      explicitIntent === 'book' ||
      q.includes('book') ||
      q.includes('slot') ||
      q.includes('token') ||
      q.includes('pass') ||
      q.includes('बुकिंग') ||
      q.includes('स्लॉट') ||
      q.includes('ਬੁਕਿੰਗ') ||
      q.includes('బుకింగ్') ||
      q.includes('பதிவு')
    ) {
      return {
        text: `🚜 **${t('bookSlot')}**:\n\n1. Select your preferred Mandi & crop.\n2. Choose date & 2-hour time slot.\n3. Receive instant digital Gate Pass & Token number!`,
        action: { label: t('bookSlotNowBtn') || 'Book Slot Now', screen: 'BookSlot' },
      };
    }

    // 3. Live Queue Query / Intent
    if (
      explicitIntent === 'queue' ||
      q.includes('queue') ||
      q.includes('status') ||
      q.includes('time') ||
      q.includes('wait') ||
      q.includes('कतार') ||
      q.includes('लाइन') ||
      q.includes('रांग') ||
      q.includes('ਕਤਾਰ') ||
      q.includes('క్యూ') ||
      q.includes('வரிசை')
    ) {
      return {
        text: `🕒 **${t('trackQueue')}**:\n\nAzadpur Mandi current wait time: ~25 mins (Token #42 ${t('inProgress')}).\nTrack live gate entry tokens in real time!`,
        action: { label: t('trackLiveQueueBtn') || 'Track Live Queue', screen: 'LiveQueue' },
      };
    }

    // 4. Nearest Mandi / Details Query / Intent
    if (
      explicitIntent === 'mandi' ||
      q.includes('mandi') ||
      q.includes('near') ||
      q.includes('location') ||
      q.includes('find') ||
      q.includes('मंडी') ||
      q.includes('ਮੰਡੀ') ||
      q.includes('మండీ') ||
      q.includes('சந்தை')
    ) {
      return {
        text: `📍 **${t('recommendedMandis')}**:\n\n• ${t('azadpurMandi')} (4.2 km)\n• ${t('ghazipurMandi')} (8.5 km)\n• ${t('narelaMandi')} (12.0 km)`,
        action: { label: t('findMandi') || 'Find a Mandi', screen: 'FindMandi' },
      };
    }

    // 5. Grievance / Complaint Query / Intent
    if (
      explicitIntent === 'grievance' ||
      q.includes('grievance') ||
      q.includes('issue') ||
      q.includes('help') ||
      q.includes('complaint') ||
      q.includes('problem') ||
      q.includes('शिकायत') ||
      q.includes('समस्या') ||
      q.includes('ਸਮੱਸਿਆ') ||
      q.includes('तक्रार') ||
      q.includes('ఫిర్యాదు') ||
      q.includes('புகார்')
    ) {
      return {
        text: `🤝 **${t('raiseIssue')}**:\n\nSubmit a complaint directly to Mandi Officers for payment delays, weighing disputes, or slot rescheduling.`,
        action: { label: t('raiseGrievanceBtn') || 'Raise Grievance', screen: 'Grievance' },
      };
    }

    // Fallback response with navigation links
    return {
      text: `🤖 OPEC AI Assistant is here for you!\n\n• Ask about crop market prices & trends\n• Book mandi arrival slots\n• Track live gate queues & gate passes`,
      action: { label: t('bookSlotNowBtn') || 'Book Slot Now', screen: 'BookSlot' },
    };
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>🤖 AI</Text>
              </View>
              <View>
                <Text style={styles.headerTitle}>{t('kisanAiTitle') || 'Kisan AI Assistant'}</Text>
                <View style={styles.statusRow}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.statusText}>{t('kisanAiSub') || 'OPEC AI • Multilingual'}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Quick chips scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsScroll}
            contentContainerStyle={styles.chipsContent}
          >
            {quickQuestions.map((q) => (
              <TouchableOpacity
                key={q.id}
                style={styles.chip}
                onPress={() => handleSend(q.text, q.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.chipText}>{q.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Messages Container */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.msgWrapper,
                  msg.sender === 'user' ? styles.userMsgWrapper : styles.aiMsgWrapper,
                ]}
              >
                {msg.sender === 'ai' && (
                  <View style={styles.aiAvatar}>
                    <Text style={{ fontSize: 14 }}>🤖</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.msgBubble,
                    msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.msgText,
                      msg.sender === 'user' ? styles.userMsgText : styles.aiMsgText,
                    ]}
                  >
                    {msg.text}
                  </Text>

                  {/* PROMINENT REDIRECTION LINK / ACTION BUTTON */}
                  {msg.action && onNavigate && (
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => {
                        onClose();
                        onNavigate(msg.action.screen);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.actionBtnText}>➔ {msg.action.label}</Text>
                    </TouchableOpacity>
                  )}

                  <Text
                    style={[
                      styles.msgTime,
                      msg.sender === 'user' ? styles.userMsgTime : styles.aiMsgTime,
                    ]}
                  >
                    {msg.time}
                  </Text>
                </View>
              </View>
            ))}

            {isTyping && (
              <View style={[styles.msgWrapper, styles.aiMsgWrapper]}>
                <View style={styles.aiAvatar}>
                  <Text style={{ fontSize: 14 }}>🤖</Text>
                </View>
                <View style={[styles.msgBubble, styles.aiBubble, { flexDirection: 'row', alignItems: 'center' }]}>
                  <ActivityIndicator size="small" color={Colors.primary} />
                  <Text style={[styles.msgText, styles.aiMsgText, { marginLeft: 8 }]}>{t('thinking') || 'Thinking...'}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input Bar */}
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.micBtn} activeOpacity={0.7}>
              <Text style={{ fontSize: 18 }}>🎙️</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder={t('askKisanPlaceholder') || 'Ask OPEC AI anything...'}
              placeholderTextColor={Colors.textMuted}
              value={inputMessage}
              onChangeText={setInputMessage}
              onSubmitEditing={() => handleSend()}
            />
            <TouchableOpacity
              style={[styles.sendBtn, !inputMessage.trim() && styles.sendBtnDisabled]}
              onPress={() => handleSend()}
              disabled={!inputMessage.trim()}
            >
              <Text style={styles.sendBtnText}>➔</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '82%',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  aiBadgeText: {
    fontSize: 14,
    fontWeight: '800',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2E7D32',
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  chipsScroll: {
    maxHeight: 44,
    backgroundColor: Colors.cardBgSecondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  chipsContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  msgWrapper: {
    flexDirection: 'row',
    marginBottom: 14,
    maxWidth: '88%',
  },
  userMsgWrapper: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  aiMsgWrapper: {
    alignSelf: 'flex-start',
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  msgBubble: {
    padding: 14,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMsgText: {
    color: '#FFFFFF',
  },
  aiMsgText: {
    color: Colors.textPrimary,
  },
  actionBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  msgTime: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  userMsgTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  aiMsgTime: {
    color: Colors.textMuted,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: '#FFFFFF',
  },
  micBtn: {
    padding: 8,
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: Colors.inputBg,
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendBtnDisabled: {
    backgroundColor: Colors.textMuted,
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
