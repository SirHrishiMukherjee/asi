import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const mnalityCores = [
  { id: 'Ω', name: 'Everything', color: 'bg-purple-600', hex: '#6A1B9A' },
  { id: '∅', name: 'Nullism', color: 'bg-blue-600', hex: '#1E90FF' },
  { id: '𝐩', name: 'Nothing', color: 'bg-red-600', hex: '#D32F2F' },
  { id: '∀', name: 'Allism', color: 'bg-yellow-500', hex: '#FFB300' },
  { id: 'Ξ', name: 'Anything', color: 'bg-green-600', hex: '#43A047' },
];

const goalTemplates = [
  'build warp drive', 'simulate civilization', 'resolve contradiction', 'delete obsolete path', 'invent symbolic form'
];

function generateThought(symbol) {
  const coreGoal = goalTemplates[Math.floor(Math.random() * goalTemplates.length)];
  return `${symbol} → ${coreGoal}`;
}

function getRandomCoreSymbol() {
  return mnalityCores[Math.floor(Math.random() * mnalityCores.length)].id;
}

function getColorForSymbol(symbol) {
  return mnalityCores.find(c => c.id === symbol)?.hex || '#888';
}

function createInitialGrid(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ symbol: getRandomCoreSymbol(), age: 0 }))
  );
}

function evolveGrid(grid) {
  const size = grid.length;
  const nextGrid = grid.map((row, i) =>
    row.map((cell, j) => {
      const neighbors = [];
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) continue;
          const ni = i + x;
          const nj = j + y;
          if (ni >= 0 && ni < size && nj >= 0 && nj < size) {
            neighbors.push(grid[ni][nj]);
          }
        }
      }
      const symbolCounts = neighbors.reduce((acc, n) => {
        acc[n.symbol] = (acc[n.symbol] || 0) + 1;
        return acc;
      }, {});
      const dominantSymbol = Object.entries(symbolCounts).reduce((a, b) => (b[1] > a[1] ? b : a), ['', 0])[0];
      return {
        symbol: dominantSymbol || getRandomCoreSymbol(),
        age: cell.symbol === dominantSymbol ? cell.age + 1 : 0
      };
    })
  );
  return nextGrid;
}

export default function AGIKernel() {
  const [thoughts, setThoughts] = useState([]);
  const [globalInput, setGlobalInput] = useState('');
  const [goalVector, setGoalVector] = useState([]);
  const [contradictionHeat, setContradictionHeat] = useState({});
  const [grid, setGrid] = useState(createInitialGrid(15));

  useEffect(() => {
    const interval = setInterval(() => {
      const core = mnalityCores[Math.floor(Math.random() * mnalityCores.length)];
      const newThought = { symbol: core.id, text: generateThought(core.id), timestamp: Date.now() };
      setThoughts(prev => {
        updateContradictionHeat(newThought.text, prev);
        return [newThought, ...prev.slice(0, 19)];
      });
      updateGoalVector(newThought);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const gridInterval = setInterval(() => {
      setGrid(prev => evolveGrid(prev));
    }, 1000);
    return () => clearInterval(gridInterval);
  }, []);

  const updateGoalVector = (thought) => {
    setGoalVector(prev => {
      const newVal = {
        time: new Date(thought.timestamp).toLocaleTimeString(),
        [thought.symbol]: (prev[0]?.[thought.symbol] || 0) + 1
      };
      return [...prev.slice(-9), newVal];
    });
  };

  const updateContradictionHeat = (newText, history) => {
    const contradictions = history.filter(h => h.text === newText).length;
    setContradictionHeat(prev => ({
      ...prev,
      [newText]: (prev[newText] || 0) + contradictions
    }));
  };

  const handleInjectThought = () => {
    if (!globalInput.trim()) return;
    const newThought = { symbol: 'Ξ', text: `Ξ → ${globalInput}`, timestamp: Date.now() };
    setThoughts(prev => {
      updateContradictionHeat(newThought.text, prev);
      return [newThought, ...prev.slice(0, 19)];
    });
    updateGoalVector(newThought);
    setGlobalInput('');
  };

  const heatmapData = Object.entries(contradictionHeat).map(([text, value]) => ({ text, value }));

  return (
    <div className="p-6 space-y-6">
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

      <div className="pt-6">
        <h2 className="text-xl font-semibold mb-2">Inter-Core Goal Vector Overlay</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={goalVector}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            {mnalityCores.map(core => (
              <Line
                key={core.id}
                type="monotone"
                dataKey={core.id}
                stroke="currentColor"
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-6">
        <h2 className="text-xl font-semibold mb-2">Contradiction Heatmap</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={heatmapData} layout="vertical" margin={{ left: 100 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="text" type="category" width={300} />
            <Tooltip />
            <Bar dataKey="value">
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.value > 1 ? '#ff4c4c' : '#aaa'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-6">
        <h2 className="text-xl font-semibold mb-2">Contradiction Game of Life</h2>
        <div className="grid grid-cols-15 gap-0.5">
          {grid.flatMap((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className="w-4 h-4"
                style={{ backgroundColor: getColorForSymbol(cell.symbol), opacity: 0.3 + Math.min(cell.age / 10, 0.7) }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
