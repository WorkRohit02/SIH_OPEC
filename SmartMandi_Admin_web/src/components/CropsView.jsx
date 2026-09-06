import React, { useState } from 'react';
import { 
  Search, 
  Sprout, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Building2, 
  Users, 
  Droplets, 
  CheckCircle2, 
  X, 
  ArrowRight,
  Sparkles,
  Layers,
  Filter
} from 'lucide-react';
import { CROPS_DIRECTORY_DATA, INITIAL_FARMERS, INITIAL_MANDIS } from '../data/mockData';

export default function CropsView({ onNavigate, showToast }) {
  const [cropsList, setCropsList] = useState(CROPS_DIRECTORY_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const filteredCrops = cropsList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.hindiName.includes(searchTerm) ||
                          c.varieties.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Agricultural Directory</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Crop Hub & Commodity Analytics</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Explore crop-specific market arrivals, quality standards, MSP benchmarks, and trading mandis.
          </p>
        </div>
      </div>

      {/* Action Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Cereals', 'Oilseeds', 'Fiber', 'Cash Crop', 'Vegetables'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === cat ? 700 : 500,
                background: selectedCategory === cat ? 'var(--primary)' : 'white',
                color: selectedCategory === cat ? 'white' : 'var(--text-muted)',
                border: '1px solid var(--border-color)',
                boxShadow: selectedCategory === cat ? '0 4px 10px rgba(0, 176, 96, 0.25)' : 'none',
                cursor: 'pointer'
              }}
            >
              {cat === 'All' ? '🌾 All Crops' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }} />
          <input 
            type="text" 
            placeholder="Search Wheat, Rice, Mustard..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              background: 'white'
            }}
          />
        </div>

      </div>

      {/* Crop Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {filteredCrops.map(crop => (
          <div 
            key={crop.id} 
            className="card card-hover"
            style={{
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Accent Stripe */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '4px',
              background: crop.color
            }} />

            <div>
              {/* Header Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem'
                  }}>
                    {crop.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {crop.name}
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>({crop.hindiName})</span>
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{crop.category} · {crop.harvestSeason}</span>
                  </div>
                </div>

                <span className="badge badge-good">
                  {crop.priceTrend}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '16px' }}>
                {crop.description}
              </p>

              {/* Price & Arrival Metrics Grid */}
              <div style={{
                background: 'var(--bg-subtle)',
                borderRadius: '10px',
                padding: '12px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>Market Rate</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{crop.avgPrice}</div>
                  <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 600 }}>MSP: {crop.msp}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>Today's Arrival</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{crop.todayArrivals}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{crop.registeredFarmersCount.toLocaleString()} farmers registered</div>
                </div>
              </div>

              {/* Key Varieties */}
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  POPULAR VARIETIES
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {crop.varieties.map((v, i) => (
                    <span key={i} style={{
                      background: 'white',
                      border: '1px solid var(--border-color)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.73rem',
                      fontWeight: 600,
                      color: 'var(--text-main)'
                    }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quality Standards */}
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Droplets size={14} color="#3B82F6" /> Max Moisture: <strong style={{ color: 'var(--text-main)' }}>{crop.maxMoisture}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#10B981" /> Purity: <strong style={{ color: 'var(--text-main)' }}>{crop.purityGrade}</strong>
                </div>
              </div>
            </div>

            {/* Bottom Card Action */}
            <button
              onClick={() => setSelectedCrop(crop)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              Inspect Crop Mandis & Farmers <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* Crop Detailed Inspector Modal */}
      {selectedCrop && (
        <div className="modal-overlay" onClick={() => setSelectedCrop(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '2rem' }}>{selectedCrop.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{selectedCrop.name} ({selectedCrop.hindiName})</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedCrop.category} · Season: {selectedCrop.harvestSeason}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCrop(null)} style={{ padding: '6px', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            {/* Content Tabs / Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Quality & Procurement Guidelines */}
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '16px', borderRadius: '12px' }}>
                <h4 style={{ fontWeight: 800, color: '#047857', fontSize: '0.9rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={18} /> Official Quality & Moisture Inspection Standards
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', color: '#065F46' }}>
                  <div>• Max Moisture Threshold: <strong>{selectedCrop.maxMoisture}</strong></div>
                  <div>• Foreign Matter Limit: <strong>&lt; 0.5%</strong></div>
                  <div>• Minimum Purity Grade: <strong>{selectedCrop.purityGrade}</strong></div>
                  <div>• Central MSP Price: <strong>{selectedCrop.msp}</strong></div>
                </div>
              </div>

              {/* Trading Mandis for this Crop */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>Key Trading Mandi Hubs</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedCrop.topMandis.map((mandi, idx) => (
                    <div key={idx} style={{
                      background: 'white',
                      border: '1px solid var(--border-color)',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Building2 size={16} color="var(--primary)" /> {mandi}
                    </div>
                  ))}
                </div>
              </div>

              {/* Registered Farmers Selling This Crop */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>Registered Farmers Cultivating {selectedCrop.name}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {INITIAL_FARMERS.filter(f => f.crops.includes(selectedCrop.name)).map(farmer => (
                    <div key={farmer.id} style={{
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D1FAE5', color: '#047857', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {farmer.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{farmer.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{farmer.village}, {farmer.district} · {farmer.landSize}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCrop(null);
                          onNavigate('verification');
                        }}
                        style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
