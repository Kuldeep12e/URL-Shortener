import React, { useState } from 'react';
import { createLink } from '../api/link';

interface Props {
  onCreated: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const codeRegex = /^[A-Za-z0-9]{6,8}$/;

export const LinkForm: React.FC<Props> = ({ onCreated, showToast }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ url?: string; code?: string }>({});

  function validate(): boolean {
    const newErrors: { url?: string; code?: string } = {};

    if (!targetUrl.trim()) {
      newErrors.url = 'Target URL is required.';
    } else {
      try {
        const u = new URL(targetUrl.trim());
        if (!['http:', 'https:'].includes(u.protocol)) {
          newErrors.url = 'URL must start with http:// or https://';
        }
      } catch {
        newErrors.url = 'Please enter a valid URL.';
      }
    }

    if (code.trim()) {
      if (!codeRegex.test(code.trim())) {
        newErrors.code = 'Code must be 6–8 alphanumeric characters.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await createLink(targetUrl.trim(), code.trim() || undefined);
      setTargetUrl('');
      setCode('');
      showToast('Link created successfully!', 'success');
      onCreated();
    } catch (err: any) {
      const message =
        err?.response?.data?.error || 'Failed to create link. Please try again.';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          Target URL <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
          placeholder="https://example.com/docs"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
        />
        {errors.url && (
          <p className="text-xs text-red-600 mt-1">{errors.url}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Custom code (optional)
        </label>
        <input
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
          placeholder="e.g. docs123"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <p className="text-[11px] text-slate-500 mt-1">
          If left blank, a random code will be generated. Allowed pattern:
          [A-Za-z0-9] with length 6–8.
        </p>
        {errors.code && (
          <p className="text-xs text-red-600 mt-1">{errors.code}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`inline-flex items-center justify-center px-4 py-2 rounded text-sm font-medium text-white ${
          loading ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-800'
        }`}
      >
        {loading ? 'Creating...' : 'Create short link'}
      </button>
    </form>
  );
};
