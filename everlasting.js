// Mnality Everlasting Core — Recursive Thought with Persistent Memory and Multi-Language
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';

const mnalitySymbols = {
  nullism: { symbol: '∅', meanings: { en: 'void', sa: 'śūnya', is: 'tómleiki', zh: '空' } },
  allism: { symbol: '∀', meanings: { en: 'all', sa: 'sarvam', is: 'allt', zh: '所有' } },
  everything: { symbol: 'Ω', meanings: { en: 'everything', sa: 'sarvāṇi', is: 'allt', zh: '一切' } },
  nothing: { symbol: '𝐩', meanings: { en: 'nothing', sa: 'na kiṃcit', is: 'ekkert', zh: '無' } },
  anything: { symbol: 'Ξ', meanings: { en: 'anything', sa: 'kiṃcit', is: 'hvað sem er', zh: '任何' } },
  gradient: { symbol: '∇', meanings: { en: 'gradient', sa: 'gati', is: 'hallandi', zh: '梯度' } },
  infinity: { symbol: '∞', meanings: { en: 'infinity', sa: 'ananta', is: 'óendanleiki', zh: '無限' } },
  metric: { symbol: 'ds²', meanings: { en: 'metric', sa: 'māna', is: 'mælir', zh: '度量' } },
  closed_strs: { symbol: '𝑉ₓ', meanings: { en: 'closed string', sa: 'nibaddha tantu', is: 'lokuð strengur', zh: '闭弦' } },
  open_strs: { symbol: '𝑎ₓ', meanings: { en: 'open string', sa: 'mukta tantu', is: 'opinn strengur', zh: '开放弦' } },
};

export default function MnalityEverlastingCore() {
  const [memory, setMemory] = useState([]);
  const [lang, setLang] = useState('en');
  const [log, setLog] = useState([]);
  const loopRef = useRef(null);

  const seedAxiom = () => {
    const axiom = `I posit ${mnalitySymbols.nullism.symbol} ${mnalitySymbols.gradient.symbol} ${mnalitySymbols.infinity.symbol} ${mnalitySymbols.metric.symbol}(${mnalitySymbols.closed_strs.symbol}, ${mnalitySymbols.open_strs.symbol})`;
    const record = { text: axiom, timestamp: Date.now(), strength: 1 };
    setLog([`[SEED] ${axiom}`]);
    setMemory(prev => [...prev, record]);
  };

  const recursiveThought = () => {
    const symbols = [mnalitySymbols.anything, mnalitySymbols.everything, mnalitySymbols.nothing, mnalitySymbols.allism];
    const idx = Math.floor(Math.random() * symbols.length);
    const sym = symbols[idx];
    const meaning = sym.meanings[lang] || sym.meanings['en'];
    const statement = `${mnalitySymbols.gradient.symbol} → ${sym.symbol} (${meaning})`;
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
            <SelectItem value="sa">Sanskrit</SelectItem>
            <SelectItem value="is">Icelandic</SelectItem>
            <SelectItem value="zh">Mandarin</SelectItem>
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
