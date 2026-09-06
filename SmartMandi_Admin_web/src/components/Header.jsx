import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  UserCheck, 
  Clock, 
  MessageSquare, 
  Bell, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Sidebar as SidebarIcon,
  PanelTop,
  BarChart3,
  ShieldAlert,
  Settings,
  Sprout
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  layoutMode, 
  setLayoutMode, 
  unreadNotifications, 
  setUnreadNotifications,
  onOpenSearch,
  currentUser,
  onLogout
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Queue Capacity Alert', desc: 'Ghazipur Mandi is at 86% capacity load', time: '10m ago', type: 'warning' },
    { id: 2, title: 'New Verification Request', desc: 'Ramesh Kumar submitted land document', time: '25m ago', type: 'info' },
    { id: 3, title: 'Grievance Escalated', desc: 'GRV-1046 (Meena Devi) marked as escalated', time: '1h ago', type: 'danger' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'crops', label: 'Crops Hub', icon: Sprout },
    { id: 'mandis', label: 'Mandi Management', icon: MapPin },
    { id: 'verification', label: 'Farmer Verification', icon: UserCheck },
    { id: 'queue', label: 'Live Queue', icon: Clock },
    { id: 'grievances', label: 'Grievances', icon: MessageSquare },
    { id: 'pricing', label: 'Pricing & MSP', icon: SlidersHorizontal },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'audit', label: 'Audit Trail', icon: ShieldAlert }
  ];

  // Map activeTab to display title in sidebar mode
  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label || 'Admin Portal';

  return (
    <header className="header-container" style={{
      background: 'white',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      width: '100%'
    }}>
      <div style={{
        width: '100%',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px'
      }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 10px rgba(0, 176, 96, 0.3)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', leading: 1.1 }}>
              Smart Mandi
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.02em' }}>
              Admin Console
            </div>
          </div>
        </div>

        {/* Top Nav Tabs (Visible in Top Navigation Mode) */}
        {layoutMode === 'topnav' ? (
          <nav style={{
            display: 'flex',
            gap: '4px',
            height: '100%',
            alignItems: 'center',
            overflowX: 'auto',
            padding: '0 12px'
          }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    height: '38px',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} color={isActive ? 'var(--primary)' : '#6B7280'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        ) : (
          /* Search Bar & Section Breadcrumb in Sidebar Mode */
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, maxWidth: '480px', margin: '0 24px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Search mandis, farmers, tickets..."
                onClick={onOpenSearch}
                readOnly
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.825rem',
                  background: 'var(--bg-subtle)',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        )}

        {/* Right Section Actions & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          
          {/* Layout Mode Toggle (TopNav vs Sidebar) */}
          <button 
            title={layoutMode === 'topnav' ? "Switch to Left Sidebar Layout" : "Switch to Top Navigation Tabs"}
            onClick={() => setLayoutMode(layoutMode === 'topnav' ? 'sidebar' : 'topnav')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#047857',
              cursor: 'pointer'
            }}
          >
            {layoutMode === 'topnav' ? <SidebarIcon size={14} /> : <PanelTop size={14} />}
            <span>{layoutMode === 'topnav' ? 'Sidebar Mode' : 'Top Nav Mode'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setUnreadNotifications(0);
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <Bell size={17} />
              {unreadNotifications > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#EF4444',
                  border: '2px solid white'
                }} />
              )}
            </button>

            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '320px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-color)',
                padding: '16px',
                zIndex: 200,
                animation: 'slideUp 0.15s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Notifications</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Mark all read</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'var(--bg-subtle)',
                      display: 'flex',
                      gap: '10px',
                      fontSize: '0.8rem'
                    }}>
                      {n.type === 'warning' ? <AlertTriangle size={16} color="#F59E0B" /> : <CheckCircle2 size={16} color="#10B981" />}
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{n.title}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{n.desc}</div>
                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '4px' }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '20px',
                transition: 'background 0.15s ease'
              }}
            >
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#D1FAE5',
                color: '#047857',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: '1px solid #A7F3D0'
              }}>
                {currentUser?.avatar || 'AK'}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>{currentUser?.name || 'Anita Kapoor'}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{currentUser?.role || 'Administrator'}</div>
              </div>
              <ChevronDown size={14} color="#6B7280" />
            </div>

            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '190px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-color)',
                padding: '8px 0',
                zIndex: 200
              }}>
                <div style={{ padding: '8px 16px', fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid #F3F4F6' }}>
                  Signed in as <strong>{currentUser?.name || 'Anita Kapoor'}</strong>
                </div>
                <button 
                  onClick={() => {
                    setActiveTab('settings');
                    setShowUserMenu(false);
                  }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 16px', fontSize: '0.85rem', color: 'var(--text-main)' }}
                >
                  Profile Settings
                </button>
                <button 
                  onClick={onLogout}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 16px', fontSize: '0.85rem', color: '#EF4444', fontWeight: 600 }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
