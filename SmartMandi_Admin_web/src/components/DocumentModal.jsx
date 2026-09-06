import React from 'react';
import { X, Download, FileText, ExternalLink, Check, ShieldCheck } from 'lucide-react';

export default function DocumentModal({ farmer, onClose, onApprove, onReject }) {
  if (!farmer) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px' }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#DC2626'
            }}>
              <FileText size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {farmer.documentName}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {farmer.documentType} · Uploaded by {farmer.name} ({farmer.village}, {farmer.district})
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              background: 'var(--bg-subtle)',
              color: 'var(--text-muted)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Document Viewer Preview Content */}
        <div style={{
          background: '#F3F4F6',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          padding: '24px',
          minHeight: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Watermark / Document Sheet UI */}
          <div style={{
            background: 'white',
            width: '100%',
            maxWidth: '520px',
            padding: '28px',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid #E5E7EB',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '2px solid #10B981', paddingBottom: '8px' }}>
              <div>
                <div style={{ fontWeight: 800, color: '#047857', fontSize: '0.95rem' }}>GOVERNMENT OF INDIA / REVENUE DEPT</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Land Records & Khatoni Registration Certificate</div>
              </div>
              <ShieldCheck size={28} color="#10B981" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem', marginBottom: '16px' }}>
              <div>
                <span style={{ color: '#6B7280' }}>Owner Name:</span>
                <div style={{ fontWeight: 700 }}>{farmer.name}</div>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>Khasra / Survey No:</span>
                <div style={{ fontWeight: 700 }}>KH-8942 / 2024</div>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>Registered Area:</span>
                <div style={{ fontWeight: 700 }}>{farmer.landSize}</div>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>District / Tehsil:</span>
                <div style={{ fontWeight: 700 }}>{farmer.district} / {farmer.village}</div>
              </div>
            </div>

            <div style={{
              background: '#F9FAFB',
              border: '1px stroke #E5E7EB',
              padding: '10px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              color: '#4B5563'
            }}>
              Verified digitally via UIDAI Agri Stack Portal. QR Signature Hash: <code>8f92a10b98...c44e</code>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button 
              onClick={() => alert(`Downloading ${farmer.documentName}...`)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'white',
                border: '1px solid #D1D5DB',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Download size={15} /> Download PDF
            </button>
            <button 
              onClick={() => window.open('#', '_blank')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'white',
                border: '1px solid #D1D5DB',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <ExternalLink size={15} /> Open in New Tab
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-color)'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Status: <strong style={{ color: farmer.status === 'Verified' ? '#047857' : farmer.status === 'Rejected' ? '#DC2626' : '#D97706' }}>{farmer.status}</strong>
          </span>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                onReject(farmer.id);
                onClose();
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: '1px solid #FCA5A5',
                color: '#DC2626',
                background: '#FEF2F2',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              Reject Document
            </button>

            <button
              onClick={() => {
                onApprove(farmer.id);
                onClose();
              }}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                background: 'var(--primary)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Check size={16} /> Approve & Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
