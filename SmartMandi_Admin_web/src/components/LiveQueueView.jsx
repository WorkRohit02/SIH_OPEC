import React, { useState } from 'react';
import { 
  AlertTriangle, 
  X, 
  Clock, 
  ArrowUpDown, 
  Download, 
  Plus, 
  CheckCircle2, 
  BarChart2, 
  ChevronDown
} from 'lucide-react';

export default function LiveQueueView({ queue, setQueue, showToast }) {
  const [showAlert, setShowAlert] = useState(true);
  const [selectedMandi, setSelectedMandi] = useState('All Mandis');
  const [isLiveActive, setIsLiveActive] = useState(true);

  // Mandi Cards Summary
  const mandiCards = [
    {
      id: 1,
      name: 'Azadpur Mandi',
      region: 'North Delhi',
      status: 'Healthy',
      waiting: 38,
      capacity: 45,
      avgWait: '~20 min',
      color: '#10B981'
    },
    {
      id: 2,
      name: 'Ghazipur Mandi',
      region: 'East Delhi',
      status: 'High load',
      waiting: 86,
      capacity: 86,
      avgWait: '~55 min',
      color: '#F59E0B'
    },
    {
      id: 3,
      name: 'Narela Mandi',
      region: 'North West Delhi',
      status: 'Healthy',
      waiting: 24,
      capacity: 31,
      avgWait: '~15 min',
      color: '#10B981'
    }
  ];

  // Advance / Change Slot Status
  const handleStatusChange = (id, newStatus) => {
    setQueue(prev => prev.map(item => {
      if (item.id === id) {
        showToast(`Slot #${item.position} (${item.name}) updated to ${newStatus}`, 'success');
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  const handleExportQueue = () => {
    showToast("Exported Live Queue slots data to CSV", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Operations control center</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Live Queue Monitor</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Mandi Selector */}
          <select 
            value={selectedMandi}
            onChange={(e) => setSelectedMandi(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="All Mandis">All Mandis</option>
            <option value="Azadpur Mandi">Azadpur Mandi</option>
            <option value="Ghazipur Mandi">Ghazipur Mandi</option>
            <option value="Narela Mandi">Narela Mandi</option>
          </select>

          {/* Live Switch Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'white',
            border: '1px solid var(--border-color)',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isLiveActive ? '#10B981' : '#9CA3AF'
            }}></span>
            <span>Live</span>
            <label className="switch" style={{ width: '32px', height: '18px' }}>
              <input 
                type="checkbox" 
                checked={isLiveActive} 
                onChange={(e) => setIsLiveActive(e.target.checked)} 
              />
              <span className="slider" style={{ borderRadius: '18px' }}></span>
            </label>
          </div>

        </div>
      </div>

      {/* Alert Banner (Exceeding Capacity Alert) */}
      {showAlert && (
        <div style={{
          background: '#FEF3C7',
          border: '1px solid #FDE68A',
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#F59E0B',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#B45309' }}>
                Ghazipur Mandi queue exceeding capacity
              </div>
              <div style={{ fontSize: '0.8rem', color: '#92400E' }}>
                Queue is at 86% capacity. Consider reassigning upcoming slots to Azadpur Mandi.
              </div>
            </div>
          </div>
          <button onClick={() => setShowAlert(false)} style={{ color: '#B45309' }}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Mandi Cards Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {mandiCards.map(mandi => (
          <div key={mandi.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{mandi.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mandi.region}</span>
              </div>
              <span className={`badge ${mandi.status === 'Healthy' ? 'badge-good' : 'badge-busy'}`}>
                {mandi.status}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '12px 0 6px 0' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>{mandi.waiting}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>farmers waiting</span>
              <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: '0.85rem', color: mandi.color }}>
                {mandi.capacity}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="progress-container" style={{ marginBottom: '12px' }}>
              <div 
                className={`progress-bar ${mandi.capacity > 80 ? 'progress-busy' : 'progress-good'}`}
                style={{ width: `${mandi.capacity}%` }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Average wait: <strong style={{ color: 'var(--text-main)' }}>{mandi.avgWait}</strong></span>
              
              {/* Signal Bar Visualizer Graphic */}
              <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
                <span style={{ width: '3px', height: '6px', background: mandi.color, borderRadius: '1px' }}></span>
                <span style={{ width: '3px', height: '9px', background: mandi.color, borderRadius: '1px' }}></span>
                <span style={{ width: '3px', height: '12px', background: mandi.color, borderRadius: '1px' }}></span>
                <span style={{ width: '3px', height: '14px', background: mandi.capacity > 80 ? '#E5E7EB' : mandi.color, borderRadius: '1px' }}></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Queue Entries Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Queue entries</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Manage individual farmer slots across mandis
            </p>
          </div>

          <button 
            onClick={handleExportQueue}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'white',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <Download size={15} /> Export
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Farmer Name</th>
                <th>Slot Time</th>
                <th>Position Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {queue.map(entry => (
                <tr key={entry.id}>
                  <td>
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
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{entry.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{entry.mandi}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ fontWeight: 600 }}>
                    {entry.slotTime}
                  </td>

                  <td>
                    <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{entry.position}</span>
                  </td>

                  <td>
                    <span className={`badge ${
                      entry.status === 'In Progress' ? 'badge-good' : entry.status === 'Completed' ? 'badge-info' : 'badge-busy'
                    }`}>
                      {entry.status}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {entry.status === 'Waiting' && (
                        <button
                          onClick={() => handleStatusChange(entry.id, 'In Progress')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: 'var(--primary)',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}
                        >
                          Call Slot
                        </button>
                      )}

                      {entry.status === 'In Progress' && (
                        <button
                          onClick={() => handleStatusChange(entry.id, 'Completed')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: '#3B82F6',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}
                        >
                          Complete
                        </button>
                      )}

                      <button 
                        style={{ padding: '6px', color: 'var(--text-muted)', cursor: 'pointer' }}
                        title="Reorder position"
                        onClick={() => showToast(`Shifted position for ${entry.name}`, 'info')}
                      >
                        <ArrowUpDown size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
