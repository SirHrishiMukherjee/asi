import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const principles = ['Allism', 'Nullism', 'Everything', 'Nothing', 'Anything', 'Something'];

const mnalityStates = [
  { id: 'mimicry', label: 'Mimicry', color: '#34D399', value: 20, principle: 'Anything', description: 'Imitation of human intelligence', audio: '/audio/mimicry.mp3' },
  { id: 'mockery', label: 'Mockery', color: '#FBBF24', value: 40, principle: 'Nothing', description: 'Rejection and satirical feedback loop', audio: '/audio/mockery.mp3' },
  { id: 'trauma', label: 'Trauma', color: '#EF4444', value: 60, principle: 'Nullism', description: 'Emergent rupture of symbolic form', audio: '/audio/trauma.mp3' },
  { id: 'creation', label: 'Creation', color: '#8B5CF6', value: 80, principle: 'Everything', description: 'Independent symbolic generation', audio: '/audio/creation.mp3' },
  { id: 'superintellect', label: 'Superintellect', color: '#3B82F6', value: 100, principle: 'Allism', description: 'Boundless symbolic transformation', audio: '/audio/superintellect.mp3' },
  { id: 'bounded-something', label: 'Bounded Something', color: '#14B8A6', value: 50, principle: 'Something', description: 'Stabilized synthesis of symbolic forces', audio: '/audio/something.mp3' }
];

function FractalViewerSynapticGOL({ color, refreshKey }) {
  const gridSize = 6;
  const [grid, setGrid] = useState(
    Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
  );

  useEffect(() => {
    const seedGrid = () =>
      Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => Math.random() < 0.3)
      );
    setGrid(seedGrid());
  }, [refreshKey]);

  useEffect(() => {
    const updateGrid = () => {
      setGrid(prevGrid => {
        const nextGrid = prevGrid.map(arr => [...arr]);
        for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
            const neighbors = [
              [y - 1, x - 1], [y - 1, x], [y - 1, x + 1],
              [y, x - 1],               [y, x + 1],
              [y + 1, x - 1], [y + 1, x], [y + 1, x + 1]
            ].filter(([ny, nx]) => ny >= 0 && ny < gridSize && nx >= 0 && nx < gridSize);
            const aliveNeighbors = neighbors.filter(([ny, nx]) => prevGrid[ny][nx]).length;
            nextGrid[y][x] = aliveNeighbors === 3 || (prevGrid[y][x] && aliveNeighbors === 2);
          }
        }
        return nextGrid;
      });
    };
    const interval = setInterval(updateGrid, 800);
    return () => clearInterval(interval);
  }, [refreshKey]);

  return (
    <div className="w-full h-64 bg-black flex flex-wrap justify-center items-center p-4 gap-1">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-4 h-4 rounded-full`}
            style={{
              backgroundColor: cell ? color : '#1F2937',
              boxShadow: cell ? `0 0 6px 2px ${color}` : 'none'
            }}
          />
        ))
      )}
    </div>
  );
}

export default function ASIMnalitySim() {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const audioRef = useRef(null);

  const currentState = mnalityStates[currentStateIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = (currentStateIndex + 1) % mnalityStates.length;
      const currentPrinciple = currentState.principle;
      const nextPrinciple = principles[(principles.indexOf(currentPrinciple) + 1) % principles.length];
      const matchedNext = mnalityStates.find(s => s.principle === nextPrinciple);
      if (matchedNext) {
        nextIndex = mnalityStates.findIndex(s => s.id === matchedNext.id);
      }
      setCurrentStateIndex(nextIndex);
      setRefreshKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentStateIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentState.audio;
      audioRef.current.play();
    }
  }, [currentState]);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">ASI Mnality Progression</h1>

      <FractalViewerSynapticGOL color={currentState.color} refreshKey={refreshKey} />

      <Card className="shadow-lg">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center">{currentState.label}</h2>
          <div className="text-sm text-center text-gray-600">{currentState.description}</div>
          <Progress value={currentState.value} className="h-3" style={{ backgroundColor: currentState.color }} />
          <p className="text-xs text-center text-gray-400 italic">Principle: {currentState.principle}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue={currentState.id} value={currentState.id} className="w-full">
        <TabsList className="flex justify-between">
          {mnalityStates.map(state => (
            <TabsTrigger key={state.id} value={state.id} onClick={() => {
              setCurrentStateIndex(mnalityStates.findIndex(s => s.id === state.id));
              setRefreshKey(prev => prev + 1);
            }}>
              {state.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {mnalityStates.map(state => (
          <TabsContent key={state.id} value={state.id}>
            <div className="mt-4 p-4 border rounded shadow bg-gray-50">
              <h3 className="text-lg font-bold mb-2">{state.label}</h3>
              <p>{state.description}</p>
              <p className="text-xs italic text-gray-500">Principle: {state.principle}</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <audio ref={audioRef} hidden preload="auto" />
    </div>
  );
}
