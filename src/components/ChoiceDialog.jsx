import React from 'react';

export default function ChoiceDialog({ open, onChoose, onClose }) {
  if (!open) return null;

  const options = [
    {
      key: 'google',
      title: 'Google Places API',
      description: 'Search places and collect details for leads.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'msme',
      title: 'MSME Sellers',
      description: 'Capture SME seller info for outreach.',
      color: 'from-indigo-500 to-violet-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl mx-4 bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">What would you like to do?</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">Close</button>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onChoose(opt.key)}
              className={`group relative rounded-xl p-5 bg-gradient-to-br ${opt.color} text-left text-white shadow-lg hover:shadow-xl transition`}
            >
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-10 transition"></div>
              <div className="font-semibold text-lg">{opt.title}</div>
              <div className="text-white/90 text-sm mt-1">{opt.description}</div>
              <div className="mt-4 inline-flex items-center text-sm font-medium">Start →</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
