import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Building2, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function MandiManagementView({ mandis, setMandis, onOpenAddModal, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All mandis');
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle active status for a Mandi
  const toggleMandiStatus = (id) => {
    setMandis(prev => prev.map(m => {
      if (m.id === id) {
        const nextState = !m.active;
        showToast(`Mandi ${m.name} is now ${nextState ? 'Active' : 'Offline'}`, 'success');
        return { ...m, active: nextState };
      }
      return m;
    }));
  };

  // Export List as CSV
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Name,Location,Capacity,LiveAvgPrice,TodayFootfall,Active"].join(",") + "\n"
      + mandis.map(m => `"${m.id}","${m.name}","${m.location}","${m.capacity}%","${m.liveAvgPrice}","${m.todayFootfall}","${m.active}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SmartMandi_Locations_List.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported Mandi List to CSV", "success");
  };

  // Filtered List
  const filteredMandis = mandis.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedFilter === 'All mandis' || m.location.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesLocation;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Subtitle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Operations</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Mandi Management</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage mandi locations, capacity, pricing, and operating status.
          </p>
        </div>
      </div>

      {/* Top Action Bar: Search, Filter, Add Mandi */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '280px' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative', flex: 1, maxWidth: '380px' }}>
            <Search size={17} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
            <input 
              type="text" 
              placeholder="Search mandis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 38px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem',
                background: 'white'
              }}
            />
          </div>

          {/* Region Dropdown Filter */}
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{
              padding: '9px 16px',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              fontSize: '0.875rem',
              fontWeight: 600,
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="All mandis">All mandis</option>
            <option value="Delhi">Delhi</option>
            <option value="Haryana">Haryana</option>
            <option value="Punjab">Punjab</option>
          </select>
        </div>

        {/* Add New Mandi Button */}
        <button
          onClick={onOpenAddModal}
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
          <Plus size={18} /> Add New Mandi
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Mandis</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '4px' }}>{mandis.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Across 8 states</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#047857', marginTop: '4px' }}>
            {mandis.filter(m => m.active).length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
            {((mandis.filter(m => m.active).length / mandis.length) * 100).toFixed(1)}% operational
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Under Maintenance</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#B45309', marginTop: '4px' }}>
            {mandis.filter(m => !m.active).length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 600, marginTop: '2px' }}>
            Review required
          </div>
        </div>

      </div>

      {/* Mandis Data Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>All Mandis</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {filteredMandis.length} registered mandi locations
            </p>
          </div>

          <button 
            onClick={handleExport}
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
            <Download size={15} /> Export list
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Mandi Name</th>
                <th>Location</th>
                <th>Current Capacity</th>
                <th>Live Avg. Price</th>
                <th>Today's Footfall</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMandis.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No mandis match your search filter.
                  </td>
                </tr>
              ) : (
                filteredMandis.map((mandi) => (
                  <tr key={mandi.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Building2 size={16} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{mandi.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mandi.id}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600 }}>{mandi.location}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mandi.subLocation}</div>
                    </td>

                    <td style={{ minWidth: '160px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>{mandi.capacity}% full</span>
                        <span className={`badge ${
                          mandi.capacity > 85 ? 'badge-critical' : mandi.capacity > 65 ? 'badge-busy' : 'badge-good'
                        }`}>
                          {mandi.statusTag}
                        </span>
                      </div>
                      <div className="progress-container">
                        <div 
                          className={`progress-bar ${mandi.capacity > 85 ? 'progress-critical' : mandi.capacity > 65 ? 'progress-busy' : 'progress-good'}`}
                          style={{ width: `${mandi.capacity}%` }}
                        />
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: 700 }}>{mandi.liveAvgPrice}</div>
                      <div style={{ fontSize: '0.75rem', color: mandi.priceTrend.startsWith('+') ? '#047857' : '#DC2626', fontWeight: 600 }}>
                        {mandi.priceTrend}
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600 }}>{mandi.todayFootfall}</div>
                    </td>

                    <td>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={mandi.active} 
                          onChange={() => toggleMandiStatus(mandi.id)} 
                        />
                        <span className="slider"></span>
                      </label>
                    </td>

                    <td>
                      <button 
                        style={{ padding: '6px', color: 'var(--text-muted)', cursor: 'pointer' }}
                        onClick={() => showToast(`Actions opened for ${mandi.name}`, 'info')}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            Showing 1-{filteredMandis.length} of {mandis.length} mandis
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button 
              disabled={currentPage === 1}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              <ChevronLeft size={16} />
            </button>
            
            <button style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'var(--primary)', color: 'white', fontWeight: 700 }}>
              1
            </button>
            <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 600 }}>
              2
            </button>
            <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 600 }}>
              3
            </button>
            <span>...</span>
            <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 600 }}>
              11
            </button>

            <button style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
