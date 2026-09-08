import React, { useState, useRef } from 'react';
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
  const { user, mandis, selectedCrop } = useApp();
  const scrollViewRef = useRef(null);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `Namaste ${user?.name || 'Kisan Ji'}! 🙏 I am your SmartMandi AI Assistant.\nHow can I help you today with prices, slot booking, or mandi queues?`,
      time: 'Just now',
    },
  ]);

  const quickQuestions = [
    '🌾 Wheat price today?',
    '🚜 How to book a slot?',
    '🕒 Live queue status',
    '📍 Nearest Mandi details',
    '❓ File a grievance',
  ];

  const handleSend = (textToSend) => {
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
      let aiReply = generateAIResponse(query);
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
    }, 900);
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('price') || q.includes('wheat') || q.includes('rate')) {
      const mandi = mandis[0] || { name: 'Azadpur Mandi', currentPricePerQuintal: 2280 };
      const price = mandi.cropPrices?.[selectedCrop || 'Wheat'] || mandi.currentPricePerQuintal;
      return {
        text: `📊 **Today's Market Trend for ${selectedCrop || 'Wheat'}**:\n\n• **${mandi.name}**: ₹${price}/quintal (High Demand 📈)\n• **Najafgarh Mandi**: ₹${price - 30}/quintal\n• **Narela Mandi**: ₹${price + 20}/quintal\n\nPrices are forecasted to rise by 2-3% tomorrow!`,
        action: { label: 'Compare All Mandi Prices', screen: 'PriceTrends' },
      };
    }

    if (q.includes('book') || q.includes('slot') || q.includes('token')) {
      return {
        text: `🚜 **Booking a Mandi Slot is quick**:\n1. Choose your preferred Mandi.\n2. Pick a convenient date & 2-hour time slot.\n3. Get your instant digital Gate Pass with Token Number!`,
        action: { label: 'Book Slot Now', screen: 'BookSlot' },
      };
    }

    if (q.includes('queue') || q.includes('status') || q.includes('time')) {
      return {
        text: `🕒 **Live Queue Status**:\nAzadpur Mandi current waiting time is ~25 mins (Token #42 active).\nYou can track your live gate queue in real time!`,
        action: { label: 'Track Live Queue', screen: 'LiveQueue' },
      };
    }

    if (q.includes('grievance') || q.includes('issue') || q.includes('help') || q.includes('complaint')) {
      return {
        text: `🤝 **Need Help or Have a Complaint?**\nYou can submit a grievance directly to Mandi Officers for payment delays, weighing issues, or slot rescheduling.`,
        action: { label: 'Raise Grievance', screen: 'Grievance' },
      };
    }

    return {
      text: `🤖 SmartMandi AI is here for you!\nYou can ask me about:\n• Crop prices & trends\n• Mandi slot booking & gate passes\n• Real-time queue waiting times\n• Payment receipts & grievances`,
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
                <Text style={styles.headerTitle}>Kisan AI Assistant</Text>
                <View style={styles.statusRow}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.statusText}>SmartMandi AI • Multilingual</Text>
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
            {quickQuestions.map((q, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.chip}
                onPress={() => handleSend(q)}
                activeOpacity={0.8}
              >
                <Text style={styles.chipText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Messages */}
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

                  {msg.action && onNavigate && (
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => {
                        onClose();
                        onNavigate(msg.action.screen);
                      }}
                    >
                      <Text style={styles.actionBtnText}>➡️ {msg.action.label}</Text>
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
                  <Text style={[styles.msgText, styles.aiMsgText, { marginLeft: 8 }]}>Thinking...</Text>
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
              placeholder="Ask Kisan AI anything in English/Hindi..."
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
    maxWidth: '85%',
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
    padding: 12,
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
    backgroundColor: Colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  msgTime: {
    fontSize: 10,
    marginTop: 4,
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
