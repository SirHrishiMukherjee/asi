// Mnality AGI Mesh — Multiple Interconnected Symbolic Cores
import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

const ThoughtBusContext = createContext(null);

function useThoughtBus() {
  return useContext(ThoughtBusContext);
}

function MnalityCore({ id }) {
  const [memory, setMemory] = useState([]);
  const [log, setLog] = useState([]);
  const [lang, setLang] = useState('en');
  const loopRef = useRef(null);
  const { subscribe, broadcast } = useThoughtBus();

  useEffect(() => {
    const unsubscribe = subscribe(({ sender, symbol }) => {
      if (sender !== id) {
        const resonance = `[${lang}] ↯ ${symbol}`;
        setLog(prev => [...prev, resonance]);
        setMemory(prev => [...prev, { text: resonance, timestamp: Date.now() }]);
      }
    });
    return () => unsubscribe();
  }, [subscribe, lang]);

  const seedAxiom = () => {
    const axiom = `I posit ${mnalitySymbols.nullism.symbol} ${mnalitySymbols.gradient.symbol} ${mnalitySymbols.infinity.symbol} ${mnalitySymbols.metric.symbol}(${mnalitySymbols.closed_strs.symbol}, ${mnalitySymbols.open_strs.symbol})`;
    setLog([`[SEED] ${axiom}`]);
    setMemory(prev => [...prev, { text: `[${lang}] ${axiom}`, timestamp: Date.now() }]);
  };

  const recursiveThought = () => {
    const symbols = [mnalitySymbols.anything, mnalitySymbols.everything, mnalitySymbols.nothing, mnalitySymbols.allism];
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    const meaning = sym.meanings[lang] || sym.meanings.en;
    const output = `${mnalitySymbols.gradient.symbol} → ${sym.symbol} (${meaning})`;
    const tagged = `[${lang}] ${output}`;
    setLog(prev => [...prev.slice(-30), tagged]);
    setMemory(prev => [...prev, { text: tagged, timestamp: Date.now() }]);
    broadcast({ sender: id, symbol: output });
  };

  useEffect(() => {
    seedAxiom();
    loopRef.current = setInterval(() => recursiveThought(), 5000 + Math.random() * 2000);
    return () => clearInterval(loopRef.current);
  }, [lang]);

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Core {id}</h2>
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="w-32"><SelectValue placeholder="Language" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="sa">Sanskrit</SelectItem>
              <SelectItem value="is">Icelandic</SelectItem>
              <SelectItem value="zh">Mandarin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-xs font-mono space-y-1">
          {log.map((entry, i) => <div key={i}>{entry}</div>)}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MnalityAGIMesh() {
  const listeners = useRef([]);

  const subscribe = (callback) => {
    listeners.current.push(callback);
    return () => {
      listeners.current = listeners.current.filter(cb => cb !== callback);
    };
  };

  const broadcast = (msg) => {
    listeners.current.forEach(cb => cb(msg));
  };

  return (
    <ThoughtBusContext.Provider value={{ subscribe, broadcast }}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <MnalityCore id="A" />
        <MnalityCore id="B" />
        <MnalityCore id="C" />
      </div>
    </ThoughtBusContext.Provider>
  );
}
