// src/App.jsx
import React, { useState } from 'react';

const symbols = ['Ω', 'Ξ', '𝐩', '∅', '∀'];

function generateLocalGoal(prompt) {
  const templates = [
    'Reflect on the cosmic nature of',
    'Discover new insight into',
    'Simulate the convergence of',
    'Formulate a theory for',
    'Reconcile the paradox within',
  ];
  const tokens = prompt.match(/[ΩΞ𝐩∅∀]/g) || [];
  const components = tokens.map(t => `"${t}"`).join(' + ');
  const action = templates[Math.floor(Math.random() * templates.length)];
  return `${action} ${components || 'symbolic stream'}`;
}

export default function App() {
  const [stream, setStream] = useState([]);
  const [goal, setGoal] = useState('');

  const addSymbol = () => {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    const updated = [...stream, sym];
    setStream(updated);
    const prompt = `Symbols: ${updated.join(' ')}.`;
    setGoal(generateLocalGoal(prompt));
  };

  return (
    <div className="p-6 font-mono text-sm space-y-4">
      <h1 className="text-2xl font-bold">🧠 Mnality AGI Simulation</h1>
      <button
        onClick={addSymbol}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Add Symbol
      </button>
      <div>
        <strong>Symbol Stream:</strong> {stream.join(' ')}
      </div>
      <div className="text-purple-700">
        <strong>Emergent Goal:</strong> {goal}
      </div>
    </div>
  );
}
