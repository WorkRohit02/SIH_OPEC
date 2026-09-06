import React, { useState } from 'react';
import { 
  Search, 
  Mail, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  UserCheck, 
  X,
  Send,
  ArrowUpRight
} from 'lucide-react';

export default function GrievancesView({ grievances, setGrievances, showToast }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [resolutionNote, setResolutionNote] = useState('');
  const [newStatus, setNewStatus] = useState('Open');
  const [assignedAdmin, setAssignedAdmin] = useState('AS');

  const filteredTickets = grievances.filter(t => {
    const matchesTab = activeTab === 'All' || t.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.mandi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const openCount = grievances.filter(g => g.status === 'Open').length;
  const escalatedCount = grievances.filter(g => g.status === 'Escalated').length;

  const handleOpenTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setAssignedAdmin(ticket.admin);
    setResolutionNote('');
  };

  const handleUpdateTicket = (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    setGrievances(prev => prev.map(t => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: newStatus,
          admin: assignedAdmin
        };
      }
      return t;
    }));

    showToast(`Updated ticket ${selectedTicket.id} to ${newStatus}`, 'success');
    setSelectedTicket(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Subtitle */}
      <div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Support operations</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Grievance Management</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Review, assign and resolve farmer complaints across all mandis.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Open grievances</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>{openCount}</div>
          </div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: '#FEF3C7',
            color: '#B45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Mail size={20} />
          </div>
        </div>

        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Escalated</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#B91C1C', marginTop: '4px' }}>{escalatedCount}</div>
          </div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: '#FEE2E2',
            color: '#B91C1C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg. resolution time</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#047857', marginTop: '4px' }}>2.1 days</div>
          </div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: '#ECFDF5',
            color: '#047857',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Clock size={20} />
          </div>
        </div>

      </div>

      {/* Action Bar: Tabs & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Status Tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Open', 'In Review', 'Resolved', 'Escalated'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: activeTab === tab ? 700 : 500,
                background: activeTab === tab ? 'white' : 'transparent',
                color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none',
                border: activeTab === tab ? '1px solid var(--border-color)' : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }} />
          <input 
            type="text" 
            placeholder="Search ticket ID or farmer"
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

      {/* Tickets Data Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Farmer Name</th>
                <th>Mandi</th>
                <th>Category</th>
                <th>Date Filed</th>
                <th>Status</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    No grievance tickets found for "{activeTab}".
                  </td>
                </tr>
              ) : (
                filteredTickets.map(ticket => (
                  <tr 
                    key={ticket.id}
                    onClick={() => handleOpenTicketModal(ticket)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{ticket.id}</span>
                    </td>

                    <td style={{ fontWeight: 700 }}>
                      {ticket.farmer}
                    </td>

                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {ticket.mandi}
                    </td>

                    <td>
                      <span style={{
                        background: '#F3F4F6',
                        color: '#374151',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {ticket.category}
                      </span>
                    </td>

                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {ticket.dateFiled}
                    </td>

                    <td>
                      <span className={`badge ${
                        ticket.status === 'Resolved' ? 'badge-good' : 
                        ticket.status === 'Escalated' ? 'badge-critical' : 
                        ticket.status === 'In Review' ? 'badge-inreview' : 'badge-busy'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>

                    <td>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: '#D1FAE5',
                        color: '#047857',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {ticket.admin}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Detail & Resolution Modal */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div 
            className="modal-container" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '600px' }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '16px',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 800 }}>
                  #{selectedTicket.id}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px' }}>
                  {selectedTicket.category} Ticket
                </h3>
              </div>
              <button onClick={() => setSelectedTicket(null)} style={{ padding: '6px', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Ticket Meta Summary */}
              <div style={{
                background: 'var(--bg-subtle)',
                padding: '14px',
                borderRadius: '10px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                fontSize: '0.85rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Farmer:</span>
                  <div style={{ fontWeight: 700 }}>{selectedTicket.farmer}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Mandi Location:</span>
                  <div style={{ fontWeight: 700 }}>{selectedTicket.mandi}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Date Filed:</span>
                  <div>{selectedTicket.dateFiled}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Assigned Officer:</span>
                  <div style={{ fontWeight: 700 }}>{selectedTicket.adminName || 'Anita Sharma'}</div>
                </div>
              </div>

              {/* Complaint Description Box */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Complaint Details
                </label>
                <div style={{
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  lineHeight: '1.5'
                }}>
                  {selectedTicket.description}
                </div>
              </div>

              {/* Status & Assignment controls */}
              <form onSubmit={handleUpdateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Update Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        background: 'white'
                      }}
                    >
                      <option value="Open">Open</option>
                      <option value="In Review">In Review</option>
                      <option value="Escalated">Escalated</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Reassign Admin
                    </label>
                    <select
                      value={assignedAdmin}
                      onChange={(e) => setAssignedAdmin(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.85rem',
                        background: 'white'
                      }}
                    >
                      <option value="AS">Anita Sharma (AS)</option>
                      <option value="RK">Rahul Kapoor (RK)</option>
                      <option value="PM">Pooja Mishra (PM)</option>
                      <option value="AK">Anita Kapoor (AK)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Resolution / Inspector Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Type official investigation findings or resolution response..."
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedTicket(null)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '8px 20px',
                      borderRadius: '8px',
                      background: 'var(--primary)',
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Send size={15} /> Save & Update Ticket
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
