import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { LinkForm } from '../components/LinkForm';
import { LinkTable } from '../components/LinkTable';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Toast } from '../components/Toast';
import { getLinks, Link } from '../api/link';

export const Dashboard: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  async function loadLinks() {
    setLoading(true);
    try {
      const data = await getLinks();
      setLinks(data);
    } catch (err) {
      console.error(err);
      setToast({ msg: 'Failed to load links.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLinks();
  }, []);

  function handleToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleDelete(code: string) {
    if (!confirm(`Delete short link "${code}"?`)) return;

    try {
      const { deleteLink } = await import('../api/link');
      await deleteLink(code);
      handleToast('Link deleted.', 'success');
      loadLinks();
    } catch (err) {
      console.error(err);
      handleToast('Failed to delete link.', 'error');
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            Dashboard
          </h2>
          <p className="text-sm text-slate-600">
            Create short links, manage them, and see basic stats.
          </p>
        </div>

        {toast && <Toast message={toast.msg} type={toast.type} />}

        <LinkForm onCreated={loadLinks} showToast={handleToast} />

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-800">
            All links
          </h3>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <LinkTable links={links} search={search} onDelete={handleDelete} />
        )}
      </div>
    </Layout>
  );
};
