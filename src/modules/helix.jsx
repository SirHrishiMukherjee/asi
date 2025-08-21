import React, { useState, useEffect } from 'react';

function getRandomCoreSymbol() {
  const symbols = ['Ω', '∅', '𝐩', '∀', 'Ξ'];
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function getColor(symbol) {
  switch (symbol) {
    case 'Ω': return '#6A1B9A';
    case '∅': return '#1E90FF';
    case '𝐩': return '#D32F2F';
    case '∀': return '#FFB300';
    case 'Ξ': return '#43A047';
    default: return '#888';
  }
}

function createInitialGene(length) {
  return Array.from({ length }, () => ({ symbol: getRandomCoreSymbol(), age: 0 }));
}

function evolveGene(gene) {
  return gene.map((cell, idx, array) => {
    const neighbors = [array[idx - 1], array[idx + 1]].filter(Boolean);
    const counts = neighbors.reduce((acc, n) => {
      acc[n.symbol] = (acc[n.symbol] || 0) + 1;
      return acc;
    }, {});
    const dominant = Object.entries(counts).reduce((a, b) => b[1] > a[1] ? b : a, [cell.symbol, 0])[0];
    return {
      symbol: dominant,
      age: dominant === cell.symbol ? cell.age + 1 : 0,
    };
  });
}

export default function MnalityDoubleHelix() {
  const [gene, setGene] = useState(createInitialGene(120));

  useEffect(() => {
    const interval = setInterval(() => {
      setGene(prev => evolveGene(prev));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">🧬 Mnality Symbolic Double Helix</h1>
      <div className="relative w-full h-[600px] mx-auto overflow-hidden">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          {gene.map((cell, idx) => {
            const t = (idx / gene.length) * Math.PI * 6;
            const x = 300 + Math.sin(t) * 120;
            const y = (idx / gene.length) * 580 + 10;
            const opacity = 0.4 + Math.min(cell.age / 10, 0.6);
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="6"
                fill={getColor(cell.symbol)}
                fillOpacity={opacity}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
