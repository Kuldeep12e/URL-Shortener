import React from 'react';

interface Props {
  clicks: number;
}

export const StatusBadge: React.FC<Props> = ({ clicks }) => {
  const label = clicks === 0 ? 'New' : clicks < 10 ? 'Active' : 'Hot';
  const style =
    clicks === 0
      ? 'bg-slate-100 text-slate-700'
      : clicks < 10
      ? 'bg-blue-100 text-blue-800'
      : 'bg-amber-100 text-amber-800';

  return (
    <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${style}`}>
      {label}
    </span>
  );
};
