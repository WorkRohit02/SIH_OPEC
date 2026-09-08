import React, { createContext, useContext, useState } from 'react';
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
