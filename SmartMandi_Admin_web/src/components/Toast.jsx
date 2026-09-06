import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type || 'success'}`}>
          {toast.type === 'error' ? (
            <AlertCircle size={20} color="#EF4444" />
          ) : (
            <CheckCircle2 size={20} color="#10B981" />
          )}
          <span>{toast.message}</span>
          <button 
            onClick={() => onDismiss(toast.id)}
            style={{ marginLeft: 'auto', color: '#9CA3AF', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
