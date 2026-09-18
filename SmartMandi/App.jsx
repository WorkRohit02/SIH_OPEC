import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { Colors } from './src/theme/colors';

// Screens
import { LanguageSelectScreen } from './src/screens/auth/LanguageSelectScreen';
import { MobileLoginScreen } from './src/screens/auth/MobileLoginScreen';
import { OtpVerificationScreen } from './src/screens/auth/OtpVerificationScreen';
import { RegistrationStep1Screen } from './src/screens/registration/RegistrationStep1Screen';
import { RegistrationStep3Screen } from './src/screens/registration/RegistrationStep3Screen';
import { RegistrationSuccessScreen } from './src/screens/registration/RegistrationSuccessScreen';
import { HomeScreen } from './src/screens/home/HomeScreen';
import { FindMandiScreen } from './src/screens/mandi/FindMandiScreen';
import { MandiMapScreen } from './src/screens/mandi/MandiMapScreen';
import { MandiDetailScreen } from './src/screens/mandi/MandiDetailScreen';
import { PriceTrendsScreen } from './src/screens/mandi/PriceTrendsScreen';
import { ComparePricesScreen } from './src/screens/mandi/ComparePricesScreen';
import { BookSlotScreen } from './src/screens/booking/BookSlotScreen';
import { BookingConfirmedScreen } from './src/screens/booking/BookingConfirmedScreen';
import { GatePassScreen } from './src/screens/booking/GatePassScreen';
import { LiveQueueScreen } from './src/screens/booking/LiveQueueScreen';
import { ManageBookingScreen } from './src/screens/booking/ManageBookingScreen';
import { SaleRecordScreen } from './src/screens/receipt/SaleRecordScreen';
import { PaymentsScreen } from './src/screens/payments/PaymentsScreen';
import { ProfileScreen } from './src/screens/profile/ProfileScreen';
import { SettingsScreen } from './src/screens/settings/SettingsScreen';
import { GrievanceScreen } from './src/screens/grievance/GrievanceScreen';
import { MoreServicesScreen } from './src/screens/more/MoreServicesScreen';
import { CropStatusScreen } from './src/screens/crop/CropStatusScreen';
import { AuctionScreen } from './src/screens/auction/AuctionScreen';
import { AIChatbotFloatingButton } from './src/components/chat/AIChatbotFloatingButton';

