import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Plus, 
  IndianRupee, 
  BarChart2, 
  Sparkles,
  Edit2,
  X,
  Check
} from 'lucide-react';
import { COMMODITY_PRICING_DATA } from '../data/mockData';

export default function PricingView({ showToast }) {
  const [pricingList, setPricingList] = useState(COMMODITY_PRICING_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItemForUpdate, setSelectedItemForUpdate] = useState(null);

  const [newAvgPrice, setNewAvgPrice] = useState('');
  const [newMinPrice, setNewMinPrice] = useState('');
  const [newMaxPrice, setNewMaxPrice] = useState('');

  const filteredPricing = pricingList.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenUpdateModal = (item) => {
    setSelectedItemForUpdate(item);
    setNewAvgPrice(item.avgPrice);
    setNewMinPrice(item.minPrice);
    setNewMaxPrice(item.maxPrice);
  };

  const handleSavePrice = (e) => {
    e.preventDefault();
    if (!selectedItemForUpdate) return;

    setPricingList(prev => prev.map(item => {
      if (item.id === selectedItemForUpdate.id) {
        const updatedAvg = parseInt(newAvgPrice, 10);
        const changeVal = (((updatedAvg - item.prevAvg) / item.prevAvg) * 100).toFixed(1);
        return {
          ...item,
          avgPrice: updatedAvg,
          minPrice: parseInt(newMinPrice, 10),
          maxPrice: parseInt(newMaxPrice, 10),
          change: `${changeVal >= 0 ? '+' : ''}${changeVal}%`,
          trend: changeVal > 0 ? 'up' : changeVal < 0 ? 'down' : 'neutral'
        };
      }
      return item;
    }));

    showToast(`Updated market price for ${selectedItemForUpdate.commodity}`, 'success');
    setSelectedItemForUpdate(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Market Economics</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Pricing & MSP Management</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Publish daily mandi rates, benchmark Government Minimum Support Prices (MSP), and monitor trade volumes.
          </p>
        </div>

        <button
          onClick={() => handleOpenUpdateModal(pricingList[0])}
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
          <Plus size={18} /> Update Commodity Rate
        </button>
      </div>

      {/* Daily Ticker Cards Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px'
      }}>
        {pricingList.slice(0, 4).map(item => (
          <div key={item.id} className="card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.commodity.split(' (')[0]}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, margin: '4px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ₹{item.avgPrice}
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>/Qtl</span>
            </div>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: item.trend === 'up' ? '#047857' : item.trend === 'down' ? '#DC2626' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {item.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {item.change} vs yesterday
            </div>
          </div>
        ))}
      </div>

      {/* MSP Governance Advisory Banner */}
      <div style={{
        background: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#3B82F6',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1E3A8A' }}>
              2024-25 MSP Floor Price Protection Active
            </div>
            <div style={{ fontSize: '0.8rem', color: '#1E40AF' }}>
              All trades inside Smart Mandi network are automatically safeguarded to ensure quotes do not fall below Central Govt MSP rates.
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Data Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        
        {/* Controls Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Cereals', 'Oilseeds', 'Fiber', 'Vegetables'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  background: selectedCategory === cat ? 'var(--primary-light)' : 'transparent',
                  color: selectedCategory === cat ? 'var(--primary)' : 'var(--text-muted)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }} />
            <input 
              type="text" 
              placeholder="Search commodity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Commodity Name</th>
                <th>Category</th>
                <th>Govt. MSP Rate</th>
                <th>Mandi Price Range</th>
                <th>Live Average</th>
                <th>24h Change</th>
                <th>Arrival Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPricing.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.commodity}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.id}</div>
                  </td>

                  <td>
                    <span style={{ background: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {item.category}
                    </span>
                  </td>

                  <td style={{ fontWeight: 700, color: '#047857' }}>
                    ₹{item.mspRate} /Qtl
                  </td>

                  <td style={{ fontSize: '0.85rem' }}>
                    ₹{item.minPrice} - ₹{item.maxPrice}
                  </td>

                  <td>
                    <div style={{ fontSize: '1rem', fontWeight: 800 }}>₹{item.avgPrice}</div>
                  </td>

                  <td>
                    <span className={`badge ${item.trend === 'up' ? 'badge-good' : item.trend === 'down' ? 'badge-critical' : 'badge-busy'}`}>
                      {item.change}
                    </span>
                  </td>

                  <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    {item.arrivalVolume}
                  </td>

                  <td>
                    <button
                      onClick={() => handleOpenUpdateModal(item)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        background: 'white',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Edit2 size={13} /> Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Price Update Modal */}
      {selectedItemForUpdate && (
        <div className="modal-overlay" onClick={() => setSelectedItemForUpdate(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Update Price Rate</h3>
              <button onClick={() => setSelectedItemForUpdate(null)}><X size={18} /></button>
            </div>

            <form onSubmit={handleSavePrice} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Commodity</label>
                <div style={{ fontWeight: 800, fontSize: '1rem', marginTop: '2px' }}>{selectedItemForUpdate.commodity}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Min Mandi Price (₹)</label>
                  <input 
                    type="number" 
                    value={newMinPrice}
                    onChange={(e) => setNewMinPrice(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Max Mandi Price (₹)</label>
                  <input 
                    type="number" 
                    value={newMaxPrice}
                    onChange={(e) => setNewMaxPrice(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Published Average Rate (₹/Quintal)</label>
                <input 
                  type="number" 
                  required
                  value={newAvgPrice}
                  onChange={(e) => setNewAvgPrice(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', fontWeight: 700 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setSelectedItemForUpdate(null)} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 18px', borderRadius: '8px', background: 'var(--primary)', color: 'white', fontWeight: 700 }}>Save New Rate</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
