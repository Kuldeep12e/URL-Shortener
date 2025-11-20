import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <input
    className="border border-slate-300 rounded px-3 py-2 text-sm w-full sm:w-64"
    placeholder="Search by code or URL..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