const AUTH_REGISTRATION_SCREENS = [
  'LanguageSelect',
  'MobileLogin',
  'OtpVerification',
  'RegistrationStep1',
  'RegistrationStep3',
  'RegistrationSuccess',
];

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('LanguageSelect');
  const [screenStack, setScreenStack] = useState(['LanguageSelect']);
  const [screenParams, setScreenParams] = useState({});
  const [mobileNumber, setMobileNumber] = useState('');
  const { mandis, activeBooking } = useApp();

  const navigate = (screen, params) => {
    const targetScreen = screen === 'Queue' ? 'LiveQueue' : screen;
    if (params) setScreenParams(params);
    if (targetScreen === 'Home') {
      setScreenStack(['Home']);
    } else {
      setScreenStack((prev) => {
        if (prev[prev.length - 1] !== targetScreen) {
          return [...prev, targetScreen];
        }
        return prev;
      });
    }
    setCurrentScreen(targetScreen);
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      const newStack = [...screenStack];
      newStack.pop();
      const prevScreen = newStack[newStack.length - 1];
      setScreenStack(newStack);
      setCurrentScreen(prevScreen);
    } else {
      navigate('Home');
    }
  };

  useEffect(() => {
    const handleBackPress = () => {
      // If we are on Home page or entry screen, allow natural exit app action
      if (currentScreen === 'Home' || currentScreen === 'LanguageSelect') {
        return false;
      }
      if (screenStack.length > 1) {
        goBack();
        return true; // handled hardware back press, prevents app exit!
      }
      if (currentScreen !== 'Home') {
        navigate('Home');
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => subscription.remove();
  }, [currentScreen, screenStack]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LanguageSelect':
        return (
          <LanguageSelectScreen 
            onNext={() => navigate('MobileLogin')} 
            onSkipToHome={() => navigate('Home')} 
          />
        );

      case 'MobileLogin':
        return (
          <MobileLoginScreen
            onBack={goBack}
            onSendOtp={(num) => {
              setMobileNumber(num);
              navigate('OtpVerification');
            }}
            onKisanId={() => navigate('RegistrationStep1')}
          />
        );

      case 'OtpVerification':
        return (
          <OtpVerificationScreen
            mobileNumber={mobileNumber}
            onBack={goBack}
            onVerify={() => navigate('RegistrationStep1')}
          />
        );

      case 'RegistrationStep1':
        return (
          <RegistrationStep1Screen
            onNext={() => navigate('RegistrationStep3')}
            onBack={goBack}
          />
        );

      case 'RegistrationStep3':
        return (
          <RegistrationStep3Screen
            onSubmit={() => navigate('RegistrationSuccess')}
            onBack={goBack}
          />
        );

      case 'RegistrationSuccess':
        return (
          <RegistrationSuccessScreen
            onGoHome={() => navigate('Home')}
            onEditDetails={() => navigate('RegistrationStep1')}
          />
        );

      case 'Home':
        return <HomeScreen onNavigate={(screen, params) => navigate(screen, params)} />;

      case 'MoreServices':
        return <MoreServicesScreen onNavigate={(screen, params) => navigate(screen, params)} />;

      case 'CropStatus':
        return (
          <CropStatusScreen
            onBack={goBack}
            onNavigate={(screen, params) => navigate(screen, params)}
          />
        );

      case 'Auction':
        return (
          <AuctionScreen
            onBack={goBack}
            onNavigate={(screen, params) => navigate(screen, params)}
          />
        );

      case 'FindMandi':
        return (
          <FindMandiScreen
            initialCrop={screenParams.crop || 'Wheat'}
            onBack={goBack}
            onNavigate={(screen, params) => navigate(screen, params)}
          />
        );

      case 'MandiMap':
        return (
          <MandiMapScreen
            onBack={goBack}
            onNavigate={(screen, params) => navigate(screen, params)}
          />
        );

      case 'MandiDetail':
        return (
          <MandiDetailScreen
            mandi={screenParams.mandi || mandis[0]}
            crop={screenParams.crop || 'Wheat'}
            onBack={goBack}
            onBookSlot={() => navigate('BookSlot', { mandi: screenParams.mandi || mandis[0] })}
          />
        );

      case 'PriceTrends':
        return (
          <PriceTrendsScreen
            initialCrop={screenParams.crop || 'Wheat'}
            onBack={goBack}
            onViewComparison={() => navigate('ComparePrices')}
          />
        );

      case 'ComparePrices':
        return (
          <ComparePricesScreen
            onBack={goBack}
            onViewTrends={() => navigate('PriceTrends')}
          />
        );

      case 'BookSlot':
        return (
          <BookSlotScreen
            mandiName={screenParams.mandi?.name || 'Azadpur Mandi'}
            onBack={goBack}
            onConfirm={(booking) => navigate('BookingConfirmed', { booking })}
          />
        );

      case 'BookingConfirmed':
        return (
          <BookingConfirmedScreen
            booking={screenParams.booking || activeBooking}
            onViewGatePass={() => navigate('GatePass')}
            onGoHome={() => navigate('Home')}
          />
        );

      case 'GatePass':
        return <GatePassScreen onBack={goBack} />;

      case 'Queue':
      case 'LiveQueue':
        return (
          <LiveQueueScreen
            onBack={goBack}
            onReschedule={() => navigate('ManageBooking')}
            onNavigate={(screen) => navigate(screen)}
          />
        );

      case 'ManageBooking':
        return (
          <ManageBookingScreen
            onBack={goBack}
            onConfirmReschedule={() => navigate('LiveQueue')}
          />
        );

      case 'SaleRecord':
        return (
          <SaleRecordScreen
            onBack={goBack}
            onViewPayments={() => navigate('Payments')}
          />
        );

      case 'Payments':
        return <PaymentsScreen onNavigate={(screen) => navigate(screen)} />;

      case 'Grievance':
        return (
          <GrievanceScreen
            onBack={goBack}
            onNavigate={(screen) => navigate(screen)}
          />
        );

      case 'Profile':
        return (
          <ProfileScreen
            onNavigate={(screen) => navigate(screen)}
            onLogout={() => navigate('LanguageSelect')}
          />
        );

      case 'Settings':
        return <SettingsScreen onBack={goBack} onNavigate={(screen) => navigate(screen)} />;

      default:
        return <HomeScreen onNavigate={(screen, params) => navigate(screen, params)} />;
    }
  };

  const isPostRegistration = !AUTH_REGISTRATION_SCREENS.includes(currentScreen);

  return (
    <View style={styles.container}>
      {renderScreen()}
      {isPostRegistration && <AIChatbotFloatingButton onNavigate={navigate} />}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar barStyle="dark-content" />
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

