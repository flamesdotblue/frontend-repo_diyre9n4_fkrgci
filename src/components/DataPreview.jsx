import React from 'react';

function toCSV(rows) {
  if (!rows || rows.length === 0) return '';
  const headers = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((k) => set.add(k));
      return set;
    }, new Set())
  );
  const esc = (val) => {
    if (val === null || val === undefined) return '';
    const s = String(val).replace(/"/g, '""');
    if (/[",\n]/.test(s)) return `"${s}"`;
    return s;
  };
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((h) => esc(row[h])).join(','));
  }
  return lines.join('\n');
}

export default function DataPreview({ rows, filename = 'export.csv' }) {
  const hasData = rows && rows.length > 0;

  const handleDownload = () => {
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!hasData) return null;

  const headers = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((k) => set.add(k));
      return set;
    }, new Set())
  );

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Data Preview ({rows.length})</h3>
        <button onClick={handleDownload} className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium">Download CSV</button>
      </div>
      <div className="overflow-auto border border-slate-700 rounded-lg">
        <table className="min-w-full text-sm text-slate-300">
          <thead className="bg-slate-800">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-3 py-2 text-left font-medium border-b border-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="odd:bg-slate-900 even:bg-slate-900/50">
                {headers.map((h) => (
                  <td key={h} className="px-3 py-2 border-b border-slate-800 truncate max-w-[18rem]">
                    {row[h] !== undefined && row[h] !== null ? String(row[h]) : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
