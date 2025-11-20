import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Toast } from '../components/Toast';
import { getLink, Link } from '../api/link';

export const LinkStats: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!code) return;
      setLoading(true);
      setErrorMsg(null);
      try {
        const data = await getLink(code);
        setLink(data);
      } catch (err: any) {
        const msg =
          err?.response?.status === 404
            ? 'Link not found or has been deleted.'
            : 'Failed to load stats.';
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [code]);

  const baseUrl = window.location.origin;
  const shortUrl = code ? `${baseUrl}/${code}` : '';

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Link stats
            </h2>
            <p className="text-sm text-slate-600">
              Code: <span className="font-mono text-xs">{code}</span>
            </p>
          </div>
          <RouterLink
            to="/"
            className="text-xs text-slate-900 border border-slate-300 rounded px-3 py-1 hover:bg-slate-100"
          >
            ← Back to dashboard
          </RouterLink>
        </div>

        {errorMsg && <Toast message={errorMsg} type="error" />}

        {loading ? (
          <LoadingSpinner />
        ) : link ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3 text-sm">
            <div>
              <div className="text-xs text-slate-500 mb-1">Short URL</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">{shortUrl}</span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                  className="text-[11px] px-2 py-1 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-1">Target URL</div>
              <a
                href={link.targetUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-700 underline break-all"
              >
                {link.targetUrl}
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 mb-1">Clicks</div>
                <div className="text-lg font-semibold">
                  {link.totalClicks}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 mb-1">
                  Last clicked
                </div>
                <div className="text-xs text-slate-700">
                  {link.lastClickedAt
                    ? new Date(link.lastClickedAt).toLocaleString()
                    : 'Never'}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 mb-1">
                  Created at
                </div>
                <div className="text-xs text-slate-700">
                  {new Date(link.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 mb-1">
                  Updated at
                </div>
                <div className="text-xs text-slate-700">
                  {new Date(link.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};
