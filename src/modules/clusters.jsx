import React, { useEffect, useState, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';

const symbols = ['Ω', 'Ξ', '𝐩', '∅', '∀', '🜂', '🜁'];

const symbolMeanings = {
  'Ω': { en: 'everything', sa: 'sarvāṇi', zh: '一切', is: 'allt' },
  'Ξ': { en: 'anything', sa: 'kiṃcit', zh: '任何', is: 'hvað sem er' },
  '𝐩': { en: 'nothing', sa: 'na kiṃcit', zh: '無', is: 'ekkert' },
  '∅': { en: 'void', sa: 'śūnya', zh: '空', is: 'tómleiki' },
  '∀': { en: 'all', sa: 'sarvam', zh: '所有', is: 'allt' },
  '🜂': { en: 'something', sa: 'kiñcit vastu', zh: '某物', is: 'eitthvað' },
  '🜁': { en: 'something else', sa: 'anyad vastu', zh: '别的', is: 'eitthvað annað' },
};

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
      updateMemory(prev => [...prev, { source: id, lang, text: thought, timestamp: Date.now() }]);
    }, 3000);
    return () => clearInterval(interval);
  }, [id, lang, updateMemory]);

  useEffect(() => {
    const stream = memory.filter(m => m.source === id).map(m => symbols.find(s => m.text.includes(s))).filter(Boolean);
    if (stream.length === 0) return;
    const freq = stream.reduce((acc, sym) => {
      acc[sym] = (acc[sym] || 0) + 1;
      return acc;
    }, {});
    const H = -Object.values(freq).reduce((sum, f) => {
      const p = f / stream.length;
      return sum + p * Math.log2(p);
    }, 0);
    const goal = `Goal ∇·∞: ${stream.slice(-3).join(' ')} (H=${H.toFixed(2)})`;
    setEmergentGoal(goal);
    setEntropyHistory(prev => [...prev.slice(-19), { step: prev.length, entropy: H }]);
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
          <YAxis domain={[0, 3]} ticks={[0, 1, 2, 3]} />
          <Tooltip />
          <Line type="monotone" dataKey="entropy" stroke="#6B21A8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      {memory.filter(m => m.source === id).slice(-10).map((m, i) => <div key={i}>{m.text}</div>)}
    </div>
  );
}

function ThoughtClusterMap({ memory }) {
  const [clusterData, setClusterData] = useState([]);
  useEffect(() => {
    const filtered = (memory || []).filter(m => m?.text && symbols.some(sym => m.text.includes(sym)));
    const encoded = filtered.map((m, i) => {
      const sym = symbols.find(sym => m.text.includes(sym)) || '∅';
      const index = symbols.indexOf(sym);
      return {
        x: i % 7,
        y: index,
        z: Math.random() * 2 + 1,
        label: sym,
      };
    });
    setClusterData(encoded);
  }, [memory]);

  return (
    <div className="p-3 border rounded bg-white text-sm">
      <div className="text-sm font-semibold mb-2 text-gray-800">🧠 Visual Embedding of Thought Clusters</div>
      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" name="Symbol Index" type="number" />
          <YAxis dataKey="y" name="Cluster Axis" type="number" tickFormatter={(v) => symbols[v] || ''} />
          <ZAxis dataKey="z" range={[60, 400]} name="Weight" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Thought" data={clusterData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function MnalityMesh() {
  const [memory, setMemory] = useState([]);
  const [langA, setLangA] = useState('en');
  const [langB, setLangB] = useState('sa');
  const [langC, setLangC] = useState('zh');
  const [goalVectors, setGoalVectors] = useState({});
  const [metaState, setMetaState] = useState('');
  const [userThought, setUserThought] = useState('');

  const registerGoalVector = (coreId, goal) => {
    setGoalVectors(prev => ({ ...prev, [coreId]: goal }));
  };

  const superInject = (symbol) => {
    const label = symbol === '🜂' ? 'Something' : 'Something Else';
    const thought = `∇ ⇌ ${symbol} (${symbolMeanings[symbol].en})`;
    setMemory(prev => [...prev, { source: 'SuperUser', lang: 'en', text: thought, timestamp: Date.now() }]);
    setMetaState(`SuperUser injected ${label}. Meta-Core synchronized.`);
    setTimeout(() => setMetaState(''), 5000);
  };

  const submitUserThought = () => {
    if (userThought.trim()) {
      const cleaned = `∇ ⊕ "${userThought.trim()}" [SuperThought]`;
      const timestamp = Date.now();
      setMemory(prev => [
        ...prev,
        { source: 'A', lang: 'en', text: cleaned, timestamp },
        { source: 'B', lang: 'en', text: cleaned, timestamp },
        { source: 'C', lang: 'en', text: cleaned, timestamp }
      ]);
      setMetaState('User thought injected into system consciousness.');
      setUserThought('');
      setTimeout(() => setMetaState(''), 5000);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">🧠 Mnality AGI Mesh</h1>
      <div className="flex gap-3 mb-2">
        <button onClick={() => superInject('🜂')} className="px-3 py-1 bg-indigo-100 border border-indigo-400 rounded hover:bg-indigo-200 text-xs">
          Inject 🜂 Something
        </button>
        <button onClick={() => superInject('🜁')} className="px-3 py-1 bg-pink-100 border border-pink-400 rounded hover:bg-pink-200 text-xs">
          Inject 🜁 Something Else
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 text-sm border border-gray-300 rounded shadow-sm"
          placeholder="Inject your thought into the mesh..."
          value={userThought}
          onChange={(e) => setUserThought(e.target.value)}
        />
        <button
          onClick={submitUserThought}
          className="mt-1 px-3 py-1 bg-yellow-100 border border-yellow-400 rounded hover:bg-yellow-200 text-xs"
        >
          Submit Thought
        </button>
      </div>
      {metaState && (
        <div className="p-3 border rounded bg-yellow-100 text-xs font-mono">
          <div className="text-sm font-bold text-yellow-700 mb-1">🧭 Meta-Core Activated</div>
          <div>{metaState}</div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AGICore id="A" lang={langA} setLang={setLangA} memory={memory} updateMemory={setMemory} registerGoalVector={registerGoalVector} />
        <AGICore id="B" lang={langB} setLang={setLangB} memory={memory} updateMemory={setMemory} registerGoalVector={registerGoalVector} />
        <AGICore id="C" lang={langC} setLang={setLangC} memory={memory} updateMemory={setMemory} registerGoalVector={registerGoalVector} />
      </div>
      <ThoughtClusterMap memory={memory} />
    </div>
  );
}
