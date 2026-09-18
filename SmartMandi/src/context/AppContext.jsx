import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialUserProfile,
  initialMandis,
  initialActiveBooking,
  initialSaleRecord,
  initialPaymentTransactions,
  initialAppSettings,
  initialGrievances,
} from '../data/mockData';

const AppContext = createContext();

// Base English dictionary
const baseEnglishDictionary = {
  // Navigation & General
  welcome: 'Namaste',
  chooseLanguage: 'Choose your language',
  proceedToHome: 'Proceed to Home',
  goToHome: 'Go directly to Home Page ➔',
  topHomeBtn: 'Go to Home 🏠',
  getStarted: 'Get Started',
  alreadyAccount: 'I already have an account',
  opecSubtitle: 'Sell your crop. Track your queue. Get fair prices.',
  home: 'Home',
  queue: 'Queue',
  payments: 'Payments',
  more: 'More',
  moreServices: 'More Services',

  // Auth / Login Page
  enterMobileTitle: 'Enter your mobile number',
  enterMobileSubtitle: "We'll send you an OTP to verify",
  enter10Digit: 'Enter 10-digit number',
  smsVerificationHelper: 'You will receive an SMS with a verification code.',
  sendOtp: 'Send OTP',
  orText: 'OR',
  continueKisanId: 'Continue with Kisan ID',
  byContinuing: 'By continuing, you agree to our',
  termsOfService: 'Terms of Service',
  andText: 'and',
  privacyPolicy: 'Privacy Policy',

  // Verification Page
  verifyNumberTitle: 'Verify your number',
  enter6DigitCode: 'Enter the 6-digit code sent to +91',
  editText: 'Edit',
  resendCodeIn: 'Resend code in',
  verifyAndContinue: 'Verify & Continue',
  didntReceiveSms: "Didn't receive the code? Check your SMS inbox.",

  // Registration Pages
  registrationTitle: 'Registration',
  personal: 'Personal',
  verify: 'Verify',
  tellUsAboutYourself: 'Tell us about yourself',
  fullNameLabel: 'Full Name',
  fullNamePlaceholder: 'e.g. Ramesh Kumar',
  villageDistrictLabel: 'Village / District',
  villagePlaceholder: 'e.g. Khera, Delhi',
  stateLabel: 'State',
  selectStatePlaceholder: 'Select State (e.g. Delhi)',
  pincodeLabel: 'Pincode',
  pincodePlaceholder: 'e.g. 110033',
  nextVerificationBtn: 'Next: Verification',

  verifyIdentityTitle: 'Verify your identity',
  uploadDocSubtitle: 'Upload one document to confirm your land or identity',
  landRecordTab: 'Land Ownership Record',
  kisanIdTab: 'Kisan ID Card',
  tapToUpload: 'Tap to upload photo or PDF',
  maxSize5mb: 'Max size 5MB - JPG, PNG or PDF',
  confirmDocAuthentic: 'I confirm this document is authentic and belongs to me.',
  submitForVerification: 'Submit for Verification',

  // Registration Success Page
  regSuccessTitle: 'Registration Successful!',
  regSuccessSubtitle: 'Your details have been submitted. Verification usually takes 24-48 hours.',
  underReview: 'Under Review',
  nameLabel: 'Name',
  villageLabel: 'Village',
  preferredMandiLabel: 'Preferred Mandi',
  goToHomeBtn: 'Go to Home',
  editDetailsBtn: 'Edit Details',

  // Home Screen & Mandis
  azadpurMandi: 'Azadpur Mandi',
  ghazipurMandi: 'Ghazipur Mandi',
  najafgarhMandi: 'Najafgarh Mandi',
  narelaMandi: 'Narela Mandi',
  today: 'Today',
  tomorrow: 'Tomorrow',
  bookSlot: 'Book a Slot',
  checkPrices: 'Check Prices',
  trackQueue: 'Track Queue',
  raiseIssue: 'Raise Issue',
  cropStatus: 'Your Crop Status',
  liveAuctions: 'Live Mandi Auctions',
  recommendedMandis: 'Recommended Mandis for You',
  seeAll: 'See all',
  upcomingSlot: 'Upcoming Slot',
  viewGatePass: 'View Gate Pass',
  mandiCategory: 'MANDI',
  activityCategory: 'MY ACTIVITY',
  helpCategory: 'HELP',
  settingsCategory: 'SETTINGS',
  findMandi: 'Find a Mandi',
  procurementCalendar: 'Procurement Calendar',
  mandiInfo: 'Mandi Information',
  mspPrices: 'MSP & Prices',
  previousBookings: 'Previous Bookings',
  myGatePass: 'My Gate Pass',
  paymentHistory: 'Payment History',
  voiceAssistant: 'Voice Assistant',
  help: 'Help',
  contactSupport: 'Contact Support',
  reportProblem: 'Report a Problem',
  language: 'Language',
  selectLanguage: 'Select Language',
  notifications: 'Notifications',
  profile: 'Profile',
  settings: 'Settings',
  offlineAccess: 'OFFLINE ACCESS',
  bookMandiViaUssd: 'Book Mandi Slot via USSD *199#',
  noInternetRequired: 'No internet required! Tap to learn how to book using feature phones.',
  ussdSub: 'Use OPEC through USSD or SMS.',
  howItWorks: 'How it works',
  currentProgress: 'CURRENT PROGRESS',
  registered: 'Registered',
  slotConfirmed: 'Slot confirmed',
  arrivedAtMandi: 'Arrived at mandi',
  weighing: 'Weighing',
  qualityCheck: 'Quality check',
  payment: 'Payment',
  inProgress: 'In progress',
  completed: 'Completed',
  waiting: 'Waiting',
  quantity: 'QUANTITY',
  mandi: 'MANDI',
  lastUpdated: 'Last updated 2 minutes ago',
  weighingInProgress: 'Your produce is currently being weighed.',
  allCrops: 'All Crops',
  wheat: 'Wheat',
  rice: 'Rice',
  cotton: 'Cotton',
  sugarcane: 'Sugarcane',
  maize: 'Maize',
  vegetables: 'Vegetables',
  token: 'Token',
  perQuintal: '/quintal',
  capacity: 'Capacity',
  busy: 'Busy',
  available: 'Available',
  close: 'Close',
  new: 'NEW',
  offlineUssdService: 'OFFLINE USSD SERVICE',
  ussdModalTitle: 'Offline USSD Booking is Live! 📱',
  ussdModalDesc: 'No internet connection? Dial our free USSD code on any phone to book slots, check prices & queue position offline!',
  dialUssdCode: 'DIAL USSD CODE',
  ussdWorksOn: 'Works on all 2G / feature phones (Nokia, Samsung, Jio Phone)',
  ussdStep1: '1. Dial *199#',
  ussdStep2: '2. Select Mandi & Crop',
  ussdStep3: '3. Get SMS Token',
  gotItContinue: 'Got It & Continue',

  // Queue Page Specific Strings
  yourToken: 'Your Token',
  positionInQueue: 'Position in Queue',
  sixthOf40: '6th of 40',
  estimatedWait: 'Estimated Wait',
  updatingLive: 'Updating live',
  queueTimeline: 'Queue Timeline',
  live: 'Live',
  called: 'called',
  arrived: 'arrived',
  gate2Open: 'Gate 2 open',
  cancelRescheduleSlot: 'Cancel or Reschedule Slot',
  getNotifiedWhenCalled: 'Get Notified When Called',

  // Payment Page Specific Strings
  all: 'All',
  pending: 'Pending',
  received: 'Received',
  transactions: 'transactions',
  quintals: 'quintals',

  // Kisan AI Assistant
  kisanAiTitle: 'Kisan AI Assistant',
  kisanAiSub: 'OPEC AI • Multilingual',
  kisanAiWelcomeGreeting: 'Namaste',
  kisanAiWelcomeSub: 'I am your OPEC AI Assistant.\nHow can I help you today with prices, slot booking, or mandi queues?',
  wheatPriceQuestion: '🌾 Wheat price today?',
  howToBookQuestion: '🚜 How to book a slot?',
  liveQueueQuestion: '🕒 Live queue status',
  nearestMandiQuestion: '📍 Nearest Mandi details',
  fileGrievanceQuestion: '❓ File a grievance',
  askKisanPlaceholder: 'Ask OPEC AI anything in English/Hindi...',
  thinking: 'Thinking...',
  compareAllPricesBtn: 'Compare All Mandi Prices',
  bookSlotNowBtn: 'Book Slot Now',
  trackLiveQueueBtn: 'Track Live Queue',
  raiseGrievanceBtn: 'Raise Grievance',
};

