import React, { useState } from 'react';
import { X, Plus, MapPin, Building2, Percent } from 'lucide-react';

export default function AddMandiModal({ onClose, onAddMandi }) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    location: 'Delhi',
    subLocation: '',
    capacity: 50,
    statusTag: 'Good',
    liveAvgPrice: '₹2,250',
    active: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const newMandi = {
      id: formData.code || `AM-${formData.location.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      location: formData.location,
      subLocation: formData.subLocation || `${formData.location} Central`,
      capacity: parseInt(formData.capacity, 10),
      statusTag: formData.capacity > 85 ? 'Critical' : formData.capacity > 70 ? 'Busy' : 'Good',
      liveAvgPrice: formData.liveAvgPrice.startsWith('₹') ? formData.liveAvgPrice : `₹${formData.liveAvgPrice}`,
      priceTrend: '+1.5%',
      todayFootfall: '1,200 visits',
      active: formData.active
    };

    onAddMandi(newMandi);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px' }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Add New Mandi Location</h3>
          </div>
          <button onClick={onClose} style={{ padding: '6px', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              Mandi Name *
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. Rohini Sector 18 Grain Mandi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Mandi Code / ID
              </label>
              <input 
                type="text" 
                placeholder="e.g. AM-DEL-005"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                State / Region
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                  background: 'white'
                }}
              >
                <option value="Delhi">Delhi</option>
                <option value="Haryana">Haryana</option>
                <option value="Punjab">Punjab</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Rajasthan">Rajasthan</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                District / Sub-location
              </label>
              <input 
                type="text" 
                placeholder="e.g. North West Delhi"
                value={formData.subLocation}
                onChange={(e) => setFormData({ ...formData, subLocation: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Initial Capacity (%)
              </label>
              <input 
                type="number" 
                min="0"
                max="100"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              Base Avg. Price (₹/Quintal)
            </label>
            <input 
              type="text" 
              placeholder="2300"
              value={formData.liveAvgPrice}
              onChange={(e) => setFormData({ ...formData, liveAvgPrice: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg-subtle)',
            padding: '12px 16px',
            borderRadius: '8px',
            marginTop: '4px'
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Operational Status</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enable live slot bookings immediately</div>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={formData.active} 
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })} 
              />
              <span className="slider"></span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                background: 'var(--primary)',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={16} /> Save Mandi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
