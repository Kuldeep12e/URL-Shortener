import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <Layout>
    <div className="flex flex-col items-center justify-center py-16">
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">
        404 – Page not found
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded text-sm text-white bg-slate-900 hover:bg-slate-800"
      >
        Back to dashboard
      </Link>
    </div>
  </Layout>
);