// Immediate Language Fallbacks for 100% fail-proof 0ms translations
const fallbackTranslations = {
  Hindi: {
    yourToken: 'आपका टोकन',
    positionInQueue: 'कतार में स्थिति',
    estimatedWait: 'अनुमानित प्रतीक्षा समय',
    called: 'बुलाया गया',
    arrived: 'पहुंच गए',
    cancelRescheduleSlot: 'स्लॉट रद्द या पुननिर्धारित करें',
    getNotifiedWhenCalled: 'बुलाए जाने पर सूचना पाएं',
    pending: 'लंबित',
    received: 'प्राप्त हुआ',
    all: 'सभी',
    quintals: 'क्विंटल',
    azadpurMandi: 'आजादपुर मंडी',
    ghazipurMandi: 'गाजीपुर मंडी',
    najafgarhMandi: 'नजफगढ़ मंडी',
    narelaMandi: 'नरेला मंडी',
  },
  Punjabi: {
    yourToken: 'ਤੁਹਾਡਾ ਟੋਕਨ',
    positionInQueue: 'ਕਤਾਰ ਵਿੱਚ ਸਥਿਤੀ',
    estimatedWait: 'ਅਨੁਮਾਨਿਤ ਉਡੀਕ ਸਮਾਂ',
    called: 'ਬੁਲਾਇਆ ਗਿਆ',
    arrived: 'ਪਹੁੰਚ ਗਏ',
    cancelRescheduleSlot: 'ਸਲੋਟ ਰੱਦ ਜਾਂ ਬਦਲੋ',
    getNotifiedWhenCalled: 'ਬੁਲਾਏ ਜਾਣ \'ਤੇ ਸੂਚਨਾ ਪ੍ਰਾਪਤ ਕਰੋ',
    pending: 'ਬਕਾਇਆ',
    received: 'ਪ੍ਰਾਪਤ ਹੋਇਆ',
    all: 'ਸਭ',
    quintals: 'ਕੁਇੰਟਲ',
    azadpurMandi: 'ਆਜ਼ਾਦਪੁਰ ਮੰਡੀ',
    ghazipurMandi: 'ਗਾਜ਼ੀਪੁਰ ਮੰਡੀ',
    najafgarhMandi: 'ਨਜਫਗੜ੍ਹ ਮੰਡੀ',
    narelaMandi: 'ਨਰੇਲਾ ਮੰਡੀ',
  },
  Marathi: {
    yourToken: 'तुमचा टोकन',
    positionInQueue: 'रांगेतील स्थान',
    estimatedWait: 'अंदाजित वाट पाहण्याची वेळ',
    called: 'बोलावले',
    arrived: 'पोहोचले',
    cancelRescheduleSlot: 'स्लॉट रद्द करा किंवा वेळ बदला',
    getNotifiedWhenCalled: 'बोलावल्यावर सूचना मिळवा',
    pending: 'लंबित',
    received: 'प्राप्त झाले',
    all: 'सर्व',
    quintals: 'क्विंटल',
    azadpurMandi: 'आझादपूर मंडी',
    ghazipurMandi: 'गाझीपूर मंडी',
    najafgarhMandi: 'नजफगड मंडी',
    narelaMandi: 'नरेला मंडी',
  },
  Telugu: {
    yourToken: 'మీ టోకెన్',
    positionInQueue: 'క్యూలో స్థానం',
    estimatedWait: 'అంచనా వేచి ఉండే సమయం',
    called: 'పిలిచారు',
    arrived: 'చేరుకున్నారు',
    cancelRescheduleSlot: 'స్లాట్ రద్దు లేదా రీషెడ్యూల్ చేయండి',
    getNotifiedWhenCalled: 'పిలిచినప్పుడు సూచన పొందండి',
    pending: 'పెండింగ్‌లో ఉంది',
    received: 'స్వీకరించబడింది',
    all: 'అన్నీ',
    quintals: 'క్వింటాళ్ళు',
    azadpurMandi: 'ఆజాద్‌పూర్ మండీ',
    ghazipurMandi: 'గాజీపూర్ మండీ',
    najafgarhMandi: 'నజాఫ్‌గఢ్ మండీ',
    narelaMandi: 'నరేలా మండీ',
  },
  Tamil: {
    yourToken: 'உங்கள் டோக்கன்',
    positionInQueue: 'வரிசையில் நிலை',
    estimatedWait: 'மதிப்பிடப்பட்ட காத்திருப்பு સમય',
    called: 'அழைக்கப்பட்டது',
    arrived: 'வந்து சேர்ந்தார்',
    cancelRescheduleSlot: 'ஸ்லாட்டை ரத்துசெய் அல்லது மாற்று',
    getNotifiedWhenCalled: 'அழைக்கப்படும் போது அறிவிக்கப்படும்',
    pending: 'நிலுவையில் உள்ளது',
    received: 'பெறப்பட்டது',
    all: 'அனைத்தும்',
    quintals: 'க்விண்டால்',
    azadpurMandi: 'ஆசாத் பூர் சந்தை',
    ghazipurMandi: 'காஜிபூர் சந்தை',
    najafgarhMandi: 'நஜாப்கர் சந்தை',
    narelaMandi: 'நரேலா சந்தை',
  },
};

