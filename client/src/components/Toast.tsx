import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  const base =
    'px-3 py-2 rounded text-sm mb-4 shadow-sm flex items-center justify-between';
  const color =
    type === 'success'
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-red-100 text-red-800';

  return <div className={`${base} ${color}`}>{message}</div>;
};
