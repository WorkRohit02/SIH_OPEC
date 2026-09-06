import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  Clock, 
  MessageSquare,
  Tag, 
  BarChart3, 
  Settings, 
  ShieldAlert,
  HelpCircle,
  ArrowUpRight,
  Sprout
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crops', label: 'Crops Hub', icon: Sprout },
    { id: 'mandis', label: 'Mandis', icon: MapPin },
    { id: 'verification', label: 'Farmers Queue', icon: Users },
    { id: 'queue', label: 'Live Queue', icon: Clock },
    { id: 'grievances', label: 'Grievances', icon: MessageSquare },
    { id: 'pricing', label: 'Pricing & MSP', icon: Tag },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'audit', label: 'Audit Logs', icon: ShieldAlert },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  return (
    <aside style={{
      width: '240px',
      background: 'white',
      borderRight: '1px solid var(--border-color)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'sticky',
      top: '68px',
      height: 'calc(100vh - 68px)',
      overflowY: 'auto',
      flexShrink: 0,
      zIndex: 90
    }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 12px 12px 12px' }}>
          Main Navigation
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  transition: 'background 0.15s ease',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} color={isActive ? 'var(--primary)' : '#6B7280'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Support Card Widget */}
      <div style={{
        background: '#ECFDF5',
        border: '1px solid #A7F3D0',
        borderRadius: '14px',
        padding: '16px',
        marginTop: '24px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          marginBottom: '10px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <HelpCircle size={18} />
        </div>
        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#047857', marginBottom: '4px' }}>
          Need help?
        </div>
        <div style={{ fontSize: '0.75rem', color: '#065F46', marginBottom: '12px', leading: 1.3 }}>
          Our support team is here for you 24/7.
        </div>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--primary)',
          cursor: 'pointer'
        }}>
          Contact support <ArrowUpRight size={14} />
        </button>
      </div>
    </aside>
  );
}
