import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
        <h1 className="font-semibold text-lg">
          <Link to="/">Shorty · URL Shortener</Link>
        </h1>
        <nav className="flex gap-4 text-sm">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </header>

      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">
        {children}
      </main>

      <footer className="bg-slate-100 text-xs text-slate-500 text-center py-3 mt-8">
        URL Shortener · {new Date().getFullYear()}
      </footer>
    </div>
  );
};
