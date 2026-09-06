import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Plus, 
  Edit2, 
  Key, 
  Check, 
  Save, 
  Smartphone, 
  BellRing,
  Globe
} from 'lucide-react';
import { SYSTEM_ADMIN_USERS } from '../data/mockData';

export default function SettingsView({ showToast }) {
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'hours' | 'sms' | 'security'
  const [adminUsers, setAdminUsers] = useState(SYSTEM_ADMIN_USERS);

  const [operatingConfig, setOperatingConfig] = useState({
    openTime: '08:00',
    closeTime: '18:00',
    maxSlotPerHour: 60,
    autoApproveVerified: true,
    emergencyPause: false
  });

  const [notificationConfig, setNotificationConfig] = useState({
    smsFarmerApproval: true,
    whatsappQueueUpdates: true,
    smsCapacityWarning: true,
    emailDailyDigest: false
  });

  const toggleUserStatus = (userId) => {
    setAdminUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`User ${u.name} set to ${nextStatus}`, 'success');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleSaveSettings = () => {
    showToast("System configuration and operating rules saved!", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>System Governance</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Settings & Control Panel</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Configure administrative permissions, operating hours, notification gateways, and system rules.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--primary)',
            color: 'white',
            padding: '10px 18px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.875rem',
            boxShadow: '0 4px 12px rgba(0, 176, 96, 0.25)'
          }}
        >
          <Save size={18} /> Save Settings
        </button>
      </div>

      {/* Settings Sub-Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        {[
          { id: 'users', label: 'Admin Users & Roles', icon: Users },
          { id: 'hours', label: 'Mandi Operating Hours', icon: Clock },
          { id: 'sms', label: 'SMS & WhatsApp Gateway', icon: MessageSquare },
          { id: 'security', label: 'Security & Auth', icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                background: isActive ? 'var(--primary-light)' : 'transparent',
                borderBottom: isActive ? '2px solid var(--primary)' : 'none'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Admin Users & Roles */}
      {activeTab === 'users' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Authorized Portal Administrators</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Manage team accounts and mandi-level access permissions</p>
            </div>

            <button
              onClick={() => showToast("Invite Admin dialog opened", "info")}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'var(--primary)',
                color: 'white',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              <Plus size={15} /> Invite New Admin
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Administrator</th>
                  <th>Role</th>
                  <th>Assigned Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          background: '#D1FAE5',
                          color: '#047857',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {user.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{user.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`badge ${user.role === 'Super Admin' ? 'badge-good' : 'badge-info'}`}>
                        {user.role}
                      </span>
                    </td>

                    <td style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      {user.mandi}
                    </td>

                    <td>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={user.status === 'Active'} 
                          onChange={() => toggleUserStatus(user.id)} 
                        />
                        <span className="slider"></span>
                      </label>
                    </td>

                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => showToast(`Editing role for ${user.name}`, 'info')}
                          style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}
                        >
                          Edit Role
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Mandi Operating Hours */}
      {activeTab === 'hours' && (
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Mandi Gate Operating Schedule & Slots</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Gate Opening Time</label>
              <input 
                type="time" 
                value={operatingConfig.openTime}
                onChange={(e) => setOperatingConfig({ ...operatingConfig, openTime: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Gate Closing Time</label>
              <input 
                type="time" 
                value={operatingConfig.closeTime}
                onChange={(e) => setOperatingConfig({ ...operatingConfig, closeTime: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Maximum Farmers Slot Capacity Per Hour</label>
            <input 
              type="number" 
              value={operatingConfig.maxSlotPerHour}
              onChange={(e) => setOperatingConfig({ ...operatingConfig, maxSlotPerHour: parseInt(e.target.value, 10) })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Auto-Approve Verified Farmers for Token Generation</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Farmers with verified land records instantly get queue slots without manual inspector review</div>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={operatingConfig.autoApproveVerified} 
                onChange={(e) => setOperatingConfig({ ...operatingConfig, autoApproveVerified: e.target.checked })} 
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications Gateway */}
      {activeTab === 'sms' && (
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Automated SMS & WhatsApp Messaging Rules</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>SMS Alert on Farmer Verification Approval</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Send SMS to farmer's mobile with verification status link</div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notificationConfig.smsFarmerApproval} 
                  onChange={(e) => setNotificationConfig({ ...notificationConfig, smsFarmerApproval: e.target.checked })} 
                />
                <span className="slider"></span>
              </label>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>WhatsApp Live Queue Token Updates</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Notify farmer when their queue slot is 5 position away</div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notificationConfig.whatsappQueueUpdates} 
                  onChange={(e) => setNotificationConfig({ ...notificationConfig, whatsappQueueUpdates: e.target.checked })} 
                />
                <span className="slider"></span>
              </label>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Mandi Overload SMS Warnings to Drivers</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Broadcast delay advisories when mandi capacity exceeds 85%</div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notificationConfig.smsCapacityWarning} 
                  onChange={(e) => setNotificationConfig({ ...notificationConfig, smsCapacityWarning: e.target.checked })} 
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Security & Auth */}
      {activeTab === 'security' && (
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Security, SSO & Encryption Settings</h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            System uses 256-bit AES Encryption with UIDAI AgriStack Authentication protocols.
          </p>

          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: 800, color: '#047857', fontSize: '0.9rem' }}>Two-Factor Authentication (2FA) Required for All Admins</div>
            <div style={{ fontSize: '0.8rem', color: '#065F46', marginTop: '2px' }}>
              OTP authentication is mandatorily enforced on every government login session.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
