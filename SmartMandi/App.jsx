import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
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
  const [screenParams, setScreenParams] = useState({});
  const [mobileNumber, setMobileNumber] = useState('');
  const { mandis, activeBooking } = useApp();

  const navigate = (screen, params) => {
    if (params) setScreenParams(params);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LanguageSelect':
        return <LanguageSelectScreen onNext={() => navigate('MobileLogin')} />;

      case 'MobileLogin':
        return (
          <MobileLoginScreen
            onBack={() => navigate('LanguageSelect')}
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
            onBack={() => navigate('MobileLogin')}
            onVerify={() => navigate('RegistrationStep1')}
          />
        );

      case 'RegistrationStep1':
        return (
          <RegistrationStep1Screen
            onNext={() => navigate('RegistrationStep3')}
            onBack={() => navigate('MobileLogin')}
          />
        );

      case 'RegistrationStep3':
        return (
          <RegistrationStep3Screen
            onSubmit={() => navigate('RegistrationSuccess')}
            onBack={() => navigate('RegistrationStep1')}
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

      case 'FindMandi':
        return (
          <FindMandiScreen
            initialCrop={screenParams.crop || 'Wheat'}
            onBack={() => navigate('Home')}
            onNavigate={(screen, params) => navigate(screen, params)}
          />
        );

      case 'MandiMap':
        return (
          <MandiMapScreen
            onBack={() => navigate('FindMandi')}
            onNavigate={(screen, params) => navigate(screen, params)}
          />
        );

      case 'MandiDetail':
        return (
          <MandiDetailScreen
            mandi={screenParams.mandi || mandis[0]}
            crop={screenParams.crop || 'Wheat'}
            onBack={() => navigate('Home')}
            onBookSlot={() => navigate('BookSlot', { mandi: screenParams.mandi || mandis[0] })}
          />
        );

      case 'PriceTrends':
        return (
          <PriceTrendsScreen
            initialCrop={screenParams.crop || 'Wheat'}
            onBack={() => navigate('Home')}
            onViewComparison={() => navigate('ComparePrices')}
          />
        );

      case 'ComparePrices':
        return (
          <ComparePricesScreen
            onBack={() => navigate('PriceTrends')}
            onViewTrends={() => navigate('PriceTrends')}
          />
        );

      case 'BookSlot':
        return (
          <BookSlotScreen
            mandiName={screenParams.mandi?.name || 'Azadpur Mandi'}
            onBack={() => navigate('Home')}
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
        return <GatePassScreen onBack={() => navigate('Home')} />;

      case 'LiveQueue':
        return (
          <LiveQueueScreen
            onBack={() => navigate('Home')}
            onReschedule={() => navigate('ManageBooking')}
          />
        );

      case 'ManageBooking':
        return (
          <ManageBookingScreen
            onBack={() => navigate('LiveQueue')}
            onConfirmReschedule={() => navigate('LiveQueue')}
          />
        );

      case 'SaleRecord':
        return (
          <SaleRecordScreen
            onBack={() => navigate('Payments')}
            onViewPayments={() => navigate('Payments')}
          />
        );

      case 'Payments':
        return <PaymentsScreen onNavigate={(screen) => navigate(screen)} />;

      case 'Grievance':
        return (
          <GrievanceScreen
            onBack={() => navigate('Home')}
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
        return <SettingsScreen onBack={() => navigate('Profile')} />;

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
