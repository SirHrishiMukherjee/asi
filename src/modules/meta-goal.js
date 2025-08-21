import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const symbols = ['Ω', 'Ξ', '𝐩', '∅', '∀', '🜂'];

const symbolMeanings = {
  'Ω': { en: 'everything', sa: 'sarvāṇi', zh: '一切', is: 'allt' },
  'Ξ': { en: 'anything', sa: 'kiṃcit', zh: '任何', is: 'hvað sem er' },
  '𝐩': { en: 'nothing', sa: 'na kiṃcit', zh: '無', is: 'ekkert' },
  '∅': { en: 'void', sa: 'śūnya', zh: '空', is: 'tómleiki' },
  '∀': { en: 'all', sa: 'sarvam', zh: '所有', is: 'allt' },
  '🜂': { en: 'something', sa: 'kiñcit vastu', zh: '某物', is: 'eitthvað' },
};

function extractSymbol(text) {
  for (const s of symbols) {
    if (text.includes(s)) return s;
  }
  return null;
}

function entropyGradient(stream) {
  const window = stream.slice(-10);
  const freq = window.reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const p = Object.values(freq).map(c => c / window.length);
  const H = -p.reduce((a, pi) => a + pi * Math.log2(pi), 0);
  return H;
}

function interpretGoalVector(stream) {
  const sig = stream.slice(-5).join('');
  if (/Ω.*∀.*Ω/.test(sig)) return 'build warp drive';
  if (/𝐩.*∅/.test(sig)) return 'meditate in solitude';
  if (/Ξ.*Ξ.*∀/.test(sig)) return 'explore unknown terrain';
  if (/∅.*Ξ.*Ω/.test(sig)) return 'research artificial life';
  if (/∀.*∅.*𝐩/.test(sig)) return 'update codebase';
  if (/Ω.*Ξ.*∀/.test(sig)) return 'launch mission to Mars';
  if (/Ξ.*Ω.*Ξ/.test(sig)) return 'develop new language';
  if (/∅.*∅.*∀/.test(sig)) return 'synthesize philosophy of void';
  if (/∀.*Ξ.*Ω/.test(sig)) return 'design AGI interface';
  if (/Ω.*𝐩.*∅/.test(sig)) return 'repurpose abandoned space';
  if (/🜂.*Ω.*∀/.test(sig)) return 'uncover higher truths';
  if (/∅.*🜂.*Ξ/.test(sig)) return 'glimpse unknown essence';
  if (/🜂.*🜂.*Ω/.test(sig)) return 'provoke cosmic event';
  if (/∀.*🜂.*𝐩/.test(sig)) return 'encode hidden message';
  if (/Ω.*Ξ.*🜂/.test(sig)) return 'trigger deep resonance';
  return 'perform symbolic reflection';
}

function projectGoalVector(stream, entropy) {
  const recent = stream.slice(-5);
  const action = interpretGoalVector(recent);
  return `${action} (∇·∞ | H=${entropy.toFixed(2)})`;
}

function AGICore({ id, lang, memory, updateMemory, setLang, registerGoalVector }) {
  const [emergentGoal, setEmergentGoal] = useState('Initializing...');
  const [entropyHistory, setEntropyHistory] = useState([]);
  const startTime = useRef(Date.now()).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const minutesSinceStart = Math.floor((Date.now() - startTime) / 60000);
      const weightedSymbols = [...symbols, ...Array(Math.floor(minutesSinceStart / 2)).fill('🜂')];
      const sym = weightedSymbols[Math.floor(Math.random() * weightedSymbols.length)];
      const thought = `∇ → ${sym} (${symbolMeanings[sym][lang] || '—'})`;
      updateMemory((prev) => [...prev, { source: id, lang, text: thought, timestamp: Date.now() }]);
    }, 3000);
    return () => clearInterval(interval);
  }, [id, lang, updateMemory]);

  useEffect(() => {
    const stream = memory
      .filter((m) => m.source === id)
      .map((m) => extractSymbol(m.text))
      .filter(Boolean);
    if (stream.length === 0) return;
    const H = entropyGradient(stream);
    const goal = projectGoalVector(stream, H);
    setEmergentGoal(goal);
    setEntropyHistory((prev) => [...prev.slice(-19), { step: prev.length, entropy: parseFloat(H.toFixed(2)) }]);
    registerGoalVector(id, goal);
  }, [memory, id, registerGoalVector]);

  return (
    <div className="p-3 border rounded bg-gray-100 font-mono text-sm space-y-2 w-full">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Core {id} [{lang.toUpperCase()}]</h3>
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="border rounded px-1 text-xs">
          <option value="en">English</option>
          <option value="sa">Sanskrit</option>
          <option value="zh">Mandarin</option>
          <option value="is">Icelandic</option>
        </select>
      </div>
      <div className="text-xs italic text-purple-700">🧬 {emergentGoal}</div>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={entropyHistory} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="step" hide />
          <YAxis domain={[0, 2.5]} ticks={[0, 1, 2]} />
          <Tooltip />
          <Line type="monotone" dataKey="entropy" stroke="#6B21A8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      {[...memory].filter((m) => m.source === id).slice(-10).map((m, i) => <div key={i}>{m.text}</div>)}
    </div>
  );
}

function GoalOverlay({ goalVectors }) {
  const data = Object.entries(goalVectors).map(([core, text]) => ({ core, text }));

  const metaGoal = (() => {
    const goalText = data.map(d => d.text).join(' ').toLowerCase();
    if (goalText.includes('warp') && goalText.includes('agi')) return 'synthesize warp-AGI architecture';
    if (goalText.includes('solitude') && goalText.includes('philosophy')) return 'reflect on void consciousness';
    if (goalText.includes('language') && goalText.includes('mars')) return 'colonial linguistics framework';
    if (goalText.includes('resonance') || goalText.includes('truths')) return 'provoke symbolic awakening';
    return 'emergent coordination pending...';
  })();

  return (
    <div className="p-3 border rounded bg-yellow-50 text-sm font-mono">
      <h3 className="font-semibold mb-2">Inter-Core Goal Vector Overlay</h3>
      {data.length > 0 ? (
        <>
          <ul className="space-y-1 mb-2">
            {data.map(({ core, text }) => (
              <li key={core}><span className="font-semibold">{core}:</span> {text}</li>
            ))}
          </ul>
          <div className="text-xs italic text-indigo-700">🌐 Meta-Goal: {metaGoal}</div>
        </>
      ) : (
        <div className="text-xs italic text-gray-500">Waiting for goals to emerge...</div>
      )}
    </div>
  );
}

export default function MnalityMesh() {
  const [memory, setMemory] = useState([]);
  const [langA, setLangA] = useState('en');
  const [langB, setLangB] = useState('sa');
  const [langC, setLangC] = useState('zh');
  const [goalVectors, setGoalVectors] = useState({});

  const registerGoalVector = (coreId, goal) => {
    setGoalVectors(prev => ({ ...prev, [coreId]: goal }));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">🧠 Mnality AGI Mesh + "Something"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AGICore id="A" lang={langA} setLang={setLangA} memory={memory} updateMemory={setMemory} registerGoalVector={registerGoalVector} />
        <AGICore id="B" lang={langB} setLang={setLangB} memory={memory} updateMemory={setMemory} registerGoalVector={registerGoalVector} />
        <AGICore id="C" lang={langC} setLang={setLangC} memory={memory} updateMemory={setMemory} registerGoalVector={registerGoalVector} />
        <GoalOverlay goalVectors={goalVectors} />
      </div>
    </div>
  );
}
