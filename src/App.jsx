import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ChoiceDialog from './components/ChoiceDialog';
import DataForm from './components/DataForm';

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState(null); // 'google' | 'msme'

  const handleLoginSuccess = () => {
    setAuthed(true);
    setShowDialog(true);
  };

  const handleChoose = (key) => {
    setMode(key);
    setShowDialog(false);
  };

  if (!authed) return <LoginForm onSuccess={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500" />
            <span className="font-semibold text-lg">SellerKhoj</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button
              className="px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700"
              onClick={() => setShowDialog(true)}
            >
              New Task
            </button>
            {mode && (
              <span className="text-slate-400">Mode: {mode === 'google' ? 'Google Places' : 'MSME Sellers'}</span>
            )}
          </div>
        </div>
      </header>

      {!mode ? (
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">Find and export leads in minutes</h1>
            <p className="text-slate-400 mt-2">Choose a data source to begin</p>
            <button
              onClick={() => setShowDialog(true)}
              className="mt-6 px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <main>
          <DataForm mode={mode} />
        </main>
      )}

      <ChoiceDialog
        open={showDialog}
        onChoose={handleChoose}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}
