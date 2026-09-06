import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';

import LoginView from './components/LoginView';
import OverviewView from './components/OverviewView';
import MandiManagementView from './components/MandiManagementView';
import FarmerVerificationView from './components/FarmerVerificationView';
import LiveQueueView from './components/LiveQueueView';
import GrievancesView from './components/GrievancesView';
import PricingView from './components/PricingView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';
import AuditLogsView from './components/AuditLogsView';
import CropsView from './components/CropsView';

import DocumentModal from './components/DocumentModal';
import AddMandiModal from './components/AddMandiModal';

import { 
  INITIAL_OVERVIEW_STATS, 
  FOOTFALL_TREND_DATA, 
  LIVE_QUEUE_SUMMARY, 
  RECENT_GRIEVANCES_OVERVIEW,
  INITIAL_MANDIS, 
  INITIAL_FARMERS, 
  INITIAL_LIVE_QUEUE, 
  INITIAL_GRIEVANCES 
} from './data/mockData';

export default function App() {
  // Authentication & Session State (Starts on Login page)
  const [currentUser, setCurrentUser] = useState(null);

  // Global View Navigation State (Default to Left Sidebar Layout)
  const [activeTab, setActiveTab] = useState('overview');
  const [layoutMode, setLayoutMode] = useState('sidebar');

  // Data Collections
  const [stats, setStats] = useState(INITIAL_OVERVIEW_STATS);
  const [mandis, setMandis] = useState(INITIAL_MANDIS);
  const [farmers, setFarmers] = useState(INITIAL_FARMERS);
  const [queue, setQueue] = useState(INITIAL_LIVE_QUEUE);
  const [grievances, setGrievances] = useState(INITIAL_GRIEVANCES);

  // Modals & UI Controls
  const [selectedDocFarmer, setSelectedDocFarmer] = useState(null);
  const [showAddMandiModal, setShowAddMandiModal] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const newToast = { id: Date.now(), message, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4000);
  };

  const handleDismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Farmer Actions
  const handleApproveFarmer = (farmerId) => {
    setFarmers(prev => prev.map(f => f.id === farmerId ? { ...f, status: 'Verified' } : f));
    const target = farmers.find(f => f.id === farmerId);
    showToast(`Approved & Verified farmer application for ${target?.name || 'Farmer'}`, 'success');
  };

  const handleRejectFarmer = (farmerId) => {
    setFarmers(prev => prev.map(f => f.id === farmerId ? { ...f, status: 'Rejected' } : f));
    const target = farmers.find(f => f.id === farmerId);
    showToast(`Rejected verification application for ${target?.name || 'Farmer'}`, 'error');
  };

  // Mandi Addition
  const handleAddMandi = (newMandi) => {
    setMandis(prev => [newMandi, ...prev]);
    showToast(`Successfully added new mandi location "${newMandi.name}"`, 'success');
  };

  // If user logged out, render Login screen
  if (!currentUser) {
    return (
      <>
        <LoginView 
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setActiveTab('overview');
          }}
          showToast={showToast}
        />
        <Toast toasts={toasts} onDismiss={handleDismissToast} />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        unreadNotifications={unreadNotifications}
        setUnreadNotifications={setUnreadNotifications}
        onOpenSearch={() => showToast('Global Search: Type any mandi, ticket, or farmer name', 'info')}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Logged out of Smart Mandi Console', 'info');
        }}
      />

      {/* Main Content Layout Container */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        flex: 1,
        maxWidth: layoutMode === 'topnav' ? '1440px' : '100%',
        width: '100%',
        margin: layoutMode === 'topnav' ? '0 auto' : '0'
      }}>

        {/* Sidebar Nav */}
        {layoutMode === 'sidebar' && (
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {/* Dynamic Main Workspace Area */}
        <main style={{
          flex: 1,
          padding: '28px 24px 60px 24px',
          width: '100%'
        }}>
          
          {activeTab === 'overview' && (
            <OverviewView 
              stats={stats}
              footfallData={FOOTFALL_TREND_DATA}
              liveQueue={LIVE_QUEUE_SUMMARY}
              recentGrievances={RECENT_GRIEVANCES_OVERVIEW}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'crops' && (
            <CropsView 
              onNavigate={(tab) => setActiveTab(tab)}
              showToast={showToast}
            />
          )}

          {activeTab === 'mandis' && (
            <MandiManagementView 
              mandis={mandis}
              setMandis={setMandis}
              onOpenAddModal={() => setShowAddMandiModal(true)}
              showToast={showToast}
            />
          )}

          {activeTab === 'verification' && (
            <FarmerVerificationView 
              farmers={farmers}
              onApprove={handleApproveFarmer}
              onReject={handleRejectFarmer}
              onViewDoc={(farmer) => setSelectedDocFarmer(farmer)}
              showToast={showToast}
            />
          )}

          {activeTab === 'queue' && (
            <LiveQueueView 
              queue={queue}
              setQueue={setQueue}
              showToast={showToast}
            />
          )}

          {activeTab === 'grievances' && (
            <GrievancesView 
              grievances={grievances}
              setGrievances={setGrievances}
              showToast={showToast}
            />
          )}

          {activeTab === 'pricing' && (
            <PricingView showToast={showToast} />
          )}

          {activeTab === 'reports' && (
            <ReportsView showToast={showToast} />
          )}

          {activeTab === 'settings' && (
            <SettingsView showToast={showToast} />
          )}

          {activeTab === 'audit' && (
            <AuditLogsView showToast={showToast} />
          )}

        </main>

      </div>

      {/* Document Review Modal */}
      {selectedDocFarmer && (
        <DocumentModal 
          farmer={selectedDocFarmer}
          onClose={() => setSelectedDocFarmer(null)}
          onApprove={handleApproveFarmer}
          onReject={handleRejectFarmer}
        />
      )}

      {/* Add Mandi Modal */}
      {showAddMandiModal && (
        <AddMandiModal 
          onClose={() => setShowAddMandiModal(false)}
          onAddMandi={handleAddMandi}
        />
      )}

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

    </div>
  );
}
