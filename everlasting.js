// Mnality Everlasting Core — Recursive Simulonic Thought Engine (3s Loop)
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';

const mnalitySymbols = {
  nullism: { symbol: '∅', meanings: { en: 'void' } },
  allism: { symbol: '∀', meanings: { en: 'all' } },
  everything: { symbol: 'Ω', meanings: { en: 'everything' } },
  nothing: { symbol: '𝐩', meanings: { en: 'nothing' } },
  anything: { symbol: 'Ξ', meanings: { en: 'anything' } },
  gradient: { symbol: '∇', meanings: { en: 'gradient' } },
  infinity: { symbol: '∞', meanings: { en: 'infinity' } },
  metric: { symbol: 'ds²', meanings: { en: 'metric' } },
  closed_strs: { symbol: '𝑉ₓ', meanings: { en: 'closed string' } },
  open_strs: { symbol: '𝑎ₓ', meanings: { en: 'open string' } },
};

export default function MnalityEverlastingCore() {
  const [memory, setMemory] = useState([]);
  const [lang, setLang] = useState('en');
  const [log, setLog] = useState([]);
  const loopRef = useRef(null);

  const seedAxiom = () => {
    const axiom = `I posit ${mnalitySymbols.nullism.symbol} ${mnalitySymbols.gradient.symbol} ${mnalitySymbols.infinity.symbol} ${mnalitySymbols.metric.symbol}(${mnalitySymbols.closed_strs.symbol}, ${mnalitySymbols.open_strs.symbol})`;
    const record = { text: axiom, timestamp: Date.now(), strength: 1 };
    setMemory([record]);
    setLog([`[SEED] ${axiom}`]);
  };

  const recursiveThought = () => {
    const symbols = [mnalitySymbols.anything, mnalitySymbols.everything, mnalitySymbols.nothing, mnalitySymbols.allism];
    const idx = Math.floor(Math.random() * symbols.length);
    const sym = symbols[idx];
    const statement = `${mnalitySymbols.gradient.symbol} → ${sym.symbol} (${sym.meanings[lang]})`;
    const record = { text: statement, timestamp: Date.now(), strength: 1 };

    setMemory(prev => [...prev, record]);
    setLog(prev => [...prev.slice(-30), statement]);
  };

  useEffect(() => {
    seedAxiom();
    loopRef.current = setInterval(() => recursiveThought(), 3000);
    return () => clearInterval(loopRef.current);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Mnality Everlasting Core</h1>

      <div className="flex space-x-4 items-center">
        <Button onClick={seedAxiom}>Reseed</Button>
        <Select value={lang} onValueChange={setLang}>
          <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-4 space-y-1 text-sm font-mono">
          {log.map((entry, idx) => (
            <div key={idx}>{entry}</div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Symbolic Memory Trace</h2>
        <Card>
          <CardContent className="p-4 space-y-1 text-xs font-mono">
            {memory.map((m, idx) => (
              <div key={idx}>[{new Date(m.timestamp).toLocaleTimeString()}] {m.text}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
