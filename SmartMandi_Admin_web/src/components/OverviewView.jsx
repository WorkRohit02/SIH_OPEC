import React, { useState } from 'react';
import { 
  Users, 
  Store, 
  IndianRupee, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight,
  Clock,
  ChevronDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function OverviewView({ 
  stats, 
  footfallData, 
  liveQueue, 
  recentGrievances, 
  onNavigate 
}) {
  const [timeRange, setTimeRange] = useState('Last 7 days');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '2px' }}>
            Monday, 12 June 2024 · 10:30 AM
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Admin Dashboard
          </h1>
        </div>
        <div style={{
          background: 'white',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></span>
          OPEC Network
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px'
      }}>
        
        {/* Card 1: Total Farmers */}
        <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Total Farmers Registered
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#ECFDF5',
              color: '#047857',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {stats.totalFarmers.value}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> {stats.totalFarmers.change}
          </div>
        </div>

        {/* Card 2: Active Mandis */}
        <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Active Mandis
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#ECFDF5',
              color: '#047857',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Store size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {stats.activeMandis.value}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> {stats.activeMandis.change}
          </div>
        </div>

        {/* Card 3: Today's Volume */}
        <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Today's Transaction Volume
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#FEF3C7',
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IndianRupee size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {stats.todayVolume.value}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> {stats.todayVolume.change}
          </div>
        </div>

        {/* Card 4: Open Grievances */}
        <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Open Grievances
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#FEE2E2',
              color: '#B91C1C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertCircle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {stats.openGrievances.value}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#B91C1C', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> {stats.openGrievances.change}
          </div>
        </div>

      </div>

      {/* Main Graph Card: Mandi-wise Footfall Trend */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Mandi-wise Footfall Trend
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Daily visitors across active mandis
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              style={{
                padding: '8px 32px 8px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                background: 'white',
                cursor: 'pointer',
                appearance: 'none'
              }}
            >
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="This Month">This Month</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '12px', pointerEvents: 'none', color: '#6B7280' }} />
          </div>
        </div>

        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={footfallData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE6" vertical={false} />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: 'white', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="overall" 
                stroke="#10B981" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 7 }} 
                name="Overall Footfall"
              />
              <Line 
                type="monotone" 
                dataKey="registered" 
                stroke="#F97316" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#F97316', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 7 }} 
                name="Registered Farmers"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid: Live Queue Status & Recent Grievances */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        
        {/* Live Queue Status Widget */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Live Queue Status</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current waiting farmers by mandi</p>
              </div>
              <span className="badge badge-good" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span> Live
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
              {liveQueue.map((item) => (
                <div key={item.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <strong>{item.farmers} farmers</strong> · {item.waitTime}
                    </span>
                  </div>
                  <div className="progress-container">
                    <div 
                      className={`progress-bar ${item.capacity > 85 ? 'progress-critical' : item.capacity > 65 ? 'progress-busy' : 'progress-good'}`}
                      style={{ width: `${item.capacity}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onNavigate('queue')}
            style={{
              marginTop: '20px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-light)',
              color: 'var(--primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            View queue details <ArrowRight size={15} />
          </button>
        </div>

        {/* Recent Grievances Widget */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Recent Grievances</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Latest tickets requiring review</p>
              </div>
              <button 
                onClick={() => onNavigate('grievances')}
                style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                View all <ArrowRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentGrievances.map((g) => (
                <div 
                  key={g.id}
                  onClick={() => onNavigate('grievances')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#D1FAE5',
                      color: '#047857',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {g.farmer.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{g.farmer}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {g.mandi} · <span style={{ color: 'var(--primary)', fontWeight: 600 }}>#{g.id}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`badge ${
                    g.status === 'Resolved' ? 'badge-good' : g.status === 'Escalated' ? 'badge-critical' : 'badge-busy'
                  }`}>
                    {g.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