const LANGUAGE_CODES = {
  English: 'en',
  Hindi: 'hi',
  Punjabi: 'pa',
  Marathi: 'mr',
  Telugu: 'te',
  Tamil: 'ta',
};

// Single-request Bulk Translation API Function
const fetchBulkTranslationApi = async (englishDict, targetLangCode) => {
  if (targetLangCode === 'en') return englishDict;

  const keys = Object.keys(englishDict);
  const values = Object.values(englishDict);

  // Protect OPEC brand name from translation
  const maskedValues = values.map((v) => String(v).replace(/\bOPEC\b/g, '___OPEC___'));
  const payload = maskedValues.join(' \n|||\n ');

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLangCode}&dt=t&q=${encodeURIComponent(
      payload
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    let fullTranslatedText = '';
    if (Array.isArray(data?.[0])) {
      fullTranslatedText = data[0].map((item) => item[0]).join('');
    }

    // Restore OPEC brand name
    fullTranslatedText = fullTranslatedText.replace(/___OPEC___|___ OPEC ___|___OPEC ___|___ OPEC___/gi, 'OPEC');

    // Split translated text back into dictionary entries
    const translatedParts = fullTranslatedText.split(/\s*\|\|\|\s*/);

    const resultDict = {};
    keys.forEach((key, index) => {
      resultDict[key] = (translatedParts[index] && translatedParts[index].trim()) || values[index];
    });

    return resultDict;
  } catch (err) {
    console.warn('Free Translation API error, fallback to English:', err);
    return englishDict;
  }
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const [user, setUser] = useState(initialUserProfile);
  const [mandis] = useState(initialMandis);
  const [activeBooking, setActiveBooking] = useState(initialActiveBooking);
  const [saleRecord] = useState(initialSaleRecord);
  const [payments] = useState(initialPaymentTransactions);
  const [grievances, setGrievances] = useState(initialGrievances);
  const [settings, setSettings] = useState(initialAppSettings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [hasSeenUssdModal, setHasSeenUssdModal] = useState(false);

  // Translation Cache for API responses
  const [translatedCache, setTranslatedCache] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Fetch translations dynamically from API when language changes
  useEffect(() => {
    if (language === 'English' || translatedCache[language]) {
      return;
    }

    let isMounted = true;
    const targetCode = LANGUAGE_CODES[language] || 'hi';

    const loadTranslations = async () => {
      setIsTranslating(true);
      const apiResult = await fetchBulkTranslationApi(baseEnglishDictionary, targetCode);
      if (isMounted) {
        setTranslatedCache((prev) => ({
          ...prev,
          [language]: apiResult,
        }));
        setIsTranslating(false);
      }
    };

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, [language]);

  const t = (key) => {
    if (language === 'English') {
      return baseEnglishDictionary[key] || key;
    }
    const langDict = translatedCache[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const fallbackDict = fallbackTranslations[language];
    if (fallbackDict && fallbackDict[key]) {
      return fallbackDict[key];
    }
    return baseEnglishDictionary[key] || key;
  };

  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addGrievance = (newGrv) => {
    setGrievances((prev) => [newGrv, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isTranslating,
        t,
        user,
        updateUser,
        mandis,
        activeBooking,
        setActiveBooking,
        saleRecord,
        payments,
        grievances,
        addGrievance,
        settings,
        updateSettings,
        isAuthenticated,
        setIsAuthenticated,
        activeTab,
        setActiveTab,
        selectedCrop,
        setSelectedCrop,
        hasSeenUssdModal,
        setHasSeenUssdModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
