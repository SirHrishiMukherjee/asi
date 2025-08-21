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

function generateEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function runGameOfLifeStep(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = generateEmptyGrid(rows, cols);

  const directions = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
    [1, 1], [-1, -1], [1, -1], [-1, 1],
  ];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let neighbors = 0;
      directions.forEach(([x, y]) => {
        const ni = i + x;
        const nj = j + y;
        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
          neighbors += grid[ni][nj];
        }
      });
      if (grid[i][j] === 1) {
        newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newGrid[i][j] = neighbors === 3 ? 1 : 0;
      }
    }
  }

  return newGrid;
}

function AnythingTrace({ memory }) {
  const [grid, setGrid] = useState(() => generateEmptyGrid(10, 10));

  useEffect(() => {
    const trace = memory.filter(m => m.text.includes('Ξ'));
    if (trace.length) {
      const g = generateEmptyGrid(10, 10);
      trace.forEach((m, i) => {
        const x = i % 10;
        const y = Math.floor(i / 10) % 10;
        g[y][x] = 1;
      });
      setGrid(g);
    }
  }, [memory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(prev => runGameOfLifeStep(prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 border rounded bg-black text-xs font-mono text-green-400">
      <div className="mb-1 text-white font-bold">Ξ Anything-Trace Synapse GOL</div>
      <pre style={{ lineHeight: '1.1em' }}>
        {grid.map((row, i) => row.map(cell => (cell ? '⬛' : '⬜')).join('')).join('\n')}
      </pre>
    </div>
  );
}

function GoalOverlay({ goalVectors, memory }) {
  const data = Object.entries(goalVectors).map(([core, text]) => ({ core, text }));
  const [userMetaGoal, setUserMetaGoal] = useState('');
  const [metaGoal, setMetaGoal] = useState('');
  const [useUserMeta, setUseUserMeta] = useState(false);

  useEffect(() => {
    if (!useUserMeta) {
      const goalText = data.map(d => d.text).join(' ').toLowerCase();
      if (goalText.includes('warp') && goalText.includes('agi')) setMetaGoal('synthesize warp-AGI architecture');
      else if (goalText.includes('solitude') && goalText.includes('philosophy')) setMetaGoal('reflect on void consciousness');
      else if (goalText.includes('language') && goalText.includes('mars')) setMetaGoal('colonial linguistics framework');
      else if (goalText.includes('resonance') || goalText.includes('truths')) setMetaGoal('provoke symbolic awakening');
      else setMetaGoal('emergent coordination pending...');
    }
  }, [goalVectors, useUserMeta]);

  const handleMetaGoalUpdate = () => {
    if (userMetaGoal.trim()) {
      setMetaGoal(userMetaGoal.trim());
      setUseUserMeta(true);
    }
  };

  const handleRevertToSystem = () => {
    setUseUserMeta(false);
  };

  return (
    <div className="p-3 border rounded bg-yellow-50 text-sm font-mono space-y-3">
      <div>
        <h3 className="font-semibold mb-2">Inter-Core Goal Vector Overlay</h3>
        <ul className="space-y-1 mb-2">
          {data.map(({ core, text }) => (
            <li key={core}><span className="font-semibold">{core}:</span> {text}</li>
          ))}
        </ul>
        <div className="text-xs italic text-indigo-700">🌐 Meta-Goal (Active): {metaGoal}</div>
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">✍️ Meta-Goal (User-defined)</label>
          <textarea
            rows={2}
            className="w-full p-1 text-xs border rounded bg-white"
            placeholder="Type your high-level meta-goal here..."
            value={userMetaGoal}
            onChange={(e) => setUserMetaGoal(e.target.value)}
          />
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleMetaGoalUpdate}
              className="px-2 py-1 text-xs bg-indigo-100 border border-indigo-400 rounded hover:bg-indigo-200"
            >
              Use User Meta-Goal
            </button>
            <button
              onClick={handleRevertToSystem}
              className="px-2 py-1 text-xs bg-gray-100 border border-gray-400 rounded hover:bg-gray-200"
            >
              Revert to System Goal
            </button>
          </div>
        </div>
      </div>
      <AnythingTrace memory={memory} />
    </div>
  );
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
        <GoalOverlay goalVectors={goalVectors} memory={memory} />
      </div>
    </div>
  );
}
