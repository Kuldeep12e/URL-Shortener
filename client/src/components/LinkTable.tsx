import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as LinkType } from '../api/link';
import { StatusBadge } from './StatusBadge';

interface Props {
  links: LinkType[];
  search: string;
  onDelete: (code: string) => void;
}

export const LinkTable: React.FC<Props> = ({ links, search, onDelete }) => {
  const filtered = links.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.code.toLowerCase().includes(q) ||
      l.targetUrl.toLowerCase().includes(q)
    );
  });

  function handleCopy(shortUrl: string) {
    navigator.clipboard
      .writeText(shortUrl)
      .catch((err) => console.error('Failed to copy', err));
  }

  if (links.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No links yet. Create your first short link using the form above.
      </p>
    );
  }

  if (filtered.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No links match your search. Try a different keyword.
      </p>
    );
  }

  const baseUrl = window.location.origin;

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-slate-700 uppercase text-[11px]">
          <tr>
            <th className="px-4 py-2 text-left">Code</th>
            <th className="px-4 py-2 text-left">Short URL</th>
            <th className="px-4 py-2 text-left">Target URL</th>
            <th className="px-4 py-2 text-right">Clicks</th>
            <th className="px-4 py-2 text-left">Last clicked</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((link) => {
            const shortUrl = `${baseUrl}/${link.code}`;
            return (
              <tr
                key={link.code}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-4 py-2 whitespace-nowrap">
                  <RouterLink
                    to={`/code/${link.code}`}
                    className="font-mono text-xs text-slate-900 underline"
                  >
                    {link.code}
                  </RouterLink>
                  <div className="mt-1">
                    <StatusBadge clicks={link.totalClicks} />
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs truncate max-w-[160px]">
                      {shortUrl}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(shortUrl)}
                      className="text-[11px] px-2 py-1 border border-slate-300 rounded hover:bg-slate-100"
                    >
                      Copy
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 max-w-xs">
                  <span className="text-xs text-slate-700 truncate block">
                    {link.targetUrl}
                  </span>
                </td>
                <td className="px-4 py-2 text-right font-mono text-xs">
                  {link.totalClicks}
                </td>
                <td className="px-4 py-2 text-xs text-slate-600">
                  {link.lastClickedAt
                    ? new Date(link.lastClickedAt).toLocaleString()
                    : 'Never'}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => onDelete(link.code)}
                    className="text-[11px] px-2 py-1 rounded border border-red-200 text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
