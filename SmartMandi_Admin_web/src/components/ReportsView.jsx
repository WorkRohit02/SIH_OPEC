import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  Filter,
  ArrowDownToLine
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { DAILY_ARRIVALS_GRAPH } from '../data/mockData';

export default function ReportsView({ showToast }) {
  const [reportRange, setReportRange] = useState('This Week');
  const [selectedReportType, setSelectedReportType] = useState('Daily Arrivals');

  const handleExportPDF = () => {
    showToast("Generated PDF Executive Summary Report", "success");
  };

  const handleExportExcel = () => {
    showToast("Exported Raw Analytics Spreadsheet (.xlsx)", "success");
  };

  const reportTemplates = [
    { title: "Monthly Mandi Trade Volume Audit", desc: "Detailed breakdown of transaction values, MSP payouts, and buyer settlements across all 48 mandis.", size: "2.4 MB PDF" },
    { title: "Farmer Verification Compliance Log", desc: "Audit trail of document submissions, approval turnaround times, and rejection grounds.", size: "1.8 MB Excel" },
    { title: "Mandi Queue & Gate Entry Turnaround", desc: "High-density load analysis identifying bottlenecks during peak harvesting arrival slots.", size: "3.1 MB PDF" },
    { title: "Grievances Resolution Performance Metric", desc: "Support ticket resolution breakdown categorized by Mandi and assigned inspector.", size: "950 KB CSV" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Export Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Analytics & Audit</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Reports & Operations Intelligence</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Export compliance logs, analyze daily crop arrival volumes, and generate official government reports.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleExportPDF}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'white',
              border: '1px solid var(--border-color)',
              padding: '9px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <FileText size={16} color="#DC2626" /> Download PDF
          </button>
          
          <button
            onClick={handleExportExcel}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--primary)',
              color: 'white',
              padding: '9px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0, 176, 96, 0.25)'
            }}
          >
            <FileSpreadsheet size={16} /> Export Excel Spreadsheet
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Mandi Volume</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '4px' }}>₹14.8 Cr</div>
          <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600, marginTop: '2px' }}>+14.2% vs last week</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Farmers Served</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '4px' }}>1,284</div>
          <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600, marginTop: '2px' }}>Across 6 regional hubs</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg Gate Processing Time</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#3B82F6', marginTop: '4px' }}>22 min</div>
          <div style={{ fontSize: '0.75rem', color: '#1D4ED8', fontWeight: 600, marginTop: '2px' }}>-4.5 min optimal efficiency</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Verification Approval Pass Rate</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#047857', marginTop: '4px' }}>94.2%</div>
          <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600, marginTop: '2px' }}>High land match ratio</div>
        </div>

      </div>

      {/* Bar Chart: Daily Commodity Arrivals */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Daily Crop Arrivals Volume (Quintals)</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Comparison across top agricultural commodities</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['This Week', 'Last Week', 'This Month'].map(range => (
              <button
                key={range}
                onClick={() => setReportRange(range)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: reportRange === range ? 700 : 500,
                  background: reportRange === range ? 'var(--primary-light)' : 'white',
                  color: reportRange === range ? 'var(--primary)' : 'var(--text-muted)',
                  border: '1px solid var(--border-color)'
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DAILY_ARRIVALS_GRAPH} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE6" vertical={false} />
              <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip contentStyle={{ background: 'white', borderRadius: '8px', border: '1px solid #E5E7EB' }} />
              <Legend />
              <Bar dataKey="wheat" fill="#10B981" name="Wheat" radius={[4, 4, 0, 0]} />
              <Bar dataKey="paddy" fill="#3B82F6" name="Paddy/Rice" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mustard" fill="#F59E0B" name="Mustard" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cotton" fill="#EC4899" name="Cotton" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pre-built Official Report Templates */}
      <div style={{ marginTop: '8px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>Standard Governance Reports</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {reportTemplates.map((template, idx) => (
            <div key={idx} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{template.title}</h4>
                  <span style={{ fontSize: '0.72rem', background: '#F3F4F6', color: '#4B5563', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    {template.size}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '16px' }}>
                  {template.desc}
                </p>
              </div>

              <button
                onClick={() => showToast(`Downloading ${template.title}...`, 'success')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--primary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <ArrowDownToLine size={15} /> Download Official File
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
