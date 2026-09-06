import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Clock, 
  UserCheck, 
  Download,
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_AUDIT_LOGS } from '../data/mockData';

export default function AuditLogsView({ showToast }) {
  const [logs, setLogs] = useState(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'All' || log.severity.toLowerCase() === selectedSeverity.toLowerCase();
    return matchesSearch && matchesSeverity;
  });

  const handleExportAudit = () => {
    showToast("Exported System Audit Trail to CSV", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Security & Compliance</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>System Audit Trail Logs</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Tamper-proof chronological record of administrative actions, verification decisions, and price updates.
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'white',
            border: '1px solid var(--border-color)',
            padding: '9px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          <Download size={16} /> Export Audit Logs
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Info', 'Warning', 'Critical'].map(sev => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: selectedSeverity === sev ? 700 : 500,
                background: selectedSeverity === sev ? 'var(--primary-light)' : 'white',
                color: selectedSeverity === sev ? 'var(--primary)' : 'var(--text-muted)',
                border: '1px solid var(--border-color)'
              }}
            >
              {sev}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }} />
          <input 
            type="text" 
            placeholder="Search action or actor..."
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

      {/* Audit Log Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp</th>
                <th>Action Performed</th>
                <th>Performed By</th>
                <th>Target Object</th>
                <th>IP Address</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>
                    <span style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{log.id}</span>
                  </td>

                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {log.timestamp}
                  </td>

                  <td style={{ fontWeight: 700 }}>
                    {log.action}
                  </td>

                  <td style={{ fontSize: '0.85rem' }}>
                    {log.actor}
                  </td>

                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {log.target}
                  </td>

                  <td style={{ fontSize: '0.78rem', fontFamily: 'monospace' }}>
                    {log.ip}
                  </td>

                  <td>
                    <span className={`badge ${
                      log.severity === 'info' ? 'badge-good' : log.severity === 'warning' ? 'badge-busy' : 'badge-critical'
                    }`}>
                      {log.severity}
                    </span>
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
