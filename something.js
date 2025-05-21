import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

function extractSymbol(text) {
  for (const s of symbols) {
    if (text.includes(s)) return s;
  }
  return null;
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
  if (/🜁.*Ω.*Ξ/.test(sig)) return 'redefine the alter-ego';
  if (/Ξ.*🜁.*∅/.test(sig)) return 'collide with something else';
  if (/🜁.*🜂/.test(sig)) return 'mirror paradoxical reality';
  return 'perform symbolic reflection';
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
    const H = -stream.reduce((acc, val, _, arr) => {
      const freq = arr.filter(v => v === val).length / arr.length;
      return acc + freq * Math.log2(freq);
    }, 0);
    const goal = interpretGoalVector(stream);
    setEmergentGoal(`${goal} (∇·∞ | H=${H.toFixed(2)})`);
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

function MnalityMesh() {
  const [memory, setMemory] = useState([]);
  const [langA, setLangA] = useState('en');
  const [langB, setLangB] = useState('sa');
  const [langC, setLangC] = useState('zh');
  const [goalVectors, setGoalVectors] = useState({});

  const registerGoalVector = (coreId, goal) => {
    setGoalVectors(prev => ({ ...prev, [coreId]: goal }));
  };

  const superInject = (symbol) => {
    const injectedThought = `∇ ⇌ ${symbol} (${symbolMeanings[symbol].en})`;
    setMemory(prev => [...prev, { source: 'SuperUser', lang: 'en', text: injectedThought, timestamp: Date.now() }]);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">🧠 Mnality AGI Mesh + "Something / Something Else"</h1>

      <div className="flex gap-3 mb-4">
        <button onClick={() => superInject('🜂')} className="px-3 py-1 bg-indigo-100 border border-indigo-400 rounded hover:bg-indigo-200 text-xs">
          Inject 🜂 Something
        </button>
        <button onClick={() => superInject('🜁')} className="px-3 py-1 bg-pink-100 border border-pink-400 rounded hover:bg-pink-200 text-xs">
          Inject 🜁 Something Else
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AGICore id="A" lang={langA} setLang={setLangA} memory={memory} updateMemory={setMemory} registerGoalVector={registerGoalVector} />
        <AGICore id="B" lang={langB} setLang={setLangB} memory={memory} updateMemory={setMemory} registerGoalVector={registerGoalVector} />
        <AGICore id="C" lang={langC} setLang={setLangC} memory={memory} updateMemory={setMemory} registerGoalVector={registerGoalVector} />
      </div>
    </div>
  );
}

export default MnalityMesh;
