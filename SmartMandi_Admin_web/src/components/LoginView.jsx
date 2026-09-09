import React, { useState } from 'react';
import opecLogo from '../assets/opec_logo.png';
import { 
  Lock, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  KeyRound, 
  CheckCircle2, 
  Zap,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function LoginView({ onLoginSuccess, showToast }) {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' | 'email'
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('123456');
  const [email, setEmail] = useState('anita.kapoor@smartmandi.gov.in');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Super Admin');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userProfile = {
        name: selectedRole === 'Super Admin' ? 'Anita Kapoor' : selectedRole === 'Regional Manager' ? 'Rahul Kapoor' : 'Anita Sharma',
        role: selectedRole,
        email: email,
        avatar: selectedRole === 'Super Admin' ? 'AK' : selectedRole === 'Regional Manager' ? 'RK' : 'AS'
      };
      showToast(`Welcome back, ${userProfile.name}! Signed in as ${selectedRole}`, 'success');
      onLoginSuccess(userProfile);
    }, 600);
  };

  // Quick Demo Shortcut Login
  const handleQuickDemoLogin = (roleName, adminName, initials) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userProfile = {
        name: adminName,
        role: roleName,
        email: `${adminName.toLowerCase().replace(' ', '.')}@smartmandi.gov.in`,
        avatar: initials
      };
      showToast(`Quick Login active: Logged in as ${adminName} (${roleName})`, 'success');
      onLoginSuccess(userProfile);
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F7F5F0 0%, #EBF7EE 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      fontFamily: 'var(--font-family)'
    }}>

      {/* Main Authentication Container */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color)',
        width: '100%',
        maxWidth: '1020px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
        overflow: 'hidden'
      }}>

        {/* Left Side: Brand Visual Banner */}
        <div style={{
          background: 'linear-gradient(145deg, #00B060 0%, #047857 100%)',
          color: 'white',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          {/* Subtle Background Geometry */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            pointerEvents: 'none'
          }} />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
              <img 
                src={opecLogo} 
                alt="OPEC Logo" 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              />
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.1 }}>OPEC</h2>
                <p style={{ fontSize: '0.75rem', opacity: 0.9, letterSpacing: '0.04em' }}>NATIONAL AGRICULTURAL PORTAL</p>
              </div>
            </div>

            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, leading: 1.2, marginBottom: '16px' }}>
              Unified Mandi Operations & Governance Console
            </h1>
            <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '32px' }}>
              Manage real-time queue slots, verify farmer land credentials, publish MSP commodity rates, and resolve farmer grievances across 48+ active mandis.
            </p>

            {/* Live Stats Ticker Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Registered Farmers</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '2px' }}>24,680+</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Active Operations</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '2px' }}>48 Mandis</div>
              </div>
            </div>
          </div>

          {/* Footer Security Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.78rem', opacity: 0.85, marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} /> NIC Security Certified
            </div>
            <span>•</span>
            <div>AgriStack Integrated</div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div style={{ padding: '44px 38px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Sign In to Admin Portal
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Select your authorization level and credentials to proceed.
            </p>
          </div>

          {/* Role Pill Selector */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.04em' }}>
              Select Admin Role
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '6px',
              background: 'var(--bg-subtle)',
              padding: '4px',
              borderRadius: '10px',
              border: '1px solid var(--border-color)'
            }}>
              {['Super Admin', 'Regional Manager', 'Inspector'].map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '7px',
                    fontSize: '0.75rem',
                    fontWeight: selectedRole === role ? 700 : 500,
                    background: selectedRole === role ? 'white' : 'transparent',
                    color: selectedRole === role ? 'var(--primary)' : 'var(--text-muted)',
                    boxShadow: selectedRole === role ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Login Method Toggle: Phone OTP vs Email Password */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              style={{
                fontSize: '0.85rem',
                fontWeight: loginMethod === 'phone' ? 700 : 500,
                color: loginMethod === 'phone' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: loginMethod === 'phone' ? '2px solid var(--primary)' : 'none',
                paddingBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Phone size={15} /> Mobile + OTP
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              style={{
                fontSize: '0.85rem',
                fontWeight: loginMethod === 'email' ? 700 : 500,
                color: loginMethod === 'email' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: loginMethod === 'email' ? '2px solid var(--primary)' : 'none',
                paddingBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Mail size={15} /> Email + Password
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {loginMethod === 'phone' ? (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    Registered Mobile Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>+91</span>
                    <input 
                      type="text" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 48px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Enter 6-Digit OTP</label>
                    <button type="button" style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Resend OTP</button>
                  </div>
                  <input 
                    type="text" 
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.875rem',
                      letterSpacing: '0.3em',
                      fontWeight: 700,
                      textAlign: 'center'
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    Government Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Password</label>
                    <a href="#forgot" style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Forgot Password?</a>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 38px 10px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.875rem'
                      }}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '12px', top: '10px', color: '#9CA3AF' }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span style={{ color: 'var(--text-muted)' }}>Keep me signed in for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: 'var(--primary)',
                color: 'white',
                fontSize: '0.925rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 176, 96, 0.3)',
                marginTop: '6px'
              }}
            >
              {isLoading ? 'Authenticating...' : (
                <>Sign In to Console <ArrowRight size={17} /></>
              )}
            </button>
          </form>

          {/* Quick Demo Login One-Click Section */}
          <div style={{
            marginTop: '24px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>
              <Zap size={13} color="#F59E0B" /> QUICK DEMO ONE-CLICK LOGIN
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Super Admin', 'Anita Kapoor', 'AK')}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  borderRadius: '8px',
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#047857',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  justifyContent: 'center'
                }}
              >
                Anita Kapoor (Super Admin)
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Regional Manager', 'Rahul Kapoor', 'RK')}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  borderRadius: '8px',
                  background: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  color: '#B45309',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  justifyContent: 'center'
                }}
              >
                Rahul Kapoor (Ghazipur Mgr)
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
