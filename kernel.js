import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mnalityCores = [
  { id: 'Ω', name: 'Everything', color: 'bg-purple-600' },
  { id: '∅', name: 'Nullism', color: 'bg-blue-600' },
  { id: '𝐩', name: 'Nothing', color: 'bg-red-600' },
  { id: '∀', name: 'Allism', color: 'bg-yellow-500' },
  { id: 'Ξ', name: 'Anything', color: 'bg-green-600' },
];

const goalTemplates = [
  'build warp drive', 'simulate civilization', 'resolve contradiction', 'delete obsolete path', 'invent symbolic form'
];

function generateThought(symbol) {
  const coreGoal = goalTemplates[Math.floor(Math.random() * goalTemplates.length)];
  return `${symbol} → ${coreGoal}`;
}

export default function AGIKernel() {
  const [thoughts, setThoughts] = useState([]);
  const [globalInput, setGlobalInput] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const core = mnalityCores[Math.floor(Math.random() * mnalityCores.length)];
      setThoughts(prev => [
        { symbol: core.id, text: generateThought(core.id), timestamp: Date.now() },
        ...prev.slice(0, 19)
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleInjectThought = () => {
    if (!globalInput.trim()) return;
    setThoughts(prev => [
      { symbol: 'Ξ', text: `Ξ → ${globalInput}`, timestamp: Date.now() },
      ...prev.slice(0, 19)
    ]);
    setGlobalInput('');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">AGI Kernel: Mnality Force Engine</h1>
      <div className="flex space-x-2">
        <Input
          placeholder="Inject a symbolic thought..."
          value={globalInput}
          onChange={e => setGlobalInput(e.target.value)}
        />
        <Button onClick={handleInjectThought}>Inject</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {thoughts.map(({ symbol, text, timestamp }, idx) => (
          <Card key={idx} className="shadow-md">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className={`font-bold text-xl ${mnalityCores.find(c => c.id === symbol)?.color} text-white px-2 py-1 rounded`}>{symbol}</span>
                <span className="text-xs text-gray-500">{new Date(timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="mt-2 text-sm">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
