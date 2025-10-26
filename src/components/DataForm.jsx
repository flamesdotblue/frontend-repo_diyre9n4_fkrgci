import React, { useMemo, useState } from 'react';
import DataPreview from './DataPreview';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeGooglePlacesSample({ query, location, type, limit = 10 }) {
  const [lat, lng] = location
    .split(',')
    .map((x) => parseFloat(x.trim()))
    .map((n) => (Number.isFinite(n) ? n : 28.6139));
  const base = [];
  for (let i = 0; i < limit; i++) {
    base.push({
      name: `${query || 'Business'} ${i + 1}`,
      place_id: `place_${i + 1}_${Math.random().toString(36).slice(2, 8)}`,
      type: type || 'establishment',
      rating: (Math.random() * 2 + 3).toFixed(1),
      user_ratings_total: randomInt(5, 500),
      phone: `+91-${randomInt(10000, 99999)}-${randomInt(10000, 99999)}`,
      address: `${randomInt(1, 120)}, Market Road, Sector ${randomInt(1, 60)}`,
      lat: (lat + Math.random() * 0.05 - 0.025).toFixed(6),
      lng: (lng + Math.random() * 0.05 - 0.025).toFixed(6),
      website: `https://www.${(query || 'seller').toLowerCase().replace(/\s+/g, '')}${i + 1}.com`,
    });
  }
  return base;
}

function makeMSMESample({ industry, city, state, minEmployees = 5, maxEmployees = 50, limit = 20 }) {
  const sectors = industry ? industry.split(',').map((s) => s.trim()) : ['Retail', 'Manufacturing', 'Services'];
  const names = ['Enterprises', 'Solutions', 'Industries', 'Traders', 'Exports', 'Tech'];
  const base = [];
  for (let i = 0; i < limit; i++) {
    const sector = sectors[i % sectors.length] || 'SME';
    base.push({
      company: `${sector} ${names[i % names.length]} ${i + 1}`,
      contact_name: ['Aarav', 'Vihaan', 'Diya', 'Ishita', 'Kabir', 'Riya'][i % 6] + ' ' + ['Sharma', 'Patel', 'Singh', 'Khan'][i % 4],
      email: `contact${i + 1}@${sector.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+91-${randomInt(60000, 99999)}-${randomInt(10000, 99999)}`,
      industry: sector,
      city: city || ['Mumbai', 'Delhi', 'Bengaluru', 'Pune'][i % 4],
      state: state || ['Maharashtra', 'Karnataka', 'Gujarat', 'Delhi'][i % 4],
      employees: randomInt(minEmployees, maxEmployees),
      gstin: `27ABCDE${randomInt(1000, 9999)}Z${randomInt(1, 9)}`,
      address: `${randomInt(10, 300)}, Industrial Area, Phase ${randomInt(1, 5)}`,
      website: `https://www.${sector.toLowerCase().replace(/\s+/g, '')}${i + 1}.in`,
    });
  }
  return base;
}

export default function DataForm({ mode }) {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  // Google form state
  const [gApiKey, setGApiKey] = useState('');
  const [gQuery, setGQuery] = useState('Restaurant');
  const [gLocation, setGLocation] = useState('28.6139, 77.2090');
  const [gRadius, setGRadius] = useState(2000);
  const [gType, setGType] = useState('restaurant');
  const [gLimit, setGLimit] = useState(15);

  // MSME form state
  const [mIndustry, setMIndustry] = useState('Retail, Services');
  const [mCity, setMCity] = useState('');
  const [mState, setMState] = useState('');
  const [mMinEmp, setMMinEmp] = useState(5);
  const [mMaxEmp, setMMaxEmp] = useState(50);
  const [mLimit, setMLimit] = useState(25);

  const title = useMemo(() => (mode === 'google' ? 'Google Places API' : 'MSME Sellers'), [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'google') {
        const sample = makeGooglePlacesSample({
          query: gQuery,
          location: gLocation,
          type: gType,
          limit: Number(gLimit) || 10,
        });
        setRows(sample);
      } else {
        const sample = makeMSMESample({
          industry: mIndustry,
          city: mCity,
          state: mState,
          minEmployees: Number(mMinEmp) || 1,
          maxEmployees: Number(mMaxEmp) || 100,
          limit: Number(mLimit) || 20,
        });
        setRows(sample);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <span className="text-xs text-slate-400">Sample data is generated locally</span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {mode === 'google' ? (
            <>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-300 mb-1">API Key (optional)</label>
                <input
                  value={gApiKey}
                  onChange={(e) => setGApiKey(e.target.value)}
                  placeholder="Your Google Places API Key"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Query</label>
                <input
                  value={gQuery}
                  onChange={(e) => setGQuery(e.target.value)}
                  placeholder="e.g. Restaurant, Salon, Pharmacy"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Type</label>
                <input
                  value={gType}
                  onChange={(e) => setGType(e.target.value)}
                  placeholder="e.g. restaurant, store, gym"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Location (lat, lng)</label>
                <input
                  value={gLocation}
                  onChange={(e) => setGLocation(e.target.value)}
                  placeholder="28.6139, 77.2090"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Radius (meters)</label>
                <input
                  type="number"
                  value={gRadius}
                  onChange={(e) => setGRadius(e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Limit</label>
                <input
                  type="number"
                  value={gLimit}
                  onChange={(e) => setGLimit(e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none px-3 py-2"
                />
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-300 mb-1">Industry (comma separated)</label>
                <input
                  value={mIndustry}
                  onChange={(e) => setMIndustry(e.target.value)}
                  placeholder="Retail, Manufacturing, Services"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">City</label>
                <input
                  value={mCity}
                  onChange={(e) => setMCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">State</label>
                <input
                  value={mState}
                  onChange={(e) => setMState(e.target.value)}
                  placeholder="e.g. Maharashtra"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Min Employees</label>
                <input
                  type="number"
                  value={mMinEmp}
                  onChange={(e) => setMMinEmp(e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Max Employees</label>
                <input
                  type="number"
                  value={mMaxEmp}
                  onChange={(e) => setMMaxEmp(e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Record Limit</label>
                <input
                  type="number"
                  value={mLimit}
                  onChange={(e) => setMLimit(e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none px-3 py-2"
                />
              </div>
            </>
          )}

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white font-medium shadow-lg ${
                mode === 'google'
                  ? 'bg-emerald-600 hover:bg-emerald-500'
                  : 'bg-indigo-600 hover:bg-indigo-500'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Generating…' : 'Generate Data'}
            </button>
            <span className="text-xs text-slate-400">You can download CSV after generation</span>
          </div>
        </form>

        <DataPreview rows={rows} filename={`${mode === 'google' ? 'google_places' : 'msme_sellers'}.csv`} />
      </div>
    </div>
  );
}
