import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Check, 
  X, 
  Eye, 
  MapPin, 
  Phone, 
  Maximize2, 
  Sprout, 
  Globe, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function FarmerVerificationView({ 
  farmers, 
  onApprove, 
  onReject, 
  onViewDoc, 
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarmerId, setSelectedFarmerId] = useState(farmers[0]?.id || null);

  const filteredFarmers = farmers.filter(f => {
    const matchesTab = f.status === activeTab;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.mobile.includes(searchTerm) ||
                          f.village.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const selectedFarmer = farmers.find(f => f.id === selectedFarmerId) || filteredFarmers[0] || farmers[0];

  const pendingCount = farmers.filter(f => f.status === 'Pending').length;
  const verifiedCount = farmers.filter(f => f.status === 'Verified').length;
  const rejectedCount = farmers.filter(f => f.status === 'Rejected').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Page Header */}
      <div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Farmer management</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Farmer Verification Queue</h1>
      </div>

      {/* Top Filter Bar: Tabs & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Status Tabs */}
        <div style={{
          display: 'inline-flex',
          background: 'white',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => setActiveTab('Pending')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'Pending' ? 700 : 500,
              background: activeTab === 'Pending' ? '#FEF3C7' : 'transparent',
              color: activeTab === 'Pending' ? '#B45309' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Pending Verification 
            <span style={{
              background: activeTab === 'Pending' ? '#F59E0B' : '#E5E7EB',
              color: activeTab === 'Pending' ? 'white' : '#4B5563',
              fontSize: '0.7rem',
              padding: '2px 6px',
              borderRadius: '10px',
              fontWeight: 700
            }}>
              {pendingCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('Verified')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'Verified' ? 700 : 500,
              background: activeTab === 'Verified' ? '#ECFDF5' : 'transparent',
              color: activeTab === 'Verified' ? '#047857' : 'var(--text-muted)'
            }}
          >
            Verified ({verifiedCount})
          </button>

          <button
            onClick={() => setActiveTab('Rejected')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'Rejected' ? 700 : 500,
              background: activeTab === 'Rejected' ? '#FEE2E2' : 'transparent',
              color: activeTab === 'Rejected' ? '#B91C1C' : 'var(--text-muted)'
            }}
          >
            Rejected ({rejectedCount})
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }} />
          <input 
            type="text" 
            placeholder="Search name or phone"
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

      {/* Main Split Layout: Left Table + Right Detail Drawer */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)',
        gap: '20px'
      }}>
        
        {/* Left Pane: Applications Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Applications awaiting review</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Review documents and approve eligible farmers.</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Mobile number</th>
                  <th>Document</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarmers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                      No farmer applications found in {activeTab} queue.
                    </td>
                  </tr>
                ) : (
                  filteredFarmers.map((f) => {
                    const isSelected = selectedFarmer?.id === f.id;
                    return (
                      <tr 
                        key={f.id}
                        onClick={() => setSelectedFarmerId(f.id)}
                        style={{
                          background: isSelected ? '#F0FDF4' : 'transparent',
                          cursor: 'pointer'
                        }}
                      >
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
                              {f.avatar}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{f.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.village}, {f.district}</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                          {f.mobile}
                        </td>

                        <td>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDoc(f);
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#DC2626',
                              fontSize: '0.78rem',
                              fontWeight: 600
                            }}
                          >
                            <FileText size={14} /> View Document
                          </button>
                        </td>

                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {f.submittedDate}
                        </td>

                        <td>
                          <span className={`badge ${
                            f.status === 'Verified' ? 'badge-good' : f.status === 'Rejected' ? 'badge-critical' : 'badge-pending'
                          }`}>
                            {f.status}
                          </span>
                        </td>

                        <td>
                          <div style={{ display: 'flex', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
                            {f.status === 'Pending' ? (
                              <>
                                <button
                                  onClick={() => onApprove(f.id)}
                                  style={{
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                  }}
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => onReject(f.id)}
                                  style={{
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    border: '1px solid #FCA5A5',
                                    color: '#DC2626',
                                    background: '#FEF2F2',
                                    fontSize: '0.75rem',
                                    fontWeight: 600
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Actioned</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            1-10 of {filteredFarmers.length} pending farmers
          </div>
        </div>

        {/* Right Pane: Selected Application Detail View (Matching Screen 13 Right Panel) */}
        {selectedFarmer && (
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Selected application</span>
              <span className={`badge ${
                selectedFarmer.status === 'Verified' ? 'badge-good' : selectedFarmer.status === 'Rejected' ? 'badge-critical' : 'badge-pending'
              }`}>
                {selectedFarmer.status}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {selectedFarmer.name}
            </h3>

            {/* Profile Highlight Card */}
            <div style={{
              background: '#F9FAFB',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid #F3F4F6'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#D1FAE5',
                color: '#047857',
                fontSize: '1rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedFarmer.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Farmer registration</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Submitted {selectedFarmer.submittedDate}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Village / District</span>
                <strong>{selectedFarmer.village}, {selectedFarmer.district}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Mobile number</span>
                <strong>{selectedFarmer.mobile}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Land size</span>
                <strong>{selectedFarmer.landSize}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Language</span>
                <strong>{selectedFarmer.language}</strong>
              </div>
            </div>

            {/* Registered Crops */}
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>
                Registered crops
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selectedFarmer.crops.map((crop, idx) => (
                  <span key={idx} style={{
                    background: '#ECFDF5',
                    color: '#047857',
                    border: '1px solid #A7F3D0',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Sprout size={12} /> {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Land Ownership Document Box */}
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>
                Land ownership document
              </span>
              <div 
                onClick={() => onViewDoc(selectedFarmer)}
                style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={20} color="#DC2626" />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{selectedFarmer.documentName}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{selectedFarmer.documentType}</div>
                  </div>
                </div>
                <Eye size={16} color="var(--primary)" />
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button
                onClick={() => onApprove(selectedFarmer.id)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  background: 'var(--primary)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}
              >
                Approve farmer
              </button>
              <button
                onClick={() => onReject(selectedFarmer.id)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #FCA5A5',
                  color: '#DC2626',
                  background: '#FEF2F2',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                Reject
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
